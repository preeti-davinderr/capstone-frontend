import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS, SPACING, RADIUS } from "../styles/globalStyles";

interface Highlight {
  icon: string;
  title: string;
  subtitle: string;
}

interface HighlightsGridProps {
  highlights: Highlight[];
}

const HighlightsGrid: React.FC<HighlightsGridProps> = ({ highlights }) => (
  <View style={styles.highlightsGrid}>
    {highlights.map((item, index) => (
      <View key={index} style={styles.highlightCard}>
        <Text style={styles.icon}>{item.icon}</Text>
        <Text style={styles.highlightTitle}>{item.title}</Text>
        <Text style={styles.highlightSubtitle}>{item.subtitle}</Text>
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  highlightsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.spacing8,
    marginBottom: SPACING.spacing16,
  },
  highlightCard: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.md,
    padding: SPACING.spacing12,
    marginBottom: SPACING.spacing8,
    minWidth: 120,
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    fontSize: 32,
    marginBottom: SPACING.spacing4,
  },
  highlightTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.purple700,
    marginBottom: SPACING.spacing4,
  },
  highlightSubtitle: {
    fontSize: 13,
    color: COLORS.gray700,
    textAlign: 'center',
  },
});

export default HighlightsGrid;
