import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import MainHeader from "../../components/MainHeader";
import { SafeAreaView } from "react-native-safe-area-context";

type ImageEntry = {
  url: string;
  description: string;
  addedAt: string;
};

type Journal = {
  _id: string;
  title: string;
  designTemplate: string;
  createdAt: string;
  images: ImageEntry[];
};

const FamilyHomeScreen = ({ navigation }: any) => {
  const [journals, setJournals] = useState<Journal[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Baby Bump", "Baby Shower", "Ultrasound"];

  useFocusEffect(
    useCallback(() => {
      const fetchJournals = async () => {
        try {
          setLoading(true);
          const user = await AsyncStorage.getItem("user");
          const parsed = user ? JSON.parse(user) : null;
          const userId = parsed?.id;
          console.log("User IDparsedparsed==>:", parsed.familyCode);
          if (!userId) {
            console.error("User ID not found in AsyncStorage.");
            setLoading(false);
            return;
          }

          const res = await fetch(
            `${process.env.EXPO_PUBLIC_API_URL}/api/journal/familyCode?id=${parsed.familyCode}`
          );
          const data = await res.json();
          setJournals(data.data as Journal[]);
        } catch (err) {
          console.error("Error fetching journals:", err);
        } finally {
          setLoading(false);
        }
      };

      fetchJournals();
    }, [])
  );

  const filteredJournals =
    selectedCategory === "All"
      ? journals
      : journals.filter(
          (journal) =>
            journal.title
              .toLowerCase()
              .includes(selectedCategory.toLowerCase()) ||
            journal.designTemplate
              .toLowerCase()
              .includes(selectedCategory.toLowerCase())
        );

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#fff" }}
      edges={["left", "right", "bottom"]}
    >
      <MainHeader title="Priya’s Moments" subtitle="28 weeks pregnant" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Filter Tabs */}
        <View style={styles.filterTabs}>
          {categories.map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setSelectedCategory(tab)}
              style={[
                styles.tabButton,
                selectedCategory === tab && styles.tabSelected,
              ]}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedCategory === tab && styles.tabSelectedText,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Journals */}
        {filteredJournals.length > 0 ? (
          filteredJournals.map((journal) => (
            <TouchableOpacity
              key={journal._id}
              onPress={() => {
                navigation.navigate("JournalPreview", {
                  images: journal.images,
                  title: journal.title,
                });
              }}
            >
              <View style={styles.card}>
                <View style={styles.cardTop}>
                  <Text style={styles.cardTitle}>{journal.title}</Text>
                  <Text style={styles.cardDate}>2 days ago</Text>
                </View>
                <Text style={styles.cardSubtitle}>
                  {journal.designTemplate}
                </Text>
                <TouchableOpacity style={styles.tagButton}>
                  <Text style={styles.tagText}>
                    {journal.images.length} photos
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View style={{ marginTop: 20, alignItems: "center" }}>
            <Text style={{ fontSize: 16, color: "#666" }}>
              No journals found in this category.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#6A5ACD",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#999",
    marginTop: 2,
  },
  filterTabs: {
    flexDirection: "row",
    marginBottom: 20,
    flexWrap: "wrap",
    gap: 10,
  },
  tabButton: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: "#eee",
    borderRadius: 20,
  },
  tabSelected: {
    backgroundColor: "#6A5ACD",
  },
  tabText: {
    color: "#555",
    fontSize: 13,
  },
  tabSelectedText: {
    color: "#fff",
    fontWeight: "600",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6A5ACD",
  },
  cardDate: {
    fontSize: 12,
    color: "#999",
  },
  cardSubtitle: {
    fontSize: 13,
    color: "#444",
    marginBottom: 12,
  },
  tagButton: {
    alignSelf: "flex-start",
    backgroundColor: "#f0f0f5",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  tagText: {
    fontSize: 12,
    color: "#555",
  },
});

export default FamilyHomeScreen;
