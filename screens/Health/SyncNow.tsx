import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

// Shared type
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

type Props = {
  data: FitbitData;
};

// ✅ Named export so it can be imported elsewhere
export const FitbitSummaryCard = ({ data }: Props) => (
  <View style={styles.container}>
    {/* Steps */}
    <View style={styles.card}>
      <FontAwesome5 name="shoe-prints" size={20} />
      <Text style={styles.title}>Steps</Text>
      <Text style={styles.value}>{data.steps.value} / {data.steps.goal}</Text>
      <Text style={styles.subText}>
        {data.steps.completed} completed - {data.steps.remaining} to go
      </Text>
    </View>

    {/* Heart Rate */}
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

// ✅ Default export for screen navigation
export default function SyncNowScreen() {
  // You would get your fitbit data here
  const fitbitData: FitbitData = {
    steps: {
      value: 5600,
      goal: 10000,
      completed: "56%",
      remaining: "4400 steps",
    },
    heart: {
      avg: 75,
      resting: 65,
      peak: 130,
      inZone: "45 min",
    },
    sleep: {
      total: "7h 20m",
      bedtime: "11:00 PM",
      wakeUp: "6:20 AM",
      score: 82,
      deep: "1h 10m",
      light: "4h 30m",
      rem: "1h 40m",
    }
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <FitbitSummaryCard data={fitbitData} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
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
});
