import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput as RNTextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../../components/Header";
import CommonDateTimePicker from "../../components/CommonDateTimePicker";
import HealthHistoryList from "../../components/HealthHistoryList";

type BPEntry = {
  systolic: string;
  diastolic: string;
  datetime: string;
  status: string;
};

function getBPStatus(systolic: string, diastolic: string): string {
  const sys = parseInt(systolic, 10);
  const dia = parseInt(diastolic, 10);
  if (isNaN(sys) || isNaN(dia)) return "Invalid";
  if (sys > 180 || dia > 120) return "Seek Medical Help";
  if (sys < 90 || dia < 60) return "Low";
  if (sys >= 140 || dia >= 90) return "High";
  if ((sys >= 130 && sys <= 139) || (dia >= 80 && dia <= 89)) return "High";
  if (sys >= 120 && sys <= 129 && dia < 80) return "Elevated";
  if (sys >= 90 && sys <= 119 && dia >= 60 && dia <= 79) return "Normal";
  return "Unknown";
}

export default function BloodPressureTracker() {
  const [systolic, setSystolic] = useState("");
  const [diastolic, setDiastolic] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [history, setHistory] = useState<BPEntry[]>([]);

  const systolicRef = useRef<RNTextInput>(null);
  const diastolicRef = useRef<RNTextInput>(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      const parsed = user ? JSON.parse(user) : null;
      if (!parsed?.id) return;

      const res = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/api/userHealth/bp?id=${parsed.id}`
      );
      if (!res.ok) throw new Error("Failed to fetch history");

      const result = await res.json();
      const data = result.data || [];

      const formatted = data.map((entry: any) => ({
        systolic: entry.systolic,
        diastolic: entry.diastolic,
        datetime: entry.datetime,
        status: getBPStatus(entry.systolic, entry.diastolic),
      }));

      setHistory(formatted);
      await AsyncStorage.setItem("bpHistory", JSON.stringify(formatted));
    } catch (err) {
      console.error("Fetch history failed:", err);
      const stored = await AsyncStorage.getItem("bpHistory");
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    }
  };

  const handleDelete = async (item: BPEntry) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this entry?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const user = await AsyncStorage.getItem("user");
              const parsed = user ? JSON.parse(user) : null;
              if (!parsed?.id) return;

              const res = await fetch(
                `${process.env.EXPO_PUBLIC_API_URL}/api/userHealth/bp?id=${parsed.id}&datetime=${item.datetime}`,
                { method: "DELETE" }
              );

              if (res.ok) {
                setHistory((prev) =>
                  prev.filter((entry) => entry.datetime !== item.datetime)
                );
              } else {
                Alert.alert("Error", "Failed to delete entry.");
              }
            } catch (err) {
              console.error("Delete failed:", err);
              Alert.alert("Error", "Network or server error.");
            }
          },
        },
      ]
    );
  };

  const saveToBackend = async () => {
    if (!date || !systolic || !diastolic) {
      Alert.alert(
        "Missing Fields",
        "Please fill all fields and select a date."
      );
      return;
    }

    const user = await AsyncStorage.getItem("user");
    const parsed = user ? JSON.parse(user) : null;
    if (!parsed?.id) {
      Alert.alert("Error", "User not found");
      return;
    }

    const newEntry: BPEntry = {
      systolic,
      diastolic,
      datetime: date.toISOString(),
      status: getBPStatus(systolic, diastolic),
    };

    try {
      const res = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/api/userHealth/bp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userID: parsed.id,
            systolic,
            diastolic,
            datetime: date,
            status: newEntry.status,
          }),
        }
      );

      if (res.ok) {
        Alert.alert("Success", "Blood pressure data saved.");
        setSystolic("");
        setDiastolic("");
        setDate(null);
        await fetchHistory();

        systolicRef.current?.blur();
        diastolicRef.current?.blur();
      } else {
        const result = await res.json();
        Alert.alert("Error", result.message || "Save failed.");
      }
    } catch (err) {
      console.error("Save failed", err);
      Alert.alert("Error", "Network or server error.");
    }
  };

  const current = history.length > 0 ? history[0] : null;

  return (
    <>
      <Header title="Blood Pressure" />
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Record Reading</Text>
          <View style={styles.rowInputs}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Systolic</Text>
              <RNTextInput
                ref={systolicRef}
                style={styles.input}
                placeholder="~120"
                keyboardType="numeric"
                value={systolic}
                onChangeText={(text) =>
                  setSystolic(text.replace(/[^0-9]/g, ""))
                }
                maxLength={3}
              />
              <Text style={styles.unitLabel}>mmHg</Text>
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Diastolic</Text>
              <RNTextInput
                ref={diastolicRef}
                style={styles.input}
                placeholder="~80"
                keyboardType="numeric"
                value={diastolic}
                onChangeText={(text) =>
                  setDiastolic(text.replace(/[^0-9]/g, ""))
                }
                maxLength={3}
              />
              <Text style={styles.unitLabel}>mmHg</Text>
            </View>
          </View>
          <CommonDateTimePicker
            date={date}
            onChange={setDate}
            label="Date & Time"
          />
          <TouchableOpacity style={styles.saveButton} onPress={saveToBackend}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Current Status</Text>
          <Text style={styles.statusMain}>
            {current
              ? getBPStatus(current.systolic, current.diastolic)
              : "No Data"}
          </Text>
          <Text style={styles.statusSub}>
            {current
              ? `Last reading: ${current.systolic}/${current.diastolic} mmHg`
              : "—"}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>History</Text>
          <HealthHistoryList
            data={history}
            getDate={(item) => new Date(item.datetime)}
            onDelete={handleDelete}
            showFilter={true}
            renderItem={(item) => (
              <View style={styles.historyItem}>
                <View>
                  <Text style={styles.historyBP}>
                    {item.systolic}/{item.diastolic} mmHg
                  </Text>
                  <Text style={styles.historyTime}>
                    {new Date(item.datetime).toLocaleString()}
                  </Text>
                </View>
                <Text style={styles.badgeText}>{item.status}</Text>
              </View>
            )}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f7f7f7",
    flex: 1,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#eee",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  rowInputs: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  inputGroup: {
    flex: 1,
    marginRight: 8,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: "500",
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#fafafa",
    marginBottom: 12,
  },
  unitLabel: {
    fontSize: 11,
    color: "#888",
    marginBottom: 8,
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
  statusMain: {
    fontSize: 16,
    fontWeight: "600",
  },
  statusSub: {
    fontSize: 13,
    color: "#888",
  },
  historyItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  historyBP: {
    fontSize: 15,
    fontWeight: "500",
  },
  historyTime: {
    fontSize: 12,
    color: "#888",
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    overflow: "hidden",
    backgroundColor: "#eee",
  },
});
