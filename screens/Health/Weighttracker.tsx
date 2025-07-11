import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SubHeader from "../../components/SubHeader";
import CommonDateTimePicker from "../../components/CommonDateTimePicker";
import HealthHistoryList from "../../components/HealthHistoryList";
import {
  COLORS,
  EFFECTS,
  RADIUS,
  SPACING,
  TEXT_STYLES,
} from "../../styles/globalStyles";
import CommonButton from "../../components/CommonButton";

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
        Alert.alert("Deleted", "Deleted successfully.");
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
        const updatedHistory = [result.data.data, ...history].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setHistory(updatedHistory);
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
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.background }}
      edges={["left", "right", "bottom"]} // ⬅️ Exclude "top"
    >
      <SubHeader title="Weight Tracker" />
      <ScrollView contentContainerStyle={styles.container}>
        {/* Add Weight Entry */}
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
          <CommonButton label="Save" onPress={handleAddEntry} />
        </View>

        {/* History */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>History</Text>
          <HealthHistoryList
            data={history}
            getDate={(item) => new Date(item.date)}
            onDelete={handleDelete}
            showFilter={true}
            renderItem={(item) => (
              <View style={styles.historyItem}>
                <View>
                  <Text style={styles.historyWeight}>
                    {item.value} {item.unit}
                  </Text>
                  <Text style={styles.historyDate}>
                    {new Date(item.date).toLocaleDateString()}
                  </Text>
                </View>
              </View>
            )}
          />
        </View>
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
  card: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.spacing16,
    marginBottom: SPACING.spacing12,
    borderWidth: 1,
    borderColor: COLORS.card,
    ...EFFECTS.softShadow,
  },
  cardTitle: {
    ...TEXT_STYLES.lead,
    marginBottom: SPACING.spacing12,
  },
  unitSwitchRow: {
    flexDirection: "row",
    backgroundColor: COLORS.gray100,
    borderRadius: RADIUS.md,
    overflow: "hidden",
    marginBottom: SPACING.spacing12,
  },
  unitSwitch: {
    flex: 1,
    paddingVertical: SPACING.spacing8,
    alignItems: "center",
  },
  unitSwitchActive: {
    backgroundColor: COLORS.white,
  },
  unitSwitchText: {
    ...TEXT_STYLES.bodyBase,
    color: COLORS.gray500,
  },
  unitSwitchTextActive: {
    color: COLORS.gray900,
    fontWeight: "700",
  },
  inputLabel: {
    ...TEXT_STYLES.bodySmall,
    marginBottom: SPACING.spacing4,
    marginTop: SPACING.spacing8,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.spacing8,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.gray300,
    borderRadius: RADIUS.md,
    padding: SPACING.spacing12,
    fontSize: 16,
    backgroundColor: COLORS.gray100,
  },
  unitLabel: {
    fontSize: 13,
    color: COLORS.gray500,
    marginLeft: SPACING.spacing8,
  },
  saveButton: {
    backgroundColor: COLORS.gray900,
    borderRadius: RADIUS.md,
    paddingVertical: SPACING.spacing12,
    alignItems: "center",
    marginTop: SPACING.spacing8,
  },
  saveButtonText: {
    ...TEXT_STYLES.bodyBase,
    color: COLORS.white,
    fontWeight: "600",
  },
  historyItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    // paddingVertical: SPACING.spacing8,
  },
  historyWeight: {
    fontSize: 15,
    fontWeight: "500",
    color: COLORS.gray900,
  },
  historyDate: {
    fontSize: 12,
    color: COLORS.gray500,
    marginTop: 2,
  },
});
