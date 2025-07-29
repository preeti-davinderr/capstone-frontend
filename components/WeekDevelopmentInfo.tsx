import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, GRADIENTS, RADIUS, SPACING } from "../styles/globalStyles";

interface WeekDevelopmentInfoProps {
  footer: string; // e.g., "Growing Sweet: 35 Weeks to Go"
  description: string;
}

const WeekDevelopmentInfo: React.FC<WeekDevelopmentInfoProps> = ({ footer, description }) => (
  <LinearGradient
  colors={GRADIENTS.onboardingBackground}
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 0 }}
  style={styles.card}
  >
    <Text style={styles.title}>{footer}</Text>
    <View style={styles.infoBox}>
      <Text style={styles.description}>{description}</Text>
    </View>
  </LinearGradient>
);

const styles = StyleSheet.create({
  card: {
    borderRadius: RADIUS.lg,
    paddingVertical: 28,
    marginBottom: 24,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: SPACING.spacing24,
  },
  title: {
    fontSize: 17,
    fontWeight: "500",
    color: "#555",
    marginBottom: 18,
    textAlign: "center",
  },
  infoBox: {
    backgroundColor: "#f3e6f7",
    borderRadius: RADIUS.xl,
    paddingVertical: 20,
    paddingHorizontal: 18,
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 1,
  },
  description: {
    fontSize: 17,
    color: "#555",
    textAlign: "center",
    lineHeight: 24,
  },
});

export default WeekDevelopmentInfo; 