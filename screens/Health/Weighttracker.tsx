
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const API_BASE_URL = 'http://192.168.1.112:5001/api/userHealth'; // ✅ replace with your IP
const USER_ID = '68363fabfa6e794d7eac980a';

const WEIGHT_HISTORY_KEY = "weightHistory";

type WeightEntry = {
  value: string;
  unit: "kg" | "lbs";
  date: string;
};

function formatDate(date: Date) {
  const pad = (n: number) => (n < 10 ? `0${n}` : n);
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  return `${year}-${month}-${day}`;
}

function getTodayLabel(date: string) {
  const today = formatDate(new Date());
  if (date === today) return "Today";
  const yesterday = formatDate(new Date(Date.now() - 86400000));
  if (date === yesterday) return "Yesterday";
  return date;
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
  if (from === to) return value;
  return from === "kg"
    ? (num * 2.20462).toFixed(1)
    : (num / 2.20462).toFixed(1);
}

export default function WeightInputScreen() {
  const navigation = useNavigation();
  const [unit, setUnit] = useState<"kg" | "lbs">("kg");
  const [weight, setWeight] = useState("");
  const [date, setDate] = useState(formatDate(new Date()));
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
          setHistory(result.data);
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

    const newEntry = {
      userID: parsed.id,
      value: weight,
      unit,
      date,
    };
    console.log(newEntry);

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
        setHistory([result.data.data, ...history]); // update list immediately
        setWeight("");
        setDate(formatDate(new Date()));
      } else {
        Alert.alert("Error", "Failed to save weight.");
      }
    } catch (err) {
      console.error("❌ Save weight error:", err);
      Alert.alert("Error", "Something went wrong.");
    }
  };

  // Current weight
  const current = history.length > 0 ? history[0] : null;

  // Calculate monthly change
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

  // For history, show 5 by default, expand if showAll
  const displayHistory = showAll ? history : history.slice(0, 5);

  return (
    <>
      <Header title="Weight Tracker" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Add Weight Entry Card */}
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
        {/* Current and This Month */}
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
        {/* History */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>History</Text>
          {displayHistory.length === 0 && (
            <Text
              style={{ color: "#aaa", textAlign: "center", marginVertical: 10 }}
            >
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
              {/* For demo, show a random change and time */}
              <View style={{ alignItems: "flex-end" }}>
                <Text style={styles.historyChange}>
                  {idx === 0
                    ? "+0.2"
                    : idx === 1
                    ? "-0.5"
                    : idx === 2
                    ? "-0.3"
                    : idx === 3
                    ? "+0.4"
                    : "-0.6"}
                </Text>
                <Text style={styles.historyTime}>
                  {new Date(item.date).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
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
  scrollContainer: {
    padding: 16,
    backgroundColor: "#f7f7f7",
    alignItems: "center",
    paddingBottom: 32,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
    marginBottom: 12,
    width: "100%",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "500",
    color: "#222",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
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
    backgroundColor: "#f2f2f2",
  },
  unitSwitchActive: {
    backgroundColor: "#fff",
  },
  unitSwitchText: {
    fontSize: 15,
    color: "#888",
    fontWeight: "500",
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
    marginBottom: 2,
  },
  unitLabel: {
    fontSize: 13,
    color: "#888",
    marginLeft: 8,
    marginRight: 4,
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
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 13,
    color: "#888",
    fontWeight: "500",
  },
  historyItem: {
    flexDirection: "row",
    alignItems: "center",
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
  historyChange: {
    fontSize: 14,
    color: "#888",
    fontWeight: "600",
    textAlign: "right",
  },
  historyTime: {
    fontSize: 12,
    color: "#aaa",
    textAlign: "right",
  },
  viewMore: {
    color: "#888",
    textAlign: "center",
    marginTop: 10,
    fontSize: 15,
  },
});
