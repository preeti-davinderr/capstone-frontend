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
import { RADIUS, TEXT_STYLES } from "../styles/globalStyles";

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
      "Are you sure you want to delete?",
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
        scrollEnabled={false}
          data={filteredData}
          keyExtractor={(_, idx) => idx.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemRow}>
              <View style={{ flex: 1 }}>{renderItem(item)}</View>

              {onDelete && (
                <TouchableOpacity
                  onPress={() => handleDeletePress(item)}
                  style={styles.deleteButtonContainer}
                >
                  <Ionicons
                    name="trash-outline"
                    size={18}
                    color="#EF4444" // Red-500
                  />
                </TouchableOpacity>
              )}
            </View>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
  },
  filterRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 8,
  },
  countText: {
    ...TEXT_STYLES.bodySmall,
    color: "#333",
    flex: 1,
  },
  clearText: {
    ...TEXT_STYLES.bodySmall,
    color: "#666",
    textDecorationLine: "underline",
  },
  emptyText: {
    ...TEXT_STYLES.bodySmall,
    color: "#999",
    textAlign: "center",
    marginTop: 24,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 4,
  },
  separator: {
    height: 1,
    backgroundColor: "#f0f0f0",
    marginLeft: 4,
    marginRight: 4,
  },
  listContent: {
    paddingBottom: 8,
  },
  deleteButtonContainer: {
    width: 28,
    height: 28,
    borderRadius: RADIUS.sm,
    backgroundColor: "#FEE2E2", // Red-100
    justifyContent: "center",
    alignItems: "center",
  },
});
