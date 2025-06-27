import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DatePickerModal } from "react-native-paper-dates";
import Header from "../../components/Header";
import { useNavigation } from "@react-navigation/native";

const API_BASE_URL = "http://192.168.1.112:5001/api/userHealth"; // replace with your backend
const USER_ID = "68363fabfa6e794d7eac980a";

type BPEntry = {
  systolic: string;
  diastolic: string;
  datetime: string;
  status: string;
  userID: string;
};

function getBPStatus(systolic: string, diastolic: string): string {
  const sys = parseInt(systolic, 10);
  const dia = parseInt(diastolic, 10);
  if (isNaN(sys) || isNaN(dia)) return "Invalid";
  if (sys < 120 && dia < 80) return "Normal";
  if (sys >= 140 || dia >= 90) return "High";
  if ((sys >= 120 && sys < 140) || (dia >= 80 && dia < 90)) return "Elevated";
  return "Unknown";
}

function formatDateTime(d: Date): string {
  const pad = (n: number) => (n < 10 ? `0${n}` : n);
  return `${pad(d.getMonth() + 1)}/${pad(d.getDate())}/${d.getFullYear()}, ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function BloodPressureTracker() {
  const navigation = useNavigation();
  const [systolic, setSystolic] = useState("");
  const [diastolic, setDiastolic] = useState("");
  const [date, setDate] = useState<Date>(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [history, setHistory] = useState<BPEntry[]>([]);

  const fetchHistory = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/bp?id=${USER_ID}`);
    const result = await res.json();

    if (result.success) {
      console.log("✅ Fetched BP history from server:", result.data);
      const previous = result.data.length > 1 ? result.data[1] : null;
      console.log("🕓 Previous entry (2nd latest):", previous);

      setHistory(result.data); // ✅ Set the state AFTER handling
    } else {
      console.error("❌ Fetch failed:", result.message);
    }
  } catch (err) {
    console.error("❌ Error fetching BP history:", err);
  }
};

// ✅ Fetch once on mount
useEffect(() => {
  fetchHistory();
}, []);

// ✅ Log history after it's been set
useEffect(() => {
  console.log("📚 Updated BP history state:", history);
}, [history]);


  const saveToBackend = async () => {
    if (!systolic || !diastolic) {
      Alert.alert("Missing Fields", "Please fill in all fields.");
      return;
    }

    if (isNaN(Number(systolic)) || isNaN(Number(diastolic))) {
      Alert.alert("Invalid Input", "Systolic and Diastolic must be numbers.");
      return;
    }

    const newEntry: BPEntry = {
      userID: USER_ID,
      systolic,
      diastolic,
      datetime: formatDateTime(date),
      status: getBPStatus(systolic, diastolic),
    };

    const updatedHistory = [newEntry, ...history];
    setHistory(updatedHistory);
    await AsyncStorage.setItem("bpHistory", JSON.stringify(updatedHistory));

    try {
      const res = await fetch(`${API_BASE_URL}/bp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEntry),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        // Alert.alert("Saved", "Blood pressure data saved successfully.");
        setSystolic("");
        setDiastolic("");
        setDate(new Date());
      } else {
        Alert.alert("Error", result.message || "Save failed");
      }

      // ✅ Always fetch latest from server (regardless of POST success/failure)
      fetchHistory();
    } catch (err) {
      console.error("Save failed", err);
      Alert.alert("Error", "Network/server error");
    }
  };

  const current = history.length > 0 ? history[0] : null;
  console.log("Current (most recent):", current);

  return (
    <>
      <Header title="Blood Pressure" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Input Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Record Reading</Text>

          <View style={styles.rowInputs}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Systolic</Text>
              <TextInput
                style={styles.input}
                placeholder="~120"
                keyboardType="numeric"
                value={systolic}
                onChangeText={(text) => setSystolic(text.replace(/[^0-9]/g, ""))}
                maxLength={3}
              />
              <Text style={styles.unitLabel}>mmHg</Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Diastolic</Text>
              <TextInput
                style={styles.input}
                placeholder="~80"
                keyboardType="numeric"
                value={diastolic}
                onChangeText={(text) => setDiastolic(text.replace(/[^0-9]/g, ""))}
                maxLength={3}
              />
              <Text style={styles.unitLabel}>mmHg</Text>
            </View>
          </View>

          <Text style={styles.inputLabel}>Date & Time</Text>
          <TouchableOpacity
            style={styles.timeRow}
            onPress={() => setShowPicker(true)}
          >
            <TextInput
              style={[styles.input, { flex: 1 }]}
              value={formatDateTime(date)}
              editable={false}
            />
            <Ionicons
              name="calendar-outline"
              size={22}
              style={styles.calendarIcon}
            />
          </TouchableOpacity>

          <DatePickerModal
            locale="en"
            mode="single"
            visible={showPicker}
            date={date}
            onDismiss={() => setShowPicker(false)}
            onConfirm={({ date: selected }) => {
              if (selected) setDate(selected);
              setShowPicker(false);
            }}
          />

          <TouchableOpacity style={styles.saveButton} onPress={saveToBackend}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>

        {/* Current Status */}
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

        {/* History */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>History</Text>
          {history.length === 0 && (
            <Text style={{ color: "#aaa", textAlign: "center", marginVertical: 10 }}>
              No history yet.
            </Text>
          )}
          {history.map((item, idx) => (
            <View key={idx} style={styles.historyItem}>
              <View>
                <Text style={styles.historyBP}>• {item.systolic}/{item.diastolic}</Text>
                <Text style={styles.historyTime}>{item.datetime}</Text>
              </View>
              <Text
                style={[
                  styles.badgeText,
                  {
                    backgroundColor:
                      item.status === "Normal"
                        ? "#f2f7f2"
                        : item.status === "High"
                        ? "#fbeaea"
                        : "#fffbe6",
                  },
                ]}
              >
                {item.status}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 16,
    backgroundColor: "#f7f7f7",
    paddingBottom: 32,
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
  rowInputs: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  inputGroup: {
    flex: 1,
    marginRight: 8,
  },
  unitLabel: {
    fontSize: 11,
    color: "#888",
    marginBottom: 8,
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
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
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
    paddingVertical: 10,
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
  },
});
