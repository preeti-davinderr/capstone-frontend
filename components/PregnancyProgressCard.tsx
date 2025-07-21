import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS, SPACING, RADIUS, TEXT_STYLES } from "../styles/globalStyles";

import { StyleProp, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface PregnancyProgressCardProps {
  week: number;
  dueDate: string;
  daysLeft: number;
  trimester: string;
  style?: StyleProp<ViewStyle>;
}

const PregnancyProgressCard: React.FC<PregnancyProgressCardProps> = ({
  week,
  dueDate,
  daysLeft,
  trimester,
  style,
}) => {
  // Calculate progress percentage (assuming 40 weeks total)
  const progress = Math.min(week / 40, 1);

  return (
    <LinearGradient
      colors={["#E8D8F5", "#FFE7EF"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.gradientCard, style]}
    >
      <View style={styles.cardContent}>
        <View style={styles.leftSection}>
          <Text style={[styles.title, TEXT_STYLES.bodyBase, { color: COLORS.purple700, fontWeight: "600" }]}>
            Your Pregnancy
          </Text>
          <Text style={[styles.week, TEXT_STYLES.displayH1, { fontWeight: "bold" }]}>Week {week}</Text>
          <Text style={[styles.trimester, TEXT_STYLES.bodySmall, { color: COLORS.gray700, fontWeight: "500" }]}>
            {trimester}
          </Text>
        </View>
        <View style={styles.rightSection}>
          <View style={styles.dueDateBox}>
            <Text style={[styles.dueDateLabel, TEXT_STYLES.caption]}>{"Due Date"}</Text>
            <Text style={[styles.dueDate, TEXT_STYLES.lead, { color: COLORS.purple700, fontWeight: "bold" }]}>{dueDate}</Text>
            <Text style={[styles.daysLeft, TEXT_STYLES.caption, { color: COLORS.gray500 }]}>{daysLeft} days left</Text>
          </View>
        </View>
      </View>
      <View style={styles.progressBarBackground}>
        <View style={[styles.progressBarFill, { width: `${progress * 100}%` }]} />
      </View>
      <View style={styles.progressBarSpacer} />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientCard: {
    borderRadius: RADIUS.lg,
    paddingTop: SPACING.spacing16,
    paddingHorizontal: SPACING.spacing20,
    paddingBottom: SPACING.spacing24,
    marginHorizontal: SPACING.spacing4,
    marginBottom: SPACING.spacing24,
    shadowColor: COLORS.gray900,
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 2,
    position: "relative",
    overflow: "hidden",
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: SPACING.spacing4,
  },
  leftSection: {
    flex: 2,
  },
  rightSection: {
    flex: 1,
    alignItems: "flex-end",
  },
  title: {},
  week: {},
  trimester: {},
  dueDateBox: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    paddingVertical: SPACING.spacing8,
    paddingHorizontal: SPACING.spacing12,
    alignItems: "center",
    minWidth: 90,
  },
  dueDateLabel: {},
  dueDate: {},
  daysLeft: {},
  progressBarBackground: {
    position: "absolute",
    left: SPACING.spacing16,
    right: SPACING.spacing16,
    bottom: SPACING.spacing12,
    height: 14,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.purple100,
    overflow: "hidden",
  },
  progressBarFill: {
    height: 14,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.purple500,
  },
  progressBarSpacer: {
    height: SPACING.spacing20,
  },
});

export default PregnancyProgressCard;
