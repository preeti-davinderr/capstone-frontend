import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootStackParamList } from "../../App";
import CommonButton from "../../components/CommonButton";

type Props = NativeStackScreenProps<RootStackParamList, "Onboarding">;

const pages = [
  {
    emoji: "👶",
    title: "See Baby’s Development",
    subtitle:
      "Explore baby growth visuals, expert articles, and quick AI support.",
  },
  {
    emoji: "🩺",
    title: "Stay Healthy & Connected",
    subtitle:
      "Get personalized health advice and share updates with loved ones.",
  },
  {
    emoji: "📖",
    title: "Capture Your Story",
    subtitle: "Write your feelings and save precious moments in your journal.",
  },
];

// Dot Component
const Dots = ({
  count,
  activeIndex,
}: {
  count: number;
  activeIndex: number;
}) => {
  return (
    <View style={styles.dotsContainer}>
      {Array.from({ length: count }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            activeIndex === index ? styles.activeDot : styles.inactiveDot,
          ]}
        />
      ))}
    </View>
  );
};

const OnboardingScreen = ({ navigation }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleContinue = () => {
    if (currentIndex < pages.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      completeOnboarding();
    }
  };

  const handleSkip = () => {
    completeOnboarding();
  };

  const completeOnboarding = async () => {
    await AsyncStorage.setItem("hasOnboarded", "true");
    navigation.replace("MainApp");
  };

  const page = pages[currentIndex];

  return (
    <View style={styles.container}>
      <View style={styles.centeredContent}>
        <Text style={styles.emoji}>{page.emoji}</Text>
        <Text style={styles.title}>{page.title}</Text>
        <Text style={styles.subtitle}>{page.subtitle}</Text>

        <Dots count={pages.length} activeIndex={currentIndex} />

        <CommonButton
          label={currentIndex === pages.length - 1 ? "Get Started" : "Continue"}
          onPress={handleContinue}
        />

        {currentIndex < pages.length - 1 ? (
          <TouchableOpacity onPress={handleSkip}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        ) : (
          <Text style={styles.invisibleSkip}>Skip</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 48,
    paddingHorizontal: 24,
    justifyContent: "center",
  },
  centeredContent: {
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  emoji: {
    fontSize: 72,
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#444",
    textAlign: "center",
    paddingHorizontal: 8,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 12,
    gap: 10,
  },
  dot: {
    height: 10,
    borderRadius: 5,
  },
  activeDot: {
    width: 20,
    backgroundColor: "#000",
  },
  inactiveDot: {
    width: 10,
    backgroundColor: "transparent",
    borderColor: "#999",
    borderWidth: 1,
  },
  skipText: {
    fontSize: 14,
    color: "#888",
    marginTop: 8,
  },
  invisibleSkip: {
    fontSize: 14,
    color: "transparent",
    marginTop: 8,
  },
});

export default OnboardingScreen;
