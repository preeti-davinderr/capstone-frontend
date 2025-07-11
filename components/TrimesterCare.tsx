import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SPACING, RADIUS, TEXT_STYLES } from "../styles/globalStyles";

interface TrimesterCareProps {
  title: string;
}

const CARD_DATA: { icon: any; iconColor: string; bgColor: string; title: string; subtitle: string }[] = [
  {
    icon: "pill",
    iconColor: COLORS.purple500,
    bgColor: COLORS.blush100,
    title: "Prenatal Vitamins",
    subtitle: "Importance of folic acid and iron",
  },
  {
    icon: "brain",
    iconColor: COLORS.purple500,
    bgColor: COLORS.purple100,
    title: "Early Symptoms",
    subtitle: "Fatigue, nausea, emotional changes",
  },
  {
    icon: "food-apple",
    iconColor: COLORS.peach400,
    bgColor: COLORS.white,
    title: "Healthy Eating",
    subtitle: "Key nutrients and safe foods",
  },
  {
    icon: "heart",
    iconColor: COLORS.peach400,
    bgColor: COLORS.peach400,
    title: "Lifestyle Tips",
    subtitle: "Rest, stress management, and safe activities",
  },
];

const TrimesterCare: React.FC<TrimesterCareProps> = ({ title }) => (
  <View style={{ marginVertical: SPACING.spacing16 }}>
    <Text style={[styles.header, TEXT_STYLES.headingH2]}>{title}</Text>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {CARD_DATA.map((card, idx) => (
        <View key={idx} style={[styles.card, { backgroundColor: card.bgColor }]}> 
          <View style={styles.iconCircle}>
            <MaterialCommunityIcons name={card.icon} size={28} color={card.iconColor} />
          </View>
          <Text style={[styles.title, TEXT_STYLES.bodyBase]}>{card.title}</Text>
          <Text style={[styles.subtitle, TEXT_STYLES.bodySmall]}>{card.subtitle}</Text>
        </View>
      ))}
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  header: {
    marginBottom: SPACING.spacing12,
    marginLeft: SPACING.spacing8,
  },
  card: {
    width: 170,
    borderRadius: RADIUS.lg,
    padding: SPACING.spacing16,
    marginRight: SPACING.spacing16,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.spacing12,
  },
  title: {
    fontWeight: "600",
    color: COLORS.gray900,
    marginBottom: SPACING.spacing4,
  },
  subtitle: {
    color: COLORS.gray700,
  },
});

export default TrimesterCare; 