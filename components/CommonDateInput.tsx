import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { DatePickerModal } from "react-native-paper-dates";
import { COLORS, SPACING, TEXT_STYLES } from "../styles/globalStyles";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = {
  date: Date | null;
  onChange: (d: Date) => void;
};

const CommonDateInput: React.FC<Props> = ({ date, onChange }) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <TouchableOpacity
        style={styles.dateInput}
        onPress={() => setVisible(true)}
        activeOpacity={0.9}
      >
        <Text style={styles.dateText}>
          {date ? date.toLocaleDateString() : "mm/dd/yyyy"}
        </Text>
        <MaterialCommunityIcons
          name="calendar-month-outline"
          size={20}
          color={COLORS.gray500}
        />
      </TouchableOpacity>

      <DatePickerModal
        mode="single"
        visible={visible}
        onDismiss={() => setVisible(false)}
        date={date || new Date()}
        onConfirm={({ date }) => {
            if (date instanceof Date && !isNaN(date.getTime())) {
              onChange(date);
              setVisible(false);
            }
          }}
          
        // onConfirm={({ date }) => {
        //     console.log("hihiii");

        //   if (
        //     date &&
        //     typeof date === "object" &&
        //     "year" in date &&
        //     "month" in date &&
        //     "day" in date
        //   ) {
        //     const typedDate = date as {
        //       year: number;
        //       month: number;
        //       day: number;
        //     };
        //     const jsDate = new Date(
        //       typedDate.year,
        //       typedDate.month - 1,
        //       typedDate.day
        //     );
        //     onChange(jsDate);
        //     setVisible(false);
            
        //   }
        // }}
        presentationStyle="pageSheet"
        locale="en"
      />
    </>
  );
};

const styles = StyleSheet.create({
  dateInput: {
    borderWidth: 1,
    borderColor: COLORS.gray300,
    borderRadius: 12,
    paddingVertical: SPACING.spacing12,
    paddingHorizontal: SPACING.spacing16,
    width: "100%",
    backgroundColor: COLORS.white,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // marginBottom: SPACING.spacing16,
  },
  dateText: {
    fontSize: 16,
    fontFamily: TEXT_STYLES.bodyBase.fontFamily,
    color: COLORS.gray900,
  },
});

export default CommonDateInput;
