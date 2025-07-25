import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { useFitbitAuth } from '../Fitbit/FitbitAuthScreen';
import { fetchFitbitData } from '../Fitbit/fetchFitbitData';
import CommonButton from '../../components/CommonButton';
import MainHeader from '../../components/MainHeader';
import SubHeader from '../../components/SubHeader';

export type FitbitData = {
  steps: {
    value: number;
    goal: number;
    completed: string;
    remaining: string;
  };
  heart: {
    avg: number;
    resting: number;
    peak: number;
    inZone: string;
  };
  sleep: {
    total: string;
    bedtime: string;
    wakeUp: string;
    score: number;
    deep: string;
    light: string;
    rem: string;
  };
};


export default function SyncNowScreen() {
  const [data, setData] = useState<FitbitData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

    useEffect(() => {
        setLoading(false);
      }, []);

  const { promptAsync } = useFitbitAuth(async (token) => {
    try {
      if (!token?.accessToken) {
        console.error('❌ No access token received from Fitbit');
        setError('Access token missing');
        setLoading(false);
        return;
      }

      console.log('✅ Access Token:', token.accessToken);
      const rawData = await fetchFitbitData(token.accessToken);

      // 🧠 Format the rawData into FitbitData
      const fitbitFormatted: FitbitData = {
        steps: {
          value: rawData.activity.summary.steps || 0,
          goal: rawData.activity.goals.steps || 10000,
          completed: `${Math.round((rawData.activity.summary.steps / rawData.activity.goals.steps) * 100)}%`,
          remaining: `${Math.max(0, rawData.activity.goals.steps - rawData.activity.summary.steps)} steps`,
        },
        heart: {
          avg: rawData.heart['activities-heart'][0]?.value?.heartRateZones?.[1]?.min || 0,
          resting: rawData.heart['activities-heart'][0]?.value?.restingHeartRate || 0,
          peak: rawData.heart['activities-heart'][0]?.value?.heartRateZones?.[2]?.max || 0,
          inZone: `${rawData.heart['activities-heart'][0]?.value?.heartRateZones?.[2]?.minutes || 0} min`,
        },
        sleep: {
          total: `${Math.floor(rawData.sleep.summary.totalMinutesAsleep / 60)}h ${rawData.sleep.summary.totalMinutesAsleep % 60}m`,
          bedtime: rawData.sleep.sleep?.[0]?.start?.split('T')[1]?.slice(0, 5) || '--:--',
          wakeUp: rawData.sleep.sleep?.[0]?.end?.split('T')[1]?.slice(0, 5) || '--:--',
          score: rawData.sleep.sleep?.[0]?.efficiency || 0,
          deep: `${rawData.sleep.sleep?.[0]?.levels?.summary?.deep?.minutes || 0} min`,
          light: `${rawData.sleep.sleep?.[0]?.levels?.summary?.light?.minutes || 0} min`,
          rem: `${rawData.sleep.sleep?.[0]?.levels?.summary?.rem?.minutes || 0} min`,
        }
      };

      setData(fitbitFormatted);
    } catch (err) {
      console.error('❌ Fitbit fetch error:', err);
      setError('Failed to load Fitbit data');
    } finally {
      setLoading(false);
    }
  });

  useEffect(() => {
    promptAsync();
  }, []);

  return (
    <>
    {/* <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.header}>Sync Now</Text>

        {loading && <ActivityIndicator size="large" />}
        {error.length > 0 && <Text style={styles.error}>{error}</Text>}

        {data && <FitbitSummaryCard data={data} />}

        {!loading && (
          <TouchableOpacity style={styles.syncButton} onPress={() => {
            setLoading(true);
            promptAsync();
          }}>
            <Text style={styles.syncButtonText}>🔄 Sync Again</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView> */}
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        <SubHeader title="Sync Now" />

        {/* 🌀 Loading and Error States */}

        {loading && <ActivityIndicator size="large" />}
        {error.length > 0 && <Text style={styles.error}>{error}</Text>}

        {data && <FitbitSummaryCard data={data} />}

        {!loading && (
          <View style={styles.syncButtonWrapper}>
              <CommonButton
                label="Sync Again"
                onPress={() => {
                  setLoading(true);
                  promptAsync();
                }}
                style={styles.syncButton}
                labelStyle={styles.syncButtonText} // if you support labelStyle in CommonButton
              />
            </View>
        )}
      </View>
    </ScrollView>
    </>
  );
}


// 🧾 Card component
export function FitbitSummaryCard({ data }: { data: FitbitData }){
  return (
    <View style={styles.section}>
  {/* Steps */}
  <View style={styles.card}>
    <View style={styles.iconWrapperPurple}>
      <FontAwesome5 name="shoe-prints" size={16} color="#fff" />
    </View>
    <View style={styles.textGroup}>
      <Text style={styles.cardTitle}>Steps</Text>
      <Text style={styles.cardValue}>{data.steps.value} / {data.steps.goal}</Text>
      <View style={styles.sleepDetailRow}>
        <Text style={styles.cardSubText}>
          Completed: {data.steps.completed}
        </Text>
      </View>
    </View>
  </View>

  {/* Heart Rate */}
  <View style={styles.card}>
    <View style={styles.iconWrapperRed}>
      <MaterialCommunityIcons name="heart-pulse" size={16} color="#fff" />
    </View>
    <View style={styles.textGroup}>
      <Text style={styles.cardTitle}>Heart Rate</Text>
      <Text style={styles.cardValue}>{data.heart.avg} BPM</Text>
      <View style={styles.sleepDetailRow}>
        <Text style={styles.cardSubText}>Rest: {data.heart.resting}</Text>
        <Text style={styles.cardSubText}>Peak: {data.heart.peak} </Text>
        <Text style={styles.cardSubText}>Zone: {data.heart.inZone} </Text>
      </View>
    </View>
  </View>

  {/* Sleep */}
  <View style={styles.card}>
    <View style={styles.iconWrapperBlue}>
      <MaterialCommunityIcons name="sleep" size={16} color="#fff" />
    </View>
    <View style={styles.textGroup}>
      <Text style={styles.cardTitle}>Sleep</Text>
      <Text style={styles.cardValue}>Last night: {data.sleep.total}</Text>
      <View style={styles.sleepDetailRow}>
        <Text style={styles.cardSubText}>Deep: {data.sleep.deep}</Text>
        <Text style={styles.cardSubText}>Light: {data.sleep.light}</Text>
        <Text style={styles.cardSubText}>REM: {data.sleep.rem}</Text>
      </View>
    </View>
  </View>
</View>
  );
}

const styles = StyleSheet.create({
  container: {
    // padding: 16,
    backgroundColor: '#fff',
    flex: 1,
  },
  syncButtonWrapper: {
  padding: 16,
  marginTop: 20,
  alignItems: 'center',
  justifyContent: 'center',
},
  section: {
    // paddingHorizontal: 16,
    paddingTop: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 10,
    margin: 16,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  iconWrapperPurple: {
    backgroundColor: "#b18cff",
    borderRadius: 20,
    padding: 8,
    marginRight: 12,
  },
  iconWrapperRed: {
    backgroundColor: "#ff6b6b",
    borderRadius: 20,
    padding: 8,
    marginRight: 12,
  },
  iconWrapperBlue: {
    backgroundColor: "#63cdda",
    borderRadius: 20,
    padding: 8,
    marginRight: 12,
  },
  textGroup: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    color: "#333",
  },
  cardValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
  },
  cardSubText: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  sleepDetailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },
  header: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  // card: {
  //   backgroundColor: '#fff',
  //   padding: 16,
  //   borderRadius: 12,
  //   marginBottom: 16,
  //   shadowColor: '#000',
  //   shadowOpacity: 0.1,
  //   shadowRadius: 4,
  //   elevation: 2,
  // },
  // title: {
  //   fontWeight: 'bold',
  //   fontSize: 16,
  //   marginTop: 8,
  // },
  // value: {
  //   fontSize: 20,
  //   fontWeight: '600',
  //   marginTop: 6,
  // },
  // subText: {
  //   color: '#555',
  //   marginTop: 4,
  //   fontSize: 13,
  // },
  // sleepCard: {
  //   borderColor: '#8ecae6',
  //   borderWidth: 1,
  // },
  // sleepDetailRow: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   marginTop: 8,
  // },
  error: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 12,
  },
  syncButton: {
    // backgroundColor: '#007AFF',
    paddingVertical: 12,
    width: '60%',
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  syncButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});