import React, { useState, useCallback } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";

import MainHeader from "../components/MainHeader";
import CommonButton from "../components/CommonButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS,
EFFECTS,
  RADIUS,
  SPACING,
  TEXT_STYLES,
 } from "../styles/globalStyles";

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

export default function JournalScreen({ navigation }: any) {
  const [journals, setJournals] = useState<Journal[]>([]);

  const journalData = [
    {
      title: "Baby Bump",
      subtitle: "Weekly photo diary",
      description:
        "Document your growing bump with weekly photos and notes about how you're feeling.",
      meta: "40 weeks",
      icon: () => <Ionicons name="camera-outline" size={24} color="#fff" />,
      bgColor: "#8C63C7",
    },
    {
      title: "Dear Baby",
      subtitle: "Letters to your little one",
      description:
        "Write heartfelt letters to your baby throughout your pregnancy journey.",
      meta: "Letters",
      icon: () => <Ionicons name="heart" size={24} color="#fff" />,
      bgColor: "#EC4899",
    },
    {
      title: "My Body My Feelings",
      subtitle: "Physical & emotional changes",
      description:
        "Track how your body and emotions change throughout pregnancy.",
      meta: "Feelings",
      icon: () => <Entypo name="emoji-happy" size={24} color="#fff" />,
      bgColor: "#F97316",
    },
    {
      title: "First Movements",
      subtitle: "Baby’s kicks & movements",
      description:
        "Record those magical first kicks and movements you feel from your baby.",
      meta: "Kicks",
      icon: () => <Entypo name="hand" size={24} color="#fff" />,
      bgColor: "#22C55E",
    },
  ];

  useFocusEffect(
    useCallback(() => {
      const fetchJournals = async () => {
        const user = await AsyncStorage.getItem("user");
        const parsed = user ? JSON.parse(user) : null;
        const userId = parsed?.id;

        if (!userId) return;

        const res = await fetch(
          `${process.env.EXPO_PUBLIC_API_URL}/api/journal?id=${userId}`
        );
        const data = await res.json();
        setJournals(data.data);
      };
      fetchJournals();
    }, [])
  );

  const getJournalIcon = (type?: string) => {
    const key = type?.toLowerCase() || "";
    switch (key) {
      case "Baby Bump":
        return <Ionicons name="happy" size={20} color="#fff" />;
      case "dear baby":
        return <Ionicons name="heart-outline" size={20} color="#fff" />;
      case "my body my feelings":
        return <Ionicons name="happy" size={20} color="#fff" />;
      case "first movements":
        return <Ionicons name="hand-left" size={20} color="#fff" />;
      default:
        return <Ionicons name="book-outline" size={20} color="#fff" />;
    }
  };

  const getJournalBgColor = (type?: string) => {
    const key = type?.toLowerCase() || "";
    switch (key) {
      case "baby bump":
        return "#8C63C7";
      case "dear baby":
        return "#EC4899";
      case "my body my feelings":
        return "#F97316";
      case "first movements":
        return "#22C55E";
      default:
        return "#F3E8FF";
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.background }}
      edges={["left", "right", "bottom"]} // ⬅️ Exclude "top"
    >
      <MainHeader title="My Journal" subtitle="Track your journals." />
    <ScrollView contentContainerStyle={styles.container}>
          {/* Get Started Card */}
          <View style={styles.getStartedCard}>
            <LinearGradient
              colors={["#E6D6F2", "#FAD9E6"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.getStartedGradient}
            />
            <Ionicons
              name="book"
              size={32}
              color="#8C63C7"
              style={styles.getStartedIcon}
            />
            <Text style={styles.getStartedTitle}>
              Start Your Pregnancy Journey
            </Text>
            <Text style={styles.getStartedSubtitle}>
              Capture precious moments and{"\n"} memories
            </Text>
            <TouchableOpacity
              style={styles.getStartedButton}
              onPress={() =>
                navigation.navigate("journalEntery", { allowCustomTitle: true })
              }
            >
              <Text style={styles.getStartedButtonText}>Get Started</Text>
            </TouchableOpacity>
          </View>

          {/* Active Journals */}
          {journals.map((journal) => (
            <TouchableOpacity
              key={journal._id}
              style={styles.activeCard}
              onPress={() => {
                navigation.navigate("journalEntery", {
                  journalId: journal._id,
                  title: journal.title,
                  description: journal.designTemplate,
                  meta: journal.designTemplate,
                  isEdit: true,
                });
              }}
            >
              <View
                style={[
                  styles.activeIconWrapper,
                  { backgroundColor: getJournalBgColor(journal.title) },
                ]}
              >
                {getJournalIcon(journal.title)}
              </View>
              <View style={styles.activeTextGroup}>
                <Text style={styles.activeTitle}>{journal.title}</Text>
                <Text style={styles.activeMeta}>
                  Week 24 • Last updated 2 days ago
                </Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={20}
                color="#6B7280"
                style={styles.chevron}
              />
            </TouchableOpacity>
          ))}

          {/* Pre-Designed Journals */}
          <Text style={styles.sectionTitle}>Pre-Designed Journals</Text>
          {journalData.map((item, index) => (
              <View key={index} style={styles.journalCard}>
                {/* Icon on the left */}
                <View
                  style={[
                    styles.journalIconContainer,
                    { backgroundColor: item.bgColor },
                  ]}
                >
                  {item.icon()}
                </View>

                {/* Text and button on the right */}
                <View style={styles.journalTextGroup}>
                  <View style={styles.journalHeader}>
                    <View>
                      <Text style={styles.journalTitle}>{item.title}</Text>
                      <Text style={styles.journalMeta}>{item.subtitle}</Text>
                    </View>

                    <CommonButton
                      label="Start"
                      size="small"
                      style={styles.startButton}
                      labelStyle={styles.startLabel}
                      onPress={() => {
                        navigation.navigate("journalEntery", {
                          title: item.title,
                          description: item.subtitle,
                          meta: item.meta,
                        });
                      }}
                    />
                  </View>

                  <Text style={styles.journalDescription}>{item.description}</Text>
                </View>
              </View>
              ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    padding: SPACING.spacing20,
    paddingBottom: 82,
    backgroundColor: COLORS.background,
  },
  notificationIcon: {
    position: "absolute",
    top: SPACING.spacing16,
    right: SPACING.spacing16,
    padding: SPACING.spacing8,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    ...EFFECTS.softShadow,
  },
  notificationDot: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.error,
  },
  getStartedCard: {
    borderRadius: RADIUS.lg,
    padding: SPACING.spacing20,
    marginBottom: SPACING.spacing32,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    overflow: "hidden",
  },
  getStartedGradient: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: RADIUS.lg,
  },
  getStartedIcon: {
    marginBottom: SPACING.spacing12,
  },
  getStartedTitle: {
    ...TEXT_STYLES.displayH1,
    fontSize: 22,
    fontWeight: "600",
    color: COLORS.purple700,
    textAlign: "center",
    marginBottom: SPACING.spacing8,
  },
  getStartedSubtitle: {
    ...TEXT_STYLES.bodySmall,
    fontSize: 15,
    color: COLORS.gray900,
    textAlign: "center",
    marginBottom: SPACING.spacing16,
  },
  getStartedButton: {
    backgroundColor: COLORS.white,
    borderRadius: 999,
    paddingVertical: SPACING.spacing12,
    paddingHorizontal: SPACING.spacing20 + 8,
  },
  getStartedButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.purple700,
  },
  sectionTitle: {
    ...TEXT_STYLES.headingH2,
    fontSize: 16,
    fontWeight: "700",
    textAlign: "left",
    marginTop: SPACING.spacing24,
    marginBottom: SPACING.spacing12,
    color: COLORS.gray900,
  },
  journalCard: {
    flexDirection: "row",
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.xl,
    padding: SPACING.spacing16,
    marginBottom: SPACING.spacing16,
    alignItems: "flex-start",
    ...EFFECTS.shadow,
  },
  journalTextGroup: {
    flex: 1,
    flexDirection: "column",
  },
  journalIconContainer: {
    width: 42,
    height: 42,
    borderRadius: RADIUS.md,
    alignItems: "center",
    justifyContent: "center",
    marginRight: SPACING.spacing12 + 2,
  },
  journalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  journalTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: COLORS.gray900,
  },
  journalMeta: {
    fontSize: 14,
    color: COLORS.gray700,
    marginTop: SPACING.spacing4,
  },
  journalDescription: {
    fontSize: 13,
    color: COLORS.gray700,
    marginTop: SPACING.spacing12,
    lineHeight: 18,
  },
  startButton: {
    paddingVertical: 0,
    paddingHorizontal: 0,
    borderRadius: RADIUS.md,
    width: 70,
    backgroundColor: COLORS.purple500,
  },
  startLabel: {
    fontSize: 14,
    color: COLORS.white,
    fontWeight: "600",
  },
  activeCard: {
    flexDirection: "row",
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.xl,
    padding: SPACING.spacing16,
    alignItems: "center",
    marginBottom: SPACING.spacing12,
  },
  activeIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.purple100,
    alignItems: "center",
    justifyContent: "center",
    marginRight: SPACING.spacing16,
  },
  activeTextGroup: {
    flex: 1,
  },
  activeTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.gray900,
  },
  activeMeta: {
    fontSize: 14,
    color: COLORS.gray700,
    marginTop: SPACING.spacing4,
  },
  chevron: {
    marginLeft: SPACING.spacing12,
  },
});
