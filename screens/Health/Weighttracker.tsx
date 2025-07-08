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
import HealthHistoryList from "../../components/HealthHistoryList";

type WeightEntry = {
  value: string;
  unit: "kg" | "lbs";
  date: string;
};

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

  const handleDelete = async (item: WeightEntry) => {
    try {
      const user = await AsyncStorage.getItem("user");
      const parsed = user ? JSON.parse(user) : null;
      if (!parsed?.id) {
        Alert.alert("Error", "User not found");
        return;
      }

      const res = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/api/userHealth/weight?id=${parsed.id}&date=${item.date}`,
        { method: "DELETE" }
      );

      if (res.ok) {
        setHistory((prev) => prev.filter((entry) => entry.date !== item.date));
      } else {
        Alert.alert("Error", "Failed to delete entry.");
      }
    } catch (err) {
      console.error("Delete failed:", err);
      Alert.alert("Error", "Network or server error.");
    }
  };

  const handleAddEntry = async () => {
    if (!weight || !date) {
      Alert.alert("Missing Field", "Please enter weight and select a date.");
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

        <View style={styles.card}>
          <Text style={styles.cardTitle}>History</Text>
          <HealthHistoryList
            data={history}
            getDate={(item) => new Date(item.date)}
            showFilter={true}
            onDelete={handleDelete}
            renderItem={(item) => (
              <View style={styles.historyItem}>
                <Text style={styles.historyWeight}>
                  {item.value} {item.unit}
                </Text>
                <Text style={styles.historyDate}>
                  {new Date(item.date).toLocaleDateString()}
                </Text>
              </View>
            )}
          />
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
});
