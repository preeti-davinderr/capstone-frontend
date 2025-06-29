import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Modal,
  Dimensions,
  Alert,
} from "react-native";
import { Accelerometer } from "expo-sensors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { BarChart } from "react-native-chart-kit";
import Header from "../components/Header";

const screenWidth = Dimensions.get("window").width;

interface KickEntry {
  _id?: string;
  id: string;
  time: string;
  date: string;
  count: number;
}

export default function KickCounterScreen() {
  const navigation = useNavigation();
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
  }, []);

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
      const formattedDate = date.toISOString().split("T")[0]; // e.g. "2025-06-20"
      const res = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/api/kicks/date/${uid}?date=${formattedDate}`
      );
      const data = await res.json();
      console.log("Kick response:", data);
      if (Array.isArray(data)) {
        const formatted: KickEntry[] = data.map((k: any) => ({
          _id: k._id, // ✅ this is required
          id: new Date(k.date).getTime().toString(), // UI id
          time: k.time,
          date: k.date,
          count: k.count,
        }));
        setActivity(formatted);
      } else {
        console.error("Unexpected response format:", data);
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
        if (response.ok && data._id) {
          const updatedEntry = { ...entry, _id: data._id };

          setActivity((prev) =>
            prev.map((e) => (e.id === entry.id ? updatedEntry : e))
          );
        }
      } else {
        console.error("Backend response missing _id:", data);
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
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleDelete = (entry: KickEntry) => {
    if (!entry._id) {
      console.warn("Can't delete entry without _id");
      return;
    }

    Alert.alert("Delete Entry", "Are you sure you want to delete this entry?", [
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
      time: now.toTimeString().split(" ")[0], // "14:14:17"
      date: now.toISOString().split("T")[0], // "2025-06-20"
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
        time: now.toTimeString().split(" ")[0], // "14:14:17"
        date: now.toISOString().split("T")[0], // "2025-06-20"
        count: liveCount,
      };
      setActivity((prev) => [entry, ...prev]);
      saveToBackend(entry);
    } else {
      console.log("No kicks detected, nothing to save.");
    }

    setLiveCount(0);
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

  const isToday = (date: Date) => {
    const now = new Date();
    return (
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    );
  };

  const todayActivity = activity.filter(
    (e) => e.date === kickDate.toISOString().split("T")[0]
  );

  const formattedDate = kickDate.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const kicksToday = todayActivity.reduce((sum, e) => sum + e.count, 0);

  const getWeeklyKickData = () => {
    const result: { [key: string]: number } = {};
    activity.forEach((entry) => {
      const day = new Date(parseInt(entry.id)).toLocaleDateString();
      result[day] = (result[day] || 0) + entry.count;
    });
    const sorted = Object.keys(result)
      .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
      .slice(-7);
    return {
      labels: sorted.map((d) => d.split("/").slice(0, 2).join("/")),
      datasets: [{ data: sorted.map((d) => result[d]) }],
    };
  };

  return (
    <>
      <Header title="Baby's movement detection" />

      <ScrollView contentContainerStyle={styles.container}>
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

        <View style={styles.kickCard}>
          <Text style={styles.kickLabel}>Total Kicks</Text>
          <Text style={styles.kickCount}>{kicksToday}</Text>
        </View>

        {isToday(kickDate) && (
          <>
            <TouchableOpacity style={styles.detectBtn} onPress={startDetection}>
              <Text style={styles.detectBtnText}>Start Detection</Text>
            </TouchableOpacity>

            <View style={styles.manualBox}>
              <Text>Manual Entry</Text>
              <View style={styles.manualRow}>
                <TextInput
                  value={manualCount}
                  onChangeText={setManualCount}
                  placeholder="Enter kicks"
                  keyboardType="numeric"
                  style={styles.manualInput}
                />
                <TouchableOpacity
                  onPress={handleManualAdd}
                  style={styles.manualAddBtn}
                >
                  <Text style={{ color: "#fff" }}>Add</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}

        <Text style={styles.sectionTitle}>Activity</Text>
        {todayActivity.length === 0 ? (
          <Text style={styles.emptyText}>No kicks recorded.</Text>
        ) : (
          <FlatList
            data={todayActivity}
            keyExtractor={(item) => item._id ?? item.id}
            renderItem={({ item }) => (
              <View style={styles.activityItem}>
                <Text>
                  👣 {item.count} @ {item.time}
                </Text>
                <TouchableOpacity
                  onPress={() => handleDelete(item)}
                  style={styles.deleteBtn}
                >
                  <FontAwesome name="trash" size={18} color="#900" />
                </TouchableOpacity>
              </View>
            )}
          />
        )}

        <Text style={styles.sectionTitle}>Weekly Kick Report</Text>
        <BarChart
          data={getWeeklyKickData()}
          width={screenWidth - 40}
          height={220}
          fromZero
          yAxisLabel=""
          chartConfig={{
            backgroundGradientFrom: "#fff",
            backgroundGradientTo: "#fff",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0,0,0,${opacity})`,
            labelColor: (opacity = 1) => `rgba(0,0,0,${opacity})`,
          }}
          style={{ marginBottom: 20 }}
          yAxisSuffix=""
        />

        <View style={styles.tipBox}>
          <Text style={styles.tipTitle}>💡 Tip</Text>
          <Text style={styles.tipText}>
            - Count kicks when baby is most active, usually after meals or in the
            evening.
          </Text>
          <Text style={styles.tipText}>
            - Keep mobile surface steady.
          </Text>
        </View>

        <Modal visible={showModal} transparent>
          <View style={styles.modalOverlay}>
            <View style={styles.modalBox}>
              <Text style={styles.modalTitle}>Detecting Kicks...</Text>
              <Text style={styles.modalCount}>{liveCount}</Text>
              <TouchableOpacity onPress={stopDetection} style={styles.stopBtn}>
                <Text style={styles.stopText}>Stop Detection</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 40, backgroundColor: "#fff" },
  backBtn: { marginBottom: 10 },
  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  arrow: { fontSize: 26, paddingHorizontal: 10 },
  dateHeader: { fontSize: 18, fontWeight: "600" },
  kickCard: {
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  kickLabel: { fontSize: 16, color: "#666" },
  kickCount: { fontSize: 36, fontWeight: "bold", marginTop: 10 },
  detectBtn: {
    backgroundColor: "#000",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  detectBtnText: { color: "#fff", fontSize: 16 },
  manualBox: {
    backgroundColor: "#f1f1f1",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  manualRow: { flexDirection: "row", marginTop: 10 },
  manualInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
  },
  manualAddBtn: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    justifyContent: "center",
    borderRadius: 8,
  },
  sectionTitle: { fontSize: 16, fontWeight: "bold", marginVertical: 15 },
  activityItem: {
    backgroundColor: "#f9f9f9",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  emptyText: { color: "#777", fontStyle: "italic", marginBottom: 20 },
  deleteBtn: { padding: 5 },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    backgroundColor: "#fff",
    padding: 30,
    borderRadius: 15,
    alignItems: "center",
    width: 300,
  },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  modalCount: { fontSize: 48, fontWeight: "bold", marginBottom: 10 },
  stopBtn: {
    backgroundColor: "#ff3b30",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
  },
  stopText: { color: "#fff", fontSize: 16 },
  tipBox: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  tipTitle: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  tipText: {
    fontSize: 14,
    color: "#444",
  },
});
