import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import HorizontalScroll from "../components/HorizontalScroll";
import PregnancyProgressCard from "../components/PregnancyProgressCard";
import WeekDevelopmentCard from "../components/WeekDevelopmentCard";
import HighlightsGrid from "../components/HighlightsGrid";
import WeekHighlightsDetails from "../components/WeekHighlightsDetails";
import WeekHighlightsList from "../components/WeekHighlightsList";
import ArticleList from "../components/ArticleList";
import { weekData, WeekDetails } from "../components/weekData";
import FloatingBotButton from "../components/FloatingBotButton";
import MainHeader from "../components/MainHeader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GradientCard from "../components/GradientCard";
import WeekDevelopmentInfo from "../components/WeekDevelopmentInfo";
import TrimesterCare from "../components/TrimesterCare";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  const [selectedWeek, setSelectedWeek] = useState<number>(5);
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    const loadUserName = async () => {
      try {
        const userString = await AsyncStorage.getItem("user");
        if (userString) {
          const user = JSON.parse(userString);
          if (user?.name) {
            setName(user.name);
          }
        }
      } catch (error) {
        console.error("Error loading user from AsyncStorage:", error);
      }
    };
    loadUserName();
  }, []);

  const currentWeekData: WeekDetails = weekData.find(
    (w) => w.week === selectedWeek
  )!;

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#fff" }}
      edges={["left", "right", "bottom"]}
    >
      <MainHeader
        title={name ? `Hello, ${name}!` : "Health"}
        subtitle="How are you feeling today?"
      />

      <View style={{ flex: 1 }}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={{ paddingBottom: 40 }} // ensures content does not hide under the button
        >
          <HorizontalScroll
            weekData={weekData}
            style={{ marginBottom: 24 }}
            onWeekChange={(week) => setSelectedWeek(week)}
          />
          <PregnancyProgressCard
            week={selectedWeek}
            dueDate="Aug 15"
            daysLeft={112 - (selectedWeek - 23) * 7}
            trimester={
              selectedWeek < 13
                ? "First Trimester"
                : selectedWeek < 27
                ? "Second Trimester"
                : "Third Trimester"
            }
            style={{ marginBottom: 24 }}
          />

          <WeekDevelopmentCard
            image={currentWeekData.image}
            size={currentWeekData.size}
            weight={currentWeekData.weight}
            developments={currentWeekData.developments}
          />

          <WeekDevelopmentInfo
            footer={currentWeekData.footer}
            description={currentWeekData.description}
          />

          <Text style={styles.sectionTitle}>This Week's Highlights</Text>
          <WeekHighlightsList highlights={currentWeekData.highlights} />

          <Text style={styles.sectionTitle}>Useful Articles</Text>
          <ArticleList articles={currentWeekData.articles} />

          <TrimesterCare
            title={
              selectedWeek < 13
                ? "First Trimester Care"
                : selectedWeek < 27
                ? "Second Trimester Care"
                : "Third Trimester Care"
            }
          />

         
        </ScrollView>
        <FloatingBotButton />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  description: {
    fontSize: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 2,
  },
  bullet: {
    fontSize: 15,
    marginVertical: 4,
  },
  highlightsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginBottom: 24,
  },
  highlightCard: {
    width: "47%",
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  icon: {
    fontSize: 24,
    marginBottom: 8,
  },
  highlightTitle: {
    fontWeight: "600",
  },
  highlightSubtitle: {
    color: "#555",
    fontSize: 12,
    textAlign: "center",
  },
  articleCard: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    alignItems: "center",
  },
  articleLabel: {
    width: 50,
    height: 50,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  articleTitle: {
    fontWeight: "600",
  },
  articleSubtitle: {
    fontSize: 13,
    color: "#666",
    marginVertical: 4,
  },
  articleMeta: {
    fontSize: 12,
    color: "#888",
  },
});

export default HomeScreen;
