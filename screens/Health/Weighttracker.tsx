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
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../../components/Header";
import CommonDateTimePicker from "../../components/CommonDateTimePicker";

type WeightEntry = {
  value: string;
  unit: "kg" | "lbs";
  date: string;
};

function getTodayLabel(date: string) {
  const today = new Date().toISOString().split("T")[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
  const entryDate = date.split("T")[0];
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

export default function WeightInputScreen() {
  const [unit, setUnit] = useState<"kg" | "lbs">("kg");
  const [weight, setWeight] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [history, setHistory] = useState<WeightEntry[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const user = await AsyncStorage.getItem("user");
        const parsed = user ? JSON.parse(user) : null;
        if (!parsed?.id) return;

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
    if (!date) {
      Alert.alert("Missing Field", "Please select date and time.");
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
      date: date.toISOString(),
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
        setDate(null);
      } else {
        Alert.alert("Error", "Failed to save weight.");
      }
    } catch (err) {
      console.error("Save weight error:", err);
      Alert.alert("Error", "Something went wrong.");
    }
  };

  const current = history.length > 0 ? history[0] : null;
  let monthStartWeight = null;
  for (let entry of history) {
    if (entry.date >= getMonthStart()) {
      monthStartWeight = entry;
      break;
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
            {["kg", "lbs"].map((u) => (
              <TouchableOpacity
                key={u}
                style={[
                  styles.unitSwitch,
                  unit === u && styles.unitSwitchActive,
                ]}
                onPress={() => {
                  if (unit !== u && weight)
                    setWeight(convertWeight(weight, unit, u as "kg" | "lbs"));
                  setUnit(u as "kg" | "lbs");
                }}
              >
                <Text
                  style={[
                    styles.unitSwitchText,
                    unit === u && styles.unitSwitchTextActive,
                  ]}
                >
                  {u}
                </Text>
              </TouchableOpacity>
            ))}
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

          <CommonDateTimePicker
            date={date}
            onChange={setDate}
            label="Date & Time"
          />

          <TouchableOpacity style={styles.saveButton} onPress={handleAddEntry}>
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
          {displayHistory.length === 0 ? (
            <Text style={{ color: "#aaa", textAlign: "center", margin: 10 }}>
              No history yet.
            </Text>
          ) : (
            displayHistory.map((item, idx) => (
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
                    {item.date.split("T")[1]?.split(".")[0] || ""}
                  </Text>
                </View>
              </View>
            ))
          )}
          {history.length > 5 && (
            <TouchableOpacity onPress={() => setShowAll(!showAll)}>
              <Text style={styles.viewMore}>
                {showAll ? "View Less ▲" : "View More ▼"}
              </Text>
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
  saveButton: {
    backgroundColor: "#111",
    borderRadius: 6,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 8,
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
