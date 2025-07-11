import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput as RNTextInput,
  Alert,
  StyleSheet,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SubHeader from "../../components/SubHeader";
import CommonDateTimePicker from "../../components/CommonDateTimePicker";
import CommonButton from "../../components/CommonButton";
import HealthHistoryList from "../../components/HealthHistoryList";
import {
  COLORS,
  EFFECTS,
  RADIUS,
  SPACING,
  TEXT_STYLES,
} from "../../styles/globalStyles";

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

      const formatted = data
        .map((entry: any) => ({
          systolic: entry.systolic,
          diastolic: entry.diastolic,
          datetime: entry.datetime,
          status: getBPStatus(entry.systolic, entry.diastolic),
        }))
        .sort(
          (a:any, b:any) =>
            new Date(b.datetime).getTime() - new Date(a.datetime).getTime()
        );

      setHistory(formatted);
      await AsyncStorage.setItem("bpHistory", JSON.stringify(formatted));
    } catch (err) {
      console.error("Fetch history failed:", err);
      const stored = await AsyncStorage.getItem("bpHistory");
      if (stored) setHistory(JSON.parse(stored));
    }
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

  const current = history.length > 0 ? history[0] : null;

  const getBadgeStyle = (status: string) => {
    switch (status) {
      case "Normal":
        return { backgroundColor: "e6f4ea", color: COLORS.success };

      case "High":
      case "Seek Medical Help":
        return { backgroundColor: "#fdecea", color: COLORS.error };
      case "Low":
        return { backgroundColor: "#fff8e1", color: COLORS.warning };
      case "Elevated":
        return { backgroundColor: "#fffde7", color: COLORS.info };
      default:
        return { backgroundColor: "#eee", color: COLORS.gray700 };
    }
  };
  const getDotStyle = (status: string) => ({
    backgroundColor: getBadgeStyle(status).color,
  });

  return (
    <>
      <SubHeader title="Blood Pressure" />
      <ScrollView>
        <View style={styles.container}>
          {/* Record Reading Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Record Reading</Text>
            <View style={styles.rowInputs}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Systolic</Text>
                <RNTextInput
                  ref={systolicRef}
                  style={styles.input}
                  placeholder="120"
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
                  placeholder="80"
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
            <CommonButton label="Save Reading" onPress={saveToBackend} />
          </View>

          {/* Current Status Card */}
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

          {/* History Card */}
          <View style={[styles.card, { paddingBottom: SPACING.spacing20 }]}>
            <Text style={styles.cardTitle}>History</Text>
            <HealthHistoryList
              data={history}
              getDate={(item) => new Date(item.datetime)}
              onDelete={handleDelete}
              showFilter={true}
              renderItem={(item) => (
                <View style={styles.historyItem}>
                  <View style={styles.historyLeft}>
                    <View style={[styles.dot, getDotStyle(item.status)]} />
                    <View>
                      <Text style={styles.historyBP}>
                        {item.systolic}/{item.diastolic} mmHg
                      </Text>
                      <Text style={styles.historyTime}>
                        {new Date(item.datetime).toLocaleString()}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={[
                      styles.badge,
                      {
                        backgroundColor: getBadgeStyle(item.status)
                          .backgroundColor,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.badgeText,
                        { color: getBadgeStyle(item.status).color },
                      ]}
                    >
                      {item.status}
                    </Text>
                  </View>
                </View>
              )}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  rowInputs: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: SPACING.spacing12,
  },
  inputGroup: {
    flex: 1,
    marginRight: SPACING.spacing8,
  },
  inputLabel: {
    ...TEXT_STYLES.bodySmall,
    marginBottom: SPACING.spacing4,
  },
  input: {
    borderWidth: 1,
    borderRadius: RADIUS.md,
    padding: SPACING.spacing12,
    fontSize: 16,
    marginBottom: SPACING.spacing8,
    borderColor: "#ccc",
    backgroundColor: "#fafafa",
  },
  unitLabel: {
    fontSize: 12,
    color: COLORS.gray500,
  },
  statusMain: {
    ...TEXT_STYLES.bodyBase,
  },
  statusSub: {
    fontSize: 13,
    color: COLORS.gray500,
  },
  historyItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: SPACING.spacing8,
  },
  historyLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: SPACING.spacing12,
  },
  historyBP: {
    fontSize: 15,
    fontWeight: "500",
    color: COLORS.gray900,
  },
  historyTime: {
    fontSize: 12,
    color: COLORS.gray500,
    marginTop: 2,
  },
  badge: {
    paddingHorizontal: SPACING.spacing12,
    paddingVertical: SPACING.spacing4,
    borderRadius: RADIUS.md,
    marginRight: SPACING.spacing4,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
  },
});
