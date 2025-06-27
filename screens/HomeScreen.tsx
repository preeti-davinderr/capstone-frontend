// import HorizontalScroll from '@/components/HorizontalScroll'
// import { weekData } from '@/components/weekData'
// import React from 'react'
// import { SafeAreaView, Text, View } from 'react-native'

// function HomeScreen() {
//   return (
//     <View>
//         <SafeAreaView>
//             <HorizontalScroll  weekData={weekData} />
//         </SafeAreaView>
//         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//             <Text>Welcome to the Home Screen!</Text>
//         </View>
//         {/* Add your components or navigation here */}
//     </View>
//   )
// }

// export default HomeScreen

// screens/WeeklyUpdateScreen.tsx

import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import HorizontalScroll from "../components/HorizontalScroll";
import { weekData, WeekDetails } from "../components/weekData";
import FloatingBotButton from "../components/FloatingBotButton";
// import WeekScroll from '../components/WeekScroll';
// import HorizontalScroll from '@/components/HorizontalScroll';
// import { weekData, WeekDetails } from '@/components/weekData';

const HomeScreen = () => {
  const [selectedWeek, setSelectedWeek] = useState<number>(5);
  const currentWeekData: WeekDetails = weekData.find(
    (w) => w.week === selectedWeek
  )!;

  return (
    <View style={{ paddingTop: 40 }}>
      <ScrollView style={styles.container}>
        <HorizontalScroll
          weekData={weekData}
          style={{ marginBottom: 16 }}
          onWeekChange={(week) => setSelectedWeek(week)}
        />

        <Text style={styles.description}>{currentWeekData.description}</Text>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>What's Developing This Week</Text>
          {currentWeekData.developments.map((item, index) => (
            <Text key={index} style={styles.bullet}>
              • {item}
            </Text>
          ))}
        </View>

        <Text style={styles.sectionTitle}>This Week's Highlights</Text>
        <View style={styles.highlightsGrid}>
          {currentWeekData.highlights.map((item, index) => (
            <View key={index} style={styles.highlightCard}>
              <Text style={styles.icon}>{item.icon}</Text>
              <Text style={styles.highlightTitle}>{item.title}</Text>
              <Text style={styles.highlightSubtitle}>{item.subtitle}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Useful Articles</Text>
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
      </ScrollView>
      <FloatingBotButton />
    </View>
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
