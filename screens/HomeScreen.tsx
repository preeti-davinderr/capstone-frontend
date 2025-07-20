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
import { COLORS, SPACING, TEXT_STYLES } from "../styles/globalStyles";

const HomeScreen = () => {
  const [selectedWeek, setSelectedWeek] = useState<number>(5);
  const [name, setName] = useState<string | null>(null);
  const [dueDate, setDueDate] = useState<string | null>(null);
  const [daysLeft, setDaysLeft] = useState<number>(0);


  const calculateCurrentWeek = (dueDateString: string) => {
    try {
      const dueDate = new Date(dueDateString);
      const today = new Date();
      
    
      today.setHours(0, 0, 0, 0);
      dueDate.setHours(0, 0, 0, 0);
      
  
      const daysSinceConception = 280 - Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
      
  
      const currentWeek = Math.floor(daysSinceConception / 7) + 1;
      
    
      return Math.max(1, Math.min(40, currentWeek));
    } catch (error) {
      console.error("Error calculating current week:", error);
      return 5; 
    }
  };

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userString = await AsyncStorage.getItem("user");
        if (userString) {
          const user = JSON.parse(userString);
          if (user?.name) {
            setName(user.name);
          }
          
         
          if (user?.dueDate) {
            setDueDate(user.dueDate);
            calculateDaysLeft(user.dueDate);
            const currentWeek = calculateCurrentWeek(user.dueDate);
            setSelectedWeek(currentWeek);
          } else if (user?.id) {
            
            try {
              const response = await fetch(
                `${process.env.EXPO_PUBLIC_API_URL}/api/user/userProfile?id=${user.id}`
              );
              const data = await response.json();
              
              if (data.success && data.data?.dueDate) {
                setDueDate(data.data.dueDate);
                calculateDaysLeft(data.data.dueDate);
                const currentWeek = calculateCurrentWeek(data.data.dueDate);
                setSelectedWeek(currentWeek);
              }
            } catch (apiError) {
              console.error("Error fetching user profile:", apiError);
            }
          }
        }
      } catch (error) {
        console.error("Error loading user from AsyncStorage:", error);
      }
    };
    loadUserData();
  }, []);

  const calculateDaysLeft = (dueDateString: string) => {
    try {
      const dueDate = new Date(dueDateString);
      const today = new Date();
      
      // Reset time to start of day for accurate calculation
      today.setHours(0, 0, 0, 0);
      dueDate.setHours(0, 0, 0, 0);
      
      const timeDiff = dueDate.getTime() - today.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      
      setDaysLeft(Math.max(0, daysDiff)); // Ensure days left is not negative
    } catch (error) {
      console.error("Error calculating days left:", error);
      setDaysLeft(0);
    }
  };

  const formatDueDate = (dueDateString: string) => {
    try {
      const date = new Date(dueDateString);
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    } catch (error) {
      console.error("Error formatting due date:", error);
      return "N/A";
    }
  };

  const currentWeekData: WeekDetails = weekData.find(
    (w) => w.week === selectedWeek
  )!;

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.background }}
      edges={["left", "right", "bottom"]}
    >
      <MainHeader
        title={name ? `Hello, ${name}!` : "Health"}
        subtitle="How are you feeling today?"
      />

      <View style={{ flex: 1 }}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <HorizontalScroll
            weekData={weekData}
            style={styles.horizontalScroll}
            onWeekChange={(week) => setSelectedWeek(week)}
            initialWeek={selectedWeek}
          />
          
          <PregnancyProgressCard
            week={selectedWeek}
            dueDate={dueDate ? formatDueDate(dueDate) : "N/A"}
            daysLeft={daysLeft}
            trimester={
              selectedWeek < 13
                ? "First Trimester"
                : selectedWeek < 27
                ? "Second Trimester"
                : "Third Trimester"
            }
            style={styles.pregnancyCard}
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
  container: {
    backgroundColor: COLORS.background,
  },
  contentContainer: {
    padding: SPACING.spacing16,
    paddingBottom: 82, // Space for floating button
  },
  horizontalScroll: {
    marginBottom: SPACING.spacing24,
  },
  pregnancyCard: {
    marginBottom: SPACING.spacing24,
  },
  sectionTitle: {
    ...TEXT_STYLES.headingH2,
    fontSize: 20,
    textAlign: "left",
    marginBottom: SPACING.spacing12,
    marginTop: SPACING.spacing24,
  },
});

export default HomeScreen;
