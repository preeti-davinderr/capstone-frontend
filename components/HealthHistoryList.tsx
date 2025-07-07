import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CommonDatePicker from "./CommonDatePicker";

type Props<T> = {
  data: T[];
  getDate: (item: T) => Date;
  renderItem: (item: T) => React.ReactNode;
  onDelete?: (item: T) => void;
  showFilter?: boolean;
};

export default function HealthHistoryList<T>({
  data,
  getDate,
  renderItem,
  onDelete,
  showFilter,
}: Props<T>) {
  const [filterDate, setFilterDate] = useState<Date | null>(null);

  const filteredData = filterDate
    ? data.filter((item) => {
        const itemDate = getDate(item);
        return (
          itemDate.getFullYear() === filterDate.getFullYear() &&
          itemDate.getMonth() === filterDate.getMonth() &&
          itemDate.getDate() === filterDate.getDate()
        );
      })
    : data;

  const handleDeletePress = (item: T) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this entry?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => onDelete && onDelete(item),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {showFilter && (
        <View style={styles.filterRow}>
          <Text style={styles.countText}>{filteredData.length} Entries</Text>

          <CommonDatePicker date={filterDate} onChange={setFilterDate} />

          {filterDate && (
            <TouchableOpacity onPress={() => setFilterDate(null)}>
              <Text style={styles.clearText}>Clear</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {filteredData.length === 0 ? (
        <Text style={styles.emptyText}>No entries found.</Text>
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={(_, idx) => idx.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemRow}>
              <View style={{ flex: 1 }}>{renderItem(item)}</View>

              {onDelete && (
                <TouchableOpacity onPress={() => handleDeletePress(item)}>
                  <Ionicons name="trash-outline" size={20} color="#999" />
                </TouchableOpacity>
              )}
            </View>
          )}
          contentContainerStyle={{ gap: 8 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 16 },
  filterRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  },
  countText: { fontSize: 14, color: "#333", fontWeight: "500", flex: 1 },
  clearText: { fontSize: 14, color: "#999", textDecorationLine: "underline" },
  emptyText: { textAlign: "center", color: "#aaa", marginTop: 16 },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
