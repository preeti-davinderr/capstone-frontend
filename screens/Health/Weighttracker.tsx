import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../../components/Header";

// 🔹 Utility: format with time
function formatDateTime(date: Date) {
  const pad = (n: number) => (n < 10 ? `0${n}` : n);
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function getTodayLabel(date: string) {
  const today = new Date().toISOString().split("T")[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
  const entryDate = date.split(" ")[0];
  if (entryDate === today) return "Today";
  if (entryDate === yesterday) return "Yesterday";
  return entryDate;
}

function getMonthStart() {
  const now = new Date();
  return `${now.getFullYear()}-${(now.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-01`;
}

function convertWeight(value: string, from: "kg" | "lbs", to: "kg" | "lbs") {
  const num = parseFloat(value);
  if (isNaN(num)) return "";
  return from === to
    ? value
    : from === "kg"
    ? (num * 2.20462).toFixed(1)
    : (num / 2.20462).toFixed(1);
}

type WeightEntry = {
  value: string;
  unit: "kg" | "lbs";
  date: string;
};

export default function WeightInputScreen() {
  const navigation = useNavigation();
  const [unit, setUnit] = useState<"kg" | "lbs">("kg");
  const [weight, setWeight] = useState("");
  const [date, setDate] = useState(formatDateTime(new Date()));
  const [history, setHistory] = useState<WeightEntry[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const user = await AsyncStorage.getItem("user");
        const parsed = user ? JSON.parse(user) : null;
        if (!parsed?.id) {
          console.error("User ID not found in AsyncStorage");
          return;
        }
        const res = await fetch(
          `${process.env.EXPO_PUBLIC_API_URL}/api/userHealth/weight?id=${parsed.id}`
        );
        const result = await res.json();
        if (result.success && Array.isArray(result.data)) {
          const sorted = result.data.sort(
            (a: any, b: any) =>
              new Date(b.date).getTime() - new Date(a.date).getTime()
          );
          setHistory(sorted);
        } else {
          console.warn("No weight data found");
        }
      } catch (err) {
        console.error("Error fetching weight data:", err);
      }
    };

    fetchHistory();
  }, []);

  const handleAddEntry = async () => {
    if (!weight) {
      Alert.alert("Missing Field", "Please enter your weight.");
      return;
    }
    const user = await AsyncStorage.getItem("user");
    const parsed = user ? JSON.parse(user) : null;
    if (!parsed?.id) {
      Alert.alert("Error", "User not found");
      return;
    }

    const nowDateTime = formatDateTime(new Date());
    setDate(nowDateTime);

    const newEntry = {
      userID: parsed.id,
      value: weight,
      unit,
      date: nowDateTime, // ✅ includes time
    };

    try {
      const res = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/api/userHealth/weight`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newEntry),
        }
      );

      const result = await res.json();
      if (result.success) {
        setHistory([result.data.data, ...history]);
        setWeight("");
        setDate(formatDateTime(new Date()));
      } else {
        Alert.alert("Error", "Failed to save weight.");
      }
    } catch (err) {
      console.error("❌ Save weight error:", err);
      Alert.alert("Error", "Something went wrong.");
    }
  };

  const current = history.length > 0 ? history[0] : null;
  let monthStartWeight = null;
  for (let entry of history) {
    if (entry.date >= getMonthStart()) {
      monthStartWeight = entry;
    }
  }
  const currentValue = current ? parseFloat(current.value) : 0;
  const monthValue = monthStartWeight
    ? parseFloat(monthStartWeight.value)
    : currentValue;
  const monthChange = (currentValue - monthValue).toFixed(1);
  const displayHistory = showAll ? history : history.slice(0, 5);

  return (
    <>
      <Header title="Weight Tracker" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Add Weight Entry</Text>
          <View style={styles.unitSwitchRow}>
            <TouchableOpacity
              style={[
                styles.unitSwitch,
                unit === "kg" && styles.unitSwitchActive,
              ]}
              onPress={() => {
                if (unit !== "kg" && weight)
                  setWeight(convertWeight(weight, "lbs", "kg"));
                setUnit("kg");
              }}
            >
              <Text
                style={[
                  styles.unitSwitchText,
                  unit === "kg" && styles.unitSwitchTextActive,
                ]}
              >
                kg
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.unitSwitch,
                unit === "lbs" && styles.unitSwitchActive,
              ]}
              onPress={() => {
                if (unit !== "lbs" && weight)
                  setWeight(convertWeight(weight, "kg", "lbs"));
                setUnit("lbs");
              }}
            >
              <Text
                style={[
                  styles.unitSwitchText,
                  unit === "lbs" && styles.unitSwitchTextActive,
                ]}
              >
                lbs
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.inputLabel}>Weight</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder={unit === "kg" ? "e.g. 70.5" : "e.g. 155.4"}
              keyboardType="numeric"
              value={weight}
              onChangeText={setWeight}
              maxLength={5}
            />
            <Text style={styles.unitLabel}>{unit}</Text>
          </View>
          <Text style={styles.inputLabel}>Date</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              value={date}
              editable={false}
            />
            <Ionicons
              name="calendar-outline"
              size={22}
              style={styles.calendarIcon}
            />
          </View>
          <TouchableOpacity style={styles.saveButton} onPress={handleAddEntry}>
            <Ionicons
              name="add"
              size={18}
              color="#fff"
              style={{ marginRight: 6 }}
            />
            <Text style={styles.saveButtonText}>Add Entry</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.rowStats}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>
              {current ? `${current.value} ${current.unit}` : "--"}
            </Text>
            <Text style={styles.statLabel}>Current</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{monthChange}</Text>
            <Text style={styles.statLabel}>This Month</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>History</Text>
          {displayHistory.length === 0 && (
            <Text style={{ color: "#aaa", textAlign: "center", margin: 10 }}>
              No history yet.
            </Text>
          )}
          {displayHistory.map((item, idx) => (
            <View style={styles.historyItem} key={idx}>
              <View>
                <Text style={styles.historyWeight}>
                  {item.value} {item.unit}
                </Text>
                <Text style={styles.historyDate}>
                  {getTodayLabel(item.date)}
                </Text>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <Text style={styles.historyTime}>
                  {item.date.split(" ")[1] || ""}
                </Text>
              </View>
            </View>
          ))}
          {history.length > 5 && !showAll && (
            <TouchableOpacity onPress={() => setShowAll(true)}>
              <Text style={styles.viewMore}>View More ▼</Text>
            </TouchableOpacity>
          )}
          {showAll && history.length > 5 && (
            <TouchableOpacity onPress={() => setShowAll(false)}>
              <Text style={styles.viewMore}>View Less ▲</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  // Keep your current styles here
  // unchanged unless you want me to refactor your style file for consistency.
  scrollContainer: {
    padding: 16,
    backgroundColor: "#f7f7f7",
    alignItems: "center",
    paddingBottom: 32,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    width: "100%",
    borderWidth: 1,
    borderColor: "#eee",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  unitSwitchRow: {
    flexDirection: "row",
    marginBottom: 12,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    overflow: "hidden",
  },
  unitSwitch: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
  },
  unitSwitchActive: {
    backgroundColor: "#fff",
  },
  unitSwitchText: {
    fontSize: 15,
    color: "#888",
  },
  unitSwitchTextActive: {
    color: "#222",
    fontWeight: "700",
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: "500",
    marginBottom: 4,
    marginTop: 8,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#fafafa",
  },
  unitLabel: {
    fontSize: 13,
    color: "#888",
    marginLeft: 8,
  },
  calendarIcon: {
    marginLeft: 8,
    color: "#888",
  },
  saveButton: {
    backgroundColor: "#111",
    borderRadius: 6,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  rowStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 16,
  },
  statBox: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#eee",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#222",
  },
  statLabel: {
    fontSize: 13,
    color: "#888",
    fontWeight: "500",
  },
  historyItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  historyWeight: {
    fontSize: 15,
    fontWeight: "500",
  },
  historyDate: {
    fontSize: 12,
    color: "#888",
  },
  historyTime: {
    fontSize: 12,
    color: "#888",
  },
  viewMore: {
    color: "#888",
    textAlign: "center",
    marginTop: 10,
    fontSize: 15,
  },
});
