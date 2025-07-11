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

const getCurrentPregnancyWeek = (dueDateString: string) => {
  const dueDate = new Date(dueDateString).getTime();
  const today = new Date().getTime();
  const msInWeek = 7 * 24 * 60 * 60 * 1000;
  const diffInMs = dueDate - today;
  const weeksLeft = Math.round(diffInMs / msInWeek);
  const currentWeek = 40 - weeksLeft;
  return Math.max(1, Math.min(40, currentWeek));
};

const HomeScreen = () => {
  const [selectedWeek, setSelectedWeek] = useState<number>(5);
  const [name, setName] = useState<string | null>(null);
  const [dueDate, setDueDate] = useState<string | null>(null);

  useEffect(() => {
    const loadUserName = async () => {
      try {
        const userString = await AsyncStorage.getItem("user");
        if (userString) {
          const user = JSON.parse(userString);
          if (user?.name) {
            setName(user.name);
          }
          if (user?.dueDate) {
            setDueDate(user.dueDate);
            setSelectedWeek(getCurrentPregnancyWeek(user.dueDate));
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
    <>
      <MainHeader
        title={name ? `Hello, ${name}!` : "Health"}
        subtitle="How are you feeling today?"
      />

      <View>
        <ScrollView style={styles.container}>
          <HorizontalScroll
            weekData={weekData}
            style={{ marginBottom: 24 }}
            onWeekChange={(week) => setSelectedWeek(week)}
          />
          <PregnancyProgressCard
            week={selectedWeek}
            dueDate={dueDate ? new Date(dueDate).toLocaleDateString() : "N/A"}
            daysLeft={dueDate ? Math.max(0, Math.round((new Date(dueDate).getTime() - new Date().getTime()) / (24 * 60 * 60 * 1000))) : 0}
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
          {/*
          <View style={styles.highlightsGrid}>
            {currentWeekData.highlights.map((item, index) => (
              <View key={index} style={styles.highlightCard}>
                <Text style={styles.icon}>{item.icon}</Text>
                <Text style={styles.highlightTitle}>{item.title}</Text>
                <Text style={styles.highlightSubtitle}>{item.subtitle}</Text>
              </View>
            ))}
          </View>
          */}
          {/* <WeekHighlightsDetails highlights={currentWeekData.highlights.map(h => ({
  icon: h.icon,
  title: h.title,
  description: h.subtitle // subtitle -> description for timeline style
}))} /> */}
<WeekHighlightsList highlights={currentWeekData.highlights} />

          <Text style={styles.sectionTitle}>Useful Articles</Text>
          {/*
          {currentWeekData.articles.map((article, index) => (
            <View key={index} style={styles.articleCard}>
              <View style={styles.articleLabel}>
                <Text>Article</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.articleTitle}>{article.title}</Text>
                <Text style={styles.articleSubtitle}>{article.subtitle}</Text>
                <Text style={styles.articleMeta}>
                  {article.readTime} • {article.date}
                </Text>
              </View>
            </View>
          ))}
          */}
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

          <View style={{ height: 240 }} />
        </ScrollView>
        <FloatingBotButton />
      </View>
    </>
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
