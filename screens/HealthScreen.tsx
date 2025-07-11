import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { formatDistanceToNow } from "date-fns";
import { fetchFitbitData } from "./Fitbit/fetchFitbitData";
import { useFitbitAuth } from "./Fitbit/FitbitAuthScreen";
import MainHeader from "../components/MainHeader";
import {
  COLORS,
  EFFECTS,
  RADIUS,
  SPACING,
  TEXT_STYLES,
} from "../styles/globalStyles";
import HealthRecoAI from "../components/ChatReco";

type FitbitData = {
  activity: any;
  sleep: any;
  heart: any;
};

export default function HealthScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [fitbitData, setFitbitData] = useState<FitbitData | null>(null);

  const [bpReading, setBpReading] = useState<{
    systolic: string;
    diastolic: string;
    status: string;
  } | null>(null);

  const [weightReading, setWeightReading] = useState<{
    value: string;
    unit: "kg" | "lbs";
    date: string;
  } | null>(null);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          const user = await AsyncStorage.getItem("user");
          const parsed = user ? JSON.parse(user) : null;
          const userId = parsed?.id;
          if (!userId) return;

          // ✅ FIXED BP fetch — filter + sort like weight
          const bpRes = await fetch(
            `${process.env.EXPO_PUBLIC_API_URL}/api/userHealth/bp?id=${userId}`
          );
          const bpResult = await bpRes.json();

          // BP data sorting
          if (
            bpResult.success &&
            Array.isArray(bpResult.data) &&
            bpResult.data.length > 0
          ) {
            const sortedBP = bpResult.data
              .filter((b: any) => b.datetime)
              .sort(
                (a: any, b: any) =>
                  new Date(b.datetime).getTime() -
                  new Date(a.datetime).getTime()
              );
            if (sortedBP.length > 0) {
              const { systolic, diastolic, status } = sortedBP[0];
              setBpReading({ systolic, diastolic, status });
            } else {
              setBpReading(null);
            }
          } else {
            setBpReading(null);
          }

          // ✅ Weight fetch — same as before
          const weightRes = await fetch(
            `${process.env.EXPO_PUBLIC_API_URL}/api/userHealth/weight?id=${userId}`
          );
          const weightResult = await weightRes.json();
          if (
            weightResult.success &&
            Array.isArray(weightResult.data) &&
            weightResult.data.length > 0
          ) {
            const sortedWeight = weightResult.data
              .filter((w: any) => w.createdAt)
              .sort(
                (a: any, b: any) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
              );
            const latestWeight = sortedWeight[0] || weightResult.data[0];
            const { value, unit, date } = latestWeight;
            setWeightReading({ value, unit, date });
          } else {
            setWeightReading(null);
          }
        } catch (err) {
          console.error("❌ Error fetching health data:", err);
        }
      };

      fetchData();
    }, [navigation]) // Keep refetching on focus
  );

  const { promptAsync } = useFitbitAuth(async (token) => {
    if (!token?.accessToken) return;
    const data = await fetchFitbitData(token.accessToken);
    setFitbitData(data);
  });

  const formatMinutes = (totalMinutes: number) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
  };

  return (
    <>
      <MainHeader title="Health" subtitle="Track your wellness journey" />
      <ScrollView contentContainerStyle={styles.container}>
        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.cardRow}>
            <TouchableOpacity
              style={styles.card_log}
              onPress={() => navigation.navigate("BloodPressure")}
            >
              <View style={[styles.iconContainer, styles.pinkBackground]}>
                <MaterialCommunityIcons
                  name="heart-pulse"
                  size={28}
                  color={COLORS.pink500}
                />
              </View>
              <Text style={styles.cardText}>Blood Pressure</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.card_log}
              onPress={() => navigation.navigate("Weight")}
            >
              <View style={[styles.iconContainer, styles.purpleBackground]}>
                <MaterialCommunityIcons
                  name="scale"
                  size={28}
                  color={COLORS.purple700}
                />
              </View>
              <Text style={styles.cardText}>Weight</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.cardRow}>
            <TouchableOpacity
              style={styles.card_log}
              onPress={() => navigation.navigate("KickCounter")}
            >
              <View style={[styles.iconContainer, styles.peachBackground]}>
                <MaterialCommunityIcons
                  name="baby-face-outline"
                  size={28}
                  color={COLORS.peach400}
                />
              </View>
              <Text style={styles.cardText}>Kick Count</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.card_log}
              onPress={() => navigation.navigate("FitBitSummary")}
            >
              <View style={[styles.iconContainer, styles.purpleBackground]}>
                <MaterialCommunityIcons
                  name="sync"
                  size={28}
                  color={COLORS.purple700}
                />
              </View>
              <Text style={styles.cardText}>Sync Device</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Today's Readings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Readings</Text>
          <View style={styles.card}>
            <View style={[styles.smallIconContainer, styles.pinkBackground]}>
              <MaterialCommunityIcons
                name="heart-pulse"
                size={24}
                color={COLORS.pink500}
              />
            </View>
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
            <View style={[styles.smallIconContainer, styles.purpleBackground]}>
              <MaterialCommunityIcons
                name="scale"
                size={24}
                color={COLORS.purple700}
              />
            </View>
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
                {weightReading ? "Good" : "Unknown"}
              </Text>
            </View>
          </View>
        </View>

        {/* Connected Devices */}
        <Text style={styles.sectionTitle}>Connected Devices</Text>
        <View style={styles.fitbitCard}>
          {/* Top Row */}
          <View style={styles.fitbitTopRow}>
            <View style={styles.fitbitDeviceInfo}>
              <View style={styles.fitbitIconCircle}>
                <MaterialCommunityIcons
                  name="watch"
                  size={24}
                  color={COLORS.purple700}
                />
              </View>
              <View style={{ marginLeft: SPACING.spacing12 }}>
                <Text style={styles.deviceName}>Fitbit Versa 3</Text>
                <Text style={styles.deviceSynced}>Synced just now</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => promptAsync()}>
              <Text style={styles.syncNow}>Sync</Text>
            </TouchableOpacity>
          </View>

          {/* Metrics Row */}
          <View style={styles.fitbitMetricsRow}>
            {/* Steps */}
            <View style={styles.metricCard}>
              <MaterialCommunityIcons
                name="walk"
                size={20}
                color={COLORS.success}
              />
              <Text style={styles.metricLabel}>Steps</Text>
              <Text style={styles.metricValue}>
                {fitbitData?.activity?.summary?.steps ?? "N/A"}
              </Text>
            </View>

            {/* Heart Rate */}
            <View style={styles.metricCard}>
              <MaterialCommunityIcons
                name="heart-pulse"
                size={20}
                color={COLORS.pink500}
              />
              <Text style={styles.metricLabel}>Heart Rate</Text>
              <Text style={styles.metricValue}>
                {fitbitData?.heart?.["activities-heart"]?.[0]?.value
                  ?.restingHeartRate
                  ? `${fitbitData.heart["activities-heart"][0].value.restingHeartRate} bpm`
                  : "N/A"}
              </Text>
            </View>

            {/* Sleep */}
            <View style={styles.metricCard}>
              <MaterialCommunityIcons
                name="sleep"
                size={20}
                color={COLORS.purple700}
              />
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
          <HealthRecoAI bpReading={bpReading} weightReading={weightReading} />
        </View>
      </ScrollView>
    </>
  );
}

// ✅ Your existing styles stay unchanged
const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    padding: SPACING.spacing20,
    paddingBottom: 82,
    backgroundColor: COLORS.background,
  },
  section: {
    marginTop: SPACING.spacing6,
  },
  sectionTitle: {
    ...TEXT_STYLES.headingH2,
    fontSize: 16,
    fontWeight: "600",
    marginBottom: SPACING.spacing12,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: SPACING.spacing12,
  },
  card_log: {
    width: "48%",
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    paddingVertical: SPACING.spacing16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
    ...EFFECTS.softShadow,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: RADIUS.lg,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.spacing8,
  },
  smallIconContainer: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.lg,
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.spacing12,
  },
  pinkBackground: { backgroundColor: COLORS.blush100 },
  purpleBackground: { backgroundColor: COLORS.purple100 },
  peachBackground: { backgroundColor: COLORS.peach400 + "20" },
  cardText: {
    ...TEXT_STYLES.bodyBase,
    marginTop: SPACING.spacing8,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.spacing16,
    marginBottom: SPACING.spacing12,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
    ...EFFECTS.softShadow,
  },
  textContainer: { flex: 1 },
  title: { ...TEXT_STYLES.bodyBase },
  value: { ...TEXT_STYLES.caption, color: COLORS.gray700 },
  statusBadge: {
    borderWidth: 1,
    borderColor: COLORS.success,
    backgroundColor: COLORS.gray100,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.spacing12,
    paddingVertical: SPACING.spacing4,
  },
  statusText: { ...TEXT_STYLES.caption, color: COLORS.success },
  card_connected: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.spacing16,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
    ...EFFECTS.softShadow,
    marginTop: SPACING.spacing12,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.spacing12,
  },
  deviceHeader: { flexDirection: "row", alignItems: "center" },
  iconPlaceholder1: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.gray300,
    justifyContent: "center",
    alignItems: "center",
  },
  iconText: { ...TEXT_STYLES.bodyBase, color: COLORS.gray500 },
  deviceName: { ...TEXT_STYLES.bodyBase },
  deviceMeta: { ...TEXT_STYLES.caption },
  syncButton: {
    backgroundColor: COLORS.gray900,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.spacing12,
    paddingVertical: SPACING.spacing8,
  },
  syncButtonText: { ...TEXT_STYLES.caption, color: COLORS.white },
  metricsRow: { flexDirection: "row", justifyContent: "space-between" },
  metric: { alignItems: "center", flex: 1 },
  metricLabel: { ...TEXT_STYLES.caption, color: COLORS.gray500 },
  metricValue: { ...TEXT_STYLES.bodyBase },
  fitbitCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.spacing16,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.08)",
    ...EFFECTS.softShadow,
    marginBottom: SPACING.spacing12,
  },
  fitbitTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.spacing16,
  },
  fitbitDeviceInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  fitbitIconCircle: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.lg,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.purple100,
  },
  deviceSynced: {
    ...TEXT_STYLES.caption,
    color: COLORS.success,
    marginTop: 2,
  },
  syncNow: {
    ...TEXT_STYLES.caption,
    color: COLORS.purple700,
    fontWeight:"bold"
  },
  fitbitMetricsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  metricCard: {
    flex: 1,
    alignItems: "center",
    backgroundColor: COLORS.gray100,
    borderRadius: RADIUS.lg,
    paddingVertical: SPACING.spacing12,
    marginHorizontal: 4,
  },
});
