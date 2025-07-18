import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function JournalPhotoViewerScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const params = route.params as {
    imagesByWeek: Record<string, { uri: string; description: string }[]>;
    title: string;
    selectedWeek: string;
  };

  const { imagesByWeek, title, selectedWeek } = params || {};
  const [currentWeek, setCurrentWeek] = useState(selectedWeek || "Week 1");
  const images = imagesByWeek?.[currentWeek] || [];
  const showWeekTabs = title?.toLowerCase() === "baby bump";
  return (
    <View style={styles.container}>
      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {typeof title === "string" ? title : "Journal"}
        </Text>
        <View style={{ width: 24 }} /> {/* Placeholder for symmetry */}
      </View>
  
      {/* Week Tabs if needed */}
      {showWeekTabs && imagesByWeek && typeof imagesByWeek === "object" && (
        <ScrollView
          horizontal
          style={styles.weekTabs}
          contentContainerStyle={styles.weekTabContent}
          showsHorizontalScrollIndicator={false}
        >
          {Object.keys(imagesByWeek).map((week) => (
            <TouchableOpacity
              key={week}
              onPress={() => setCurrentWeek(week)}
              style={[
                styles.weekTab,
                currentWeek === week && styles.weekTabSelected,
              ]}
            >
              <Text
                style={
                  currentWeek === week
                    ? styles.weekTextActive
                    : styles.weekText
                }
              >
                {week}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
  
      {/* Image carousel */}
      {Array.isArray(images) && images.length > 0 ? (
        <FlatList
          data={images}
          horizontal
          pagingEnabled
          keyExtractor={(_, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.imageWrapper}>
              <Image source={{ uri: item.uri }} style={styles.image} />
              <Text style={styles.caption}>{item.description || ""}</Text>
            </View>
          )}
        />
      ) : (
        <View style={styles.imageWrapper}>
          <Text style={styles.caption}>No images available for this week.</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#fff",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },

  weekTabs: {
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#fafafa",
  },
  weekTabContent: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    alignItems: "center",
  },
  weekTab: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    backgroundColor: "#eee",
    borderRadius: 20,
    marginRight: 10,
  },
  weekTabSelected: {
    backgroundColor: "#A88BFA",
  },
  weekText: {
    color: "#555",
    fontSize: 14,
  },
  weekTextActive: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },

  imageWrapper: {
    width,
    alignItems: "center",
    padding: 20,
  },
  image: {
    width: width * 0.9,
    height: width * 1.1,
    resizeMode: "cover",
    borderRadius: 20,
  },
  caption: {
    marginTop: 12,
    fontSize: 15,
    textAlign: "center",
    color: "#444",
    paddingHorizontal: 16,
  },
});
