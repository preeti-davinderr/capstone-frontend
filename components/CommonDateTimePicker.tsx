import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { DatePickerModal, TimePickerModal } from "react-native-paper-dates";
import { Ionicons } from "@expo/vector-icons";

type CommonDateTimePickerProps = {
  date: Date | null; // allow null for empty initial state
  onChange: (date: Date) => void;
  label?: string;
};

function formatDateTime(d: Date): string {
  const pad = (n: number) => (n < 10 ? `0${n}` : n);
  return `${pad(d.getMonth() + 1)}/${pad(d.getDate())}/${d.getFullYear()}, ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function CommonDateTimePicker({
  date,
  onChange,
  label,
}: CommonDateTimePickerProps) {
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [timePickerVisible, setTimePickerVisible] = useState(false);
  const [tempDate, setTempDate] = useState<Date | null>(null); // hold date temporarily until time is picked

  const handleDateConfirm = (params: { date: Date }) => {
    const selectedDate = new Date(params.date);
    // Set default time to 12:00 if new
    selectedDate.setHours(12);
    selectedDate.setMinutes(0);
    setTempDate(selectedDate);
    setDatePickerVisible(false);
    setTimeout(() => {
      setTimePickerVisible(true);
    }, 300);
  };

  const handleTimeConfirm = ({ hours, minutes }: { hours: number; minutes: number }) => {
    if (!tempDate) return; // safety check
    const updatedDate = new Date(tempDate);
    updatedDate.setHours(hours);
    updatedDate.setMinutes(minutes);
    onChange(updatedDate);
    setTempDate(null); // clear temp after use
    setTimePickerVisible(false);
  };

  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}

      <TouchableOpacity
        style={styles.container}
        onPress={() => setDatePickerVisible(true)}
      >
        <TextInput
          style={styles.input}
          value={date ? formatDateTime(date) : ""}
          placeholder="Select Date & Time"
          editable={false}
          pointerEvents="none"
        />
        <Ionicons name="calendar-outline" size={22} style={styles.icon} />
      </TouchableOpacity>

      <DatePickerModal
        locale="en"
        mode="single"
        visible={datePickerVisible}
        date={date ?? undefined} // will not prefill current date if null
        onDismiss={() => setDatePickerVisible(false)}
        onConfirm={(params) => {
          if ("date" in params && params.date) {
            handleDateConfirm(params as { date: Date });
          }
        }}
      />

      {tempDate && (
        <TimePickerModal
          visible={timePickerVisible}
          onDismiss={() => setTimePickerVisible(false)}
          onConfirm={handleTimeConfirm}
          hours={tempDate.getHours()}
          minutes={tempDate.getMinutes()}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#fafafa",
  },
  icon: {
    marginLeft: 8,
    color: "#888",
  },
  label: {
    fontSize: 13,
    fontWeight: "500",
    marginBottom: 4,
    color: "#333",
  },
});
