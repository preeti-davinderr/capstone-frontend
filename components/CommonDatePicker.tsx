import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { DatePickerModal } from "react-native-paper-dates";
import { Ionicons } from "@expo/vector-icons";

type CommonDatePickerProps = {
  date: Date | null;
  onChange: (date: Date) => void;
  label?: string;
};

function formatDate(d: Date): string {
  const pad = (n: number) => (n < 10 ? `0${n}` : n);
  return `${pad(d.getMonth() + 1)}/${pad(d.getDate())}/${d.getFullYear()}`;
}

export default function CommonDatePicker({
  date,
  onChange,
  label,
}: CommonDatePickerProps) {
  const [pickerVisible, setPickerVisible] = useState(false);

  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}

      <TouchableOpacity
        style={styles.pickerButton}
        onPress={() => setPickerVisible(true)}
      >
        <Ionicons name="calendar-outline" size={18} style={styles.icon} />
        {/* <Text style={styles.pickerText}>
          {date ? formatDate(date) : ""}
        </Text> */}
      </TouchableOpacity>

      <DatePickerModal
        locale="en"
        mode="single"
        visible={pickerVisible}
        date={date ?? undefined}
        onDismiss={() => setPickerVisible(false)}
        onConfirm={(params) => {
          if ("date" in params && params.date) {
            onChange(params.date);
            setPickerVisible(false);
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  pickerButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#eee",
    borderRadius: 8,
    justifyContent: "center",
  },
  pickerText: {
    fontSize: 14,
    color: "#333",
    marginLeft: 6,
  },
  icon: {
    color: "#333",
  },
  label: {
    fontSize: 13,
    fontWeight: "500",
    marginBottom: 4,
    color: "#333",
  },
});
