import React from "react";
import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface GradientCardProps {
  children: React.ReactNode;
}

const GradientCard = ({ children }: GradientCardProps) => (
  <LinearGradient
    colors={["#fbefff", "#e3f0ff"]}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={styles.card}
  >
    {children}
  </LinearGradient>
);

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
});

export default GradientCard; 