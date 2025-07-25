import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
  ScrollView,
} from "react-native";
import { Accelerometer } from "expo-sensors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../components/SubHeader";
import HealthHistoryList from "../components/HealthHistoryList";
import {
  COLORS,
  SPACING,
  RADIUS,
  TEXT_STYLES,
  EFFECTS,
} from "../styles/globalStyles";
import CommonButton from "../components/CommonButton";
import { SafeAreaView } from "react-native-safe-area-context";

interface KickEntry {
  _id?: string;
  id: string;
  time: string;
  date: string;
  count: number;
}

export default function KickCounterScreen() {
  const [userId, setUserId] = useState("");
  const [kickDate, setKickDate] = useState(new Date());
  const [manualCount, setManualCount] = useState("");
  const [activity, setActivity] = useState<KickEntry[]>([]);
  const [liveCount, setLiveCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [subscription, setSubscription] = useState<any>(null);

  const threshold = 1.3;

  useEffect(() => {
    loadUserAndFetchKicks();
    return () => stopDetection();
  }, [kickDate]);

  const loadUserAndFetchKicks = async () => {
    const user = await AsyncStorage.getItem("user");
    if (user) {
      const parsed = JSON.parse(user);
      setUserId(parsed.id);
      fetchKicks(parsed.id, kickDate);
    }
  };

  const fetchKicks = async (uid: string, date: Date) => {
    try {
      const formattedDate = date.toISOString().split("T")[0];
      const res = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/api/kicks/date/${uid}?date=${formattedDate}`
      );
      const data = await res.json();
      if (Array.isArray(data)) {
        const formatted: KickEntry[] = data.map((k: any) => ({
          _id: k._id,
          id: new Date(k.date).getTime().toString(),
          time: k.time,
          date: k.date,
          count: k.count,
        }));
        setActivity(formatted);
      }
    } catch (err) {
      console.error("Fetching kicks failed:", err);
    }
  };

  const saveToBackend = async (entry: KickEntry) => {
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/api/kicks`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...entry, userId }),
        }
      );
      const data = await response.json();
      if (response.ok && data._id) {
        const updatedEntry = { ...entry, _id: data._id };
        setActivity((prev) =>
          prev.map((e) => (e.id === entry.id ? updatedEntry : e))
        );
      }
    } catch (err) {
      console.error("Save to DB failed:", err);
    }
  };

  const deleteFromBackend = async (_id?: string) => {
    if (!_id) return;
    try {
      const res = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/api/kicks/${_id}`,
        { method: "DELETE" }
      );
      if (!res.ok) {
        Alert.alert("Error", "Failed to delete entry.");
      }
    } catch (err) {
      console.error("Delete failed:", err);
      Alert.alert("Error", "Network or server error.");
    }
  };

  const handleDelete = (entry: KickEntry) => {
    Alert.alert("Confirm Delete", "Are you sure you want to delete?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          setActivity((prev) => prev.filter((e) => e._id !== entry._id));
          deleteFromBackend(entry._id);
        },
      },
    ]);
  };

  const handleManualAdd = () => {
    const num = parseInt(manualCount.trim());
    if (isNaN(num) || num <= 0) {
      Alert.alert("Invalid Entry", "Please enter a number greater than 0.");
      return;
    }
    const now = new Date();
    const entry: KickEntry = {
      id: now.getTime().toString(),
      time: now.toTimeString().split(" ")[0],
      date: now.toISOString().split("T")[0],
      count: num,
    };
    setActivity((prev) => [entry, ...prev]);
    setManualCount("");
    saveToBackend(entry);
  };

  const startDetection = () => {
    if (!isToday(kickDate)) return;
    setLiveCount(0);
    setShowModal(true);
    const sub = Accelerometer.addListener(({ x, y, z }) => {
      const magnitude = Math.sqrt(x * x + y * y + z * z);
      if (magnitude > threshold) {
        setLiveCount((prev) => prev + 1);
      }
    });
    Accelerometer.setUpdateInterval(200);
    setSubscription(sub);
  };

  const stopDetection = () => {
    subscription?.remove();
    setSubscription(null);
    setShowModal(false);
    if (liveCount > 0) {
      const now = new Date();
      const entry: KickEntry = {
        id: now.getTime().toString(),
        time: now.toTimeString().split(" ")[0],
        date: now.toISOString().split("T")[0],
        count: liveCount,
      };
      setActivity((prev) => [entry, ...prev]);
      saveToBackend(entry);
    }
    setLiveCount(0);
  };

  const isToday = (date: Date) => {
    const now = new Date();
    return (
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    );
  };

  const goToPreviousDay = () => {
    const newDate = new Date(kickDate);
    newDate.setDate(kickDate.getDate() - 1);
    setKickDate(newDate);
  };

  const goToNextDay = () => {
    const newDate = new Date(kickDate);
    newDate.setDate(kickDate.getDate() + 1);
    if (newDate <= new Date()) setKickDate(newDate);
  };

  const formattedDate = kickDate.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const kicksToday = activity
    .filter((e) => e.date === kickDate.toISOString().split("T")[0])
    .reduce((sum, e) => sum + e.count, 0);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.background }}
      edges={["left", "right", "bottom"]}
    >
      <Header title="Kick Counter" />
      <ScrollView contentContainerStyle={styles.container}>
        {/* Date Navigation */}
        <View style={styles.dateRow}>
          <TouchableOpacity onPress={goToPreviousDay}>
            <Text style={styles.arrow}>←</Text>
          </TouchableOpacity>
          <Text style={styles.dateHeader}>{formattedDate}</Text>
          <TouchableOpacity onPress={goToNextDay} disabled={isToday(kickDate)}>
            <Text style={[styles.arrow, isToday(kickDate) && { opacity: 0.3 }]}>
              →
            </Text>
          </TouchableOpacity>
        </View>

        {/* Total Kicks Card */}
        <View style={styles.totalCard}>
          <Text style={styles.totalLabel}>Total Kicks Today</Text>
          <Text style={styles.totalCount}>
            {kicksToday.toString().padStart(2, "0")}
          </Text>
        </View>

        {/* Show add buttons only for today */}
        {isToday(kickDate) && (
          <>
            {/* <View style={styles.outerCard}>
              <Text style={styles.cardLabel}>Automatic Detection</Text>
              <CommonButton label="Start Detection" onPress={startDetection} />
            </View> */}

            <View style={styles.outerCard}>
              <Text style={styles.cardLabel}>Manual Entry</Text>
              <TextInput
                value={manualCount}
                onChangeText={setManualCount}
                placeholder="Enter kicks"
                keyboardType="numeric"
                style={styles.manualInput}
              />
              <CommonButton label="Add" onPress={handleManualAdd} />
            </View>
          </>
        )}

        {/* History */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>History</Text>
          {activity.length === 0 ? (
            <Text style={styles.emptyText}>
              No kicks recorded for this date.
            </Text>
          ) : (
            <HealthHistoryList<KickEntry>
              data={activity}
              getDate={(item) => new Date(item.date)}
              onDelete={handleDelete}
              showFilter={false}
              renderItem={(item) => (
                <View style={styles.historyItem}>
                  <Text style={styles.historyText}>{item.count} kicks</Text>
                  <Text style={styles.historyDate}>{item.time}</Text>
                </View>
              )}
            />
          )}
        </View>

        {/* TIPs */}
        <View style={styles.tipBox}>
          <Text style={styles.tipTitle}>💡 Tips</Text>
          <Text style={styles.tipText}>
            - Count kicks when the baby is most active, usually after meals or
            in the evening.
          </Text>
          <Text style={styles.tipText}>
            - Keep your phone steady during detection.
          </Text>
        </View>

        {/* Detection Modal */}
        <Modal visible={showModal} transparent>
          <View style={styles.modalOverlay}>
            <View style={styles.modalBox}>
              <Text style={styles.modalTitle}>Detecting Kicks...</Text>
              <Text style={styles.modalCount}>{liveCount}</Text>
              <CommonButton label="Stop Detection" onPress={stopDetection} />
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    padding: SPACING.spacing16,
    paddingBottom: SPACING.spacing32,
  },
  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.spacing12,
  },
  arrow: { fontSize: 26, paddingHorizontal: 10 },
  dateHeader: { ...TEXT_STYLES.lead },
  totalCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    paddingVertical: SPACING.spacing16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SPACING.spacing12,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
    ...EFFECTS.softShadow,
  },
  totalLabel: {
    ...TEXT_STYLES.bodyBase,
    color: COLORS.gray900,
    marginBottom: SPACING.spacing8,
  },
  totalCount: {
    fontSize: 48,
    fontWeight: "700",
    color: COLORS.gray900,
  },
  outerCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.spacing16,
    marginBottom: SPACING.spacing12,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
    ...EFFECTS.softShadow,
  },
  cardLabel: {
    ...TEXT_STYLES.lead,
    color: COLORS.gray900,
    marginBottom: SPACING.spacing8,
  },
  manualInput: {
    borderWidth: 1,
    borderColor: COLORS.gray300,
    borderRadius: RADIUS.md,
    padding: SPACING.spacing12,
    fontSize: 16,
    backgroundColor: COLORS.gray100,
    width: "100%",
    marginBottom: SPACING.spacing8,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.spacing16,
    marginBottom: SPACING.spacing12,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
    ...EFFECTS.softShadow,
  },
  historyItem: {},
  historyText: { ...TEXT_STYLES.bodyBase },
  historyDate: {
    fontSize: 12,
    color: COLORS.gray500,
    marginTop: 2,
  },
  emptyText: { ...TEXT_STYLES.caption, color: COLORS.gray500 },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    backgroundColor: COLORS.white,
    padding: SPACING.spacing20,
    borderRadius: RADIUS.lg,
    alignItems: "center",
    width: "80%",
  },
  modalTitle: { ...TEXT_STYLES.lead, marginBottom: SPACING.spacing12 },
  modalCount: {
    fontSize: 48,
    fontWeight: "bold",
    marginBottom: SPACING.spacing12,
  },
  cardTitle: {
    ...TEXT_STYLES.lead,
    marginBottom: SPACING.spacing12,
  },
  tipBox: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.spacing16,
    marginBottom: SPACING.spacing12,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
    ...EFFECTS.softShadow,
  },

  tipTitle: {
    ...TEXT_STYLES.lead,
    marginBottom: SPACING.spacing12,
  },

  tipText: {
    ...TEXT_STYLES.bodyBase,
    color: COLORS.gray700,
    marginBottom: SPACING.spacing4,
  },
});
