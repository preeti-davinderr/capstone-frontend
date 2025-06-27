

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App'; // adjust path as needed
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { useFitbitAuth } from './Fitbit/FitbitAuthScreen'; // adjust path as needed
import { fetchFitbitData } from './Fitbit/fetchFitbitData'; 
import { formatDistanceToNow } from 'date-fns';
import { FitbitSummaryCard } from './Health/SyncNowFitbitData'; // adjust path as needed// adjust path

export default function HealthScreen() {
  const [fitbitData, setFitbitData] = useState<FitbitData | null>(null);

  type FitbitData = {
      activity: any;
      sleep: any;
      heart: any;
    };

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
      const [bpReading, setBpReading] = useState<{
      systolic: string;
      diastolic: string;
      status: string;
    } | null>(null);

     const [weightReading, setWeightReading] = useState<{
        value: string;
        unit: 'kg' | 'lbs';
        date: string;
      } | null>(null);

    // const handleGenerateReport = async () => {
    //     const token = await AsyncStorage.getItem('fitbit_access_token');
    //     if (!token) {
    //       // Alert.alert("Fitbit token missing");
    //       return;
    //     }

    //     const today = new Date();
    //     const reportWeek: any[] = [];

    //     for (let i = 0; i < 7; i++) {
    //       const date = new Date();
    //       date.setDate(today.getDate() - i);
    //       const formattedDate = date.toISOString().split('T')[0];

    //       const dayData = await fetchFitbitData(token, formattedDate);
    //       if (dayData) {
    //         reportWeek.push({ date: formattedDate, ...dayData });
    //       }
    //     }

    //     console.log('📆 Full Weekly Report:', reportWeek);
    //     // You can now pass this to a modal or navigate to a screen to display
    //   };

      useFocusEffect(
  useCallback(() => {
    const USER_ID = '68363fabfa6e794d7eac980a';
    const API_BASE = 'http://192.168.1.112:5001/api/userHealth';

    const fetchBpData = async () => {
      try {
        const res = await fetch(`${API_BASE}/bp?id=${USER_ID}`);
        const result = await res.json();

        if (result.success && Array.isArray(result.data) && result.data.length > 0) {
          const { systolic, diastolic, status } = result.data[0];
          setBpReading({ systolic, diastolic, status });
        } else {
          setBpReading(null);
        }
      };
  
      fetchData();
    }, [])
  );
  

  const { promptAsync } = useFitbitAuth(async (token) => {
    try {
      if (!token?.accessToken) {
        console.error("❌ No access token returned");
        return;
      }

      const data = await fetchFitbitData(token.accessToken);
      setFitbitData(data);
    } catch (err) {
      console.error("❌ Fitbit fetch error:", err);
    }
  });

  const formatMinutes = (totalMinutes: number) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconPlaceholder} />
        <Text style={styles.headerTitle}>My Health</Text>
        <Ionicons name="notifications-outline" size={24} color="#333" />
      </View>

      {/* Log Health Data */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Log Health Data</Text>
        <View style={styles.cardRow}>
          <TouchableOpacity
            style={styles.card_log}
            onPress={() => navigation.navigate("BloodPressure")}
          >
            <Ionicons name="heart" size={24} color="#333" />
            <Text>Blood Pressure</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card_log}
            onPress={() => navigation.navigate("Weight")}
          >
            <Ionicons name="scale" size={24} color="#333" />
            <Text>Weight</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cardRow}>
          <TouchableOpacity
            style={styles.card_log}
            onPress={() => navigation.navigate("KickCounter")}
          >
            <MaterialCommunityIcons
              name="baby-face-outline"
              size={24}
              color="#333"
            />
            <Text>Kick Count</Text>
          </TouchableOpacity>       
          <TouchableOpacity
            style={styles.card_log}
            onPress={() => navigation.navigate('FitBitSummary')}>
            <FontAwesome5 name="link" size={20} color="#333" />
            <Text>Sync Now</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Today's Readings */}
      <View style={styles.section}>
        <View style={styles.rowBetween}>
          <Text style={styles.sectionTitle}>Today's Readings</Text>
          <TouchableOpacity>
            <Text style={styles.link}>View All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.card}>
          <MaterialCommunityIcons
            name="heart-pulse"
            size={24}
            color="#888"
            style={styles.icon}
          />
          <View style={styles.textContainer}>
            <Text style={styles.title}>Blood Pressure</Text>
            <Text style={styles.value}>
              {bpReading
                ? `${bpReading.systolic}/${bpReading.diastolic} mmHg`
                : "No Data"}
            </Text>
          </View>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>
              {bpReading?.status || "Unknown"}
            </Text>
          </View>
        </View>
        <View style={styles.card}>
          <MaterialCommunityIcons
            name="weight"
            size={24}
            color="#888"
            style={styles.icon}
          />
          <View style={styles.textContainer}>
            <Text style={styles.title}>Weight</Text>
            <Text style={styles.value}>
              {weightReading
                ? `${weightReading.value} ${weightReading.unit}`
                : "No Data"}
            </Text>
          </View>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>
              {weightReading ? "Tracked" : "Unknown"}
            </Text>
          </View>
        </View>
      </View>

      {/* Connected Devices */}
      <Text style={styles.sectionTitle}>Connected Devices</Text>
      <View style={styles.card_connected}>
        <View style={styles.topRow}>
          <View style={styles.deviceHeader}>
            <View style={styles.iconPlaceholder1}>
              <Text style={styles.iconText}>⌚</Text>
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.deviceName}>Fitbit Versa 3</Text>
              <Text style={styles.deviceMeta}>
                Last sync:{" "}
                {fitbitData?.sleep?.[0]?.endTime
                  ? formatDistanceToNow(new Date(fitbitData.sleep[0].endTime), {
                      addSuffix: true,
                    })
                  : "Not available"}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.syncButton}
            onPress={() => {
              console.log("🌀 Syncing with Fitbit...");
              promptAsync();
            }}
          >
            <Text style={styles.syncButtonText}>Sync Now</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.metricsRow}>
          <View style={styles.metric}>
            <Text style={styles.metricLabel}>Steps</Text>
            <Text style={styles.metricValue}>
              {fitbitData?.activity?.summary?.steps ?? "N/A"}
            </Text>
          </View>

          <View style={styles.metric}>
            <Text style={styles.metricLabel}>Heart Rate</Text>
            <Text style={styles.metricValue}>
              {fitbitData?.heart?.["activities-heart"]?.[0]?.value
                ?.restingHeartRate
                ? `${fitbitData.heart["activities-heart"][0].value.restingHeartRate} bpm`
                : "N/A"}
            </Text>
          </View>

          <View style={styles.metric}>
            <Text style={styles.metricLabel}>Sleep</Text>
            <Text style={styles.metricValue}>
              {fitbitData?.sleep?.summary?.totalMinutesAsleep
                ? formatMinutes(fitbitData.sleep.summary.totalMinutesAsleep)
                : "N/A"}
            </Text>
          </View>
        </View>
      </View>

      {/* AI Recommendations */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>AI Recommendations</Text>
        <View style={styles.aiCard}>
          <Text style={{ fontWeight: "600" }}>This Week's Focus</Text>
          <Text>
            • Continue prenatal vitamins with iron{"\n"}• Aim for 8-10 glasses
            of water daily{"\n"}• Light exercise like walking for 30 minutes
          </Text>
        </View>
        <View style={styles.aiCard}>
          <Text style={{ fontWeight: "600" }}>Avoid This Week</Text>
          <Text>
            • High-mercury fish{"\n"}• Excessive caffeine (&gt;200mg/day){"\n"}•
            Hot baths or saunas
          </Text>
        </View>
      </View>

      {/* Doctor Report Button */}
      {/* <TouchableOpacity style={styles.generateBtn}>
        <Text style={styles.generateBtnText}>Generate Doctor Report</Text>
      </TouchableOpacity> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 50,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 35,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
    flex: 1, // Ensures it takes up middle space
  },

  iconPlaceholder: {
    width: 24, // same as bell icon width
  },
  week: {
    fontSize: 22,
    fontWeight: "400",
    marginBottom: 10,
  },
  trimester: {
    color: "#666",
    marginBottom: 10,
  },
  section: {
    marginTop: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  cardRow: {
    flexDirection: "row",
    marginBottom: 10,
    justifyContent: "space-between",
  },
  card_log: {
    width: "48%",
    padding: 15,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    alignItems: "center",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 16,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    margin: 5,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  card_connected: {
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
  },
  metricLabel: {
    color: "#666",
    fontSize: 14,
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  metric: {
    flex: 1,
    alignItems: "center",
    minWidth: 80, // avoids shrinking too much
  },
  deviceHeader: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  deviceName: {
    fontSize: 16,
    fontWeight: "600",
  },
  deviceMeta: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },

  iconPlaceholder1: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },
  iconText: {
    fontSize: 18,
    color: "#aaa",
  },
  deviceInfo: {
    flex: 1,
    marginLeft: 12,
  },

  icon: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111",
  },
  value: {
    fontSize: 14,
    color: "#555",
    marginTop: 2,
  },
  statusBadge: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  statusText: {
    fontSize: 14,
    color: "#555",
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  link: {
    color: "#007AFF",
  },
  dataBox: {
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 8,
    paddingBlock: 10,
    marginTop: 8,
  },
  label: {
    color: "#888",
    fontWeight: "500",
  },
  deviceBox: {
    backgroundColor: "#f1f1f1",
    padding: 16,
    borderRadius: 10,
    marginBottom: 8,
  },
  syncButton: {
    backgroundColor: "#444",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  syncButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  metricsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    paddingHorizontal: 8, // add spacing inside card
    gap: 10, // optional, only works in RN 0.71+
  },
  removeBtn: {
    padding: 10,
    alignItems: "center",
    marginBottom: 6,
  },
  addBtn: {
    padding: 10,
    alignItems: "center",
    backgroundColor: "#eee",
    borderRadius: 8,
  },
  aiCard: {
    backgroundColor: "#f7f7f7",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  generateBtn: {
    marginTop: 30,
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  generateBtnText: {
    color: "#fff",
    fontWeight: "600",
  },
});
