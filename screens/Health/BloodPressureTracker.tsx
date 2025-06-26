
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Alert,
import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const API_BASE_URL = 'http://192.168.1.112:5001/api/userHealth';; // ⬅️ Replace with your IP or domain
const USER_ID = '68363fabfa6e794d7eac980a'; // ⬅️ This should ideally come from login/context
  Alert,
} from "react-native";
import { DatePickerModal } from "react-native-paper-dates";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../../components/Header";

const BP_HISTORY_KEY = "bpHistory";
type BPEntry = {
  systolic: string;
  diastolic: string;
  datetime: string;
  status: string;
  userID: string,
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


function formatDateTime(date: Date) {
  const pad = (n: number) => (n < 10 ? `0${n}` : n);
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const year = date.getFullYear();
  const hour = pad(date.getHours());
  const min = pad(date.getMinutes());
  return `${month}/${day}/${year}, ${hour}:${min}`;
function formatDateTime(d: Date): string {
  const pad = (n: number) => (n < 10 ? `0${n}` : n);
  return `${pad(d.getMonth() + 1)}/${pad(
    d.getDate()
  )}/${d.getFullYear()}, ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function BloodPressureTracker() {
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
      setHistory(result.data || []);
    } else {
      console.error('Fetch failed:', result.message);
    }
  } catch (err) {
    console.error('Error fetching BP history:', err);
  }
};

  useEffect(() => {

  fetchHistory();
}, []);

  const handleSave = async () => {
  if (!systolic || !diastolic || !datetime) {
    Alert.alert('Missing Fields', 'Please fill in all fields.');
    return;
  }

  if (isNaN(Number(systolic)) || isNaN(Number(diastolic))) {
    Alert.alert('Invalid Input', 'Systolic and Diastolic must be numbers.');
    return;
  }

  const newEntry = {
    userID: USER_ID,
    systolic,
    diastolic,
    datetime,
    status: getBPStatus(systolic, diastolic),
    const loadHistory = async () => {
      const stored = await AsyncStorage.getItem(BP_HISTORY_KEY);
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    };
    loadHistory();
  }, []);

  const saveToBackend = async () => {
    const user = await AsyncStorage.getItem("user");
    const parsed = user ? JSON.parse(user) : null;
    if (!parsed?.id) {
      Alert.alert("Error", "User not found");
      return;
    }

    const newEntry: BPEntry = {
      systolic,
      diastolic,
      datetime: formatDateTime(date),
      status: getBPStatus(systolic, diastolic),
    };

    const updatedHistory = [newEntry, ...history];
    setHistory(updatedHistory);
    await AsyncStorage.setItem(BP_HISTORY_KEY, JSON.stringify(updatedHistory));

    try {
      const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/bp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: parsed.id,
          systolic,
          diastolic,
          datetime: date,
          status: newEntry.status,
        }),
      });
      const result = await res.json();
      if (res.ok) {
        Alert.alert("Saved", "Blood pressure data saved successfully.");
        setSystolic("");
        setDiastolic("");
        setDate(new Date());
      } else {
        Alert.alert("Error", result.message || "Save failed");
      }
    } catch (err) {
      console.error("Save failed", err);
      Alert.alert("Error", "Network/server error");
    }
  };

  try {
    const res = await fetch(`${API_BASE_URL}/bp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEntry),
    });

    const result = await res.json();

    if (result.success) {
      console.log('✅ Saved to DB:', result.data);

      // 🔁 Re-fetch full history to reflect updated entries
      fetchHistory();

      // Clear inputs
      setSystolic('');
      setDiastolic('');
      setDatetime(formatDateTime(new Date()));
    } else {
      Alert.alert('Save Failed', result.message || 'Unknown error.');
    }
  } catch (err) {
    console.error('Error saving BP:', err);
    Alert.alert('Error', 'Failed to save BP entry.');
  }
};


  const current = history.length > 0 ? history[0] : null;

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#f5f5f5', marginBottom: 12 }}>
        <TouchableOpacity onPress={() => navigation.goBack?.()} style={{ paddingHorizontal: 8 }}>
          <Ionicons name="arrow-back" size={24} color="#222" />
        </TouchableOpacity>
        <Text style={{ flex: 1, textAlign: 'center', fontSize: 20, fontWeight: '500', color: '#222' }}>Blood Pressure</Text>
        <View style={{ width: 32 }} />
      </View>

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
              onChangeText={text => setSystolic(text.replace(/[^0-9]/g, ''))}
              maxLength={3}
            />
            <Text style={styles.unitLabel}>mmHg</Text>

    <>
      <Header title="Blood Pressure" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
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
                onChangeText={(text) =>
                  setSystolic(text.replace(/[^0-9]/g, ""))
                }
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
                onChangeText={(text) =>
                  setDiastolic(text.replace(/[^0-9]/g, ""))
                }
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
        <View style={styles.statusRow}>
          <View>
            <Text style={styles.statusTitle}>Current Status</Text>
            <Text style={styles.statusMain}>
              {current ? getBPStatus(current.systolic, current.diastolic) : 'No Data'}
            </Text>
            <Text style={styles.statusSub}>
              {current ? `Last reading: ${current.systolic}/${current.diastolic} mmHg` : 'No recent reading'}
            </Text>
          </View>
          <Ionicons name="heart" size={24} color="#bbb" style={styles.heartIcon} />

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
          <Text style={{ color: '#aaa', textAlign: 'center', marginVertical: 10 }}>No history yet.</Text>
        )}
        {history.map((item, idx) => (
          <View style={styles.historyItem} key={idx}>
            <View>
              <Text style={styles.historyBP}>• {item.systolic}/{item.diastolic}</Text>
              <Text style={styles.historyTime}>{item.datetime}</Text>
            </View>
            <View style={
              item.status === 'Normal' ? styles.badgeNormal :
              item.status === 'High' ? styles.badgeHigh :
              [styles.badgeNormal, { backgroundColor: '#fffbe6', borderColor: '#ffe58f', borderWidth: 1 }]
            }>
              <Text style={styles.badgeText}>{item.status || 'Unknown'}</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>History</Text>
          {history.length === 0 && (
            <Text style={{ color: "#aaa" }}>No entries yet.</Text>
          )}
          {history.map((item, idx) => (
            <View key={idx} style={styles.historyItem}>
              <View>
                <Text style={styles.historyBP}>
                  • {item.systolic}/{item.diastolic}
                </Text>
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
