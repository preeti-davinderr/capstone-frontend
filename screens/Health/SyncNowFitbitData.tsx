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
    <ScrollView style={{ flex: 1 }}>
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
    </ScrollView>
  );
}


// 🧾 Card component
export function FitbitSummaryCard({ data }: { data: FitbitData }){
  return (
    <View>
      {/* Steps */}
      <View style={styles.card}>
        <FontAwesome5 name="shoe-prints" size={20} />
        <Text style={styles.title}>Steps</Text>
        <Text style={styles.value}>{data.steps.value} / {data.steps.goal}</Text>
        <Text style={styles.subText}>
          {data.steps.completed} completed - {data.steps.remaining}
        </Text>
      </View>

      {/* Heart */}
      <View style={styles.card}>
        <MaterialCommunityIcons name="heart-pulse" size={20} />
        <Text style={styles.title}>Heart Rate</Text>
        <Text style={styles.value}>{data.heart.avg} BPM</Text>
        <Text style={styles.subText}>
          Rest: {data.heart.resting}, Peak: {data.heart.peak}, Zone: {data.heart.inZone}
        </Text>
      </View>

      {/* Sleep */}
      <View style={[styles.card, styles.sleepCard]}>
        <MaterialCommunityIcons name="sleep" size={20} />
        <Text style={styles.title}>Sleep</Text>
        <Text style={styles.value}>Last night: {data.sleep.total}</Text>
        <Text style={styles.subText}>
          ⏰ {data.sleep.bedtime} → {data.sleep.wakeUp} | Score: {data.sleep.score}
        </Text>
        <View style={styles.sleepDetailRow}>
          <Text style={styles.subText}>Deep: {data.sleep.deep}</Text>
          <Text style={styles.subText}>Light: {data.sleep.light}</Text>
          <Text style={styles.subText}>REM: {data.sleep.rem}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
  },
  header: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 8,
  },
  value: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 6,
  },
  subText: {
    color: '#555',
    marginTop: 4,
    fontSize: 13,
  },
  sleepCard: {
    borderColor: '#8ecae6',
    borderWidth: 1,
  },
  sleepDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 12,
  },
  syncButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  syncButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
