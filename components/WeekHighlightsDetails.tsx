import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS, SPACING, RADIUS } from "../styles/globalStyles";

interface HighlightDetail {
  icon: string; // emoji or icon string
  title: string;
  description: string;
}

interface WeekHighlightsDetailsProps {
  highlights: HighlightDetail[];
}

const WeekHighlightsDetails: React.FC<WeekHighlightsDetailsProps> = ({ highlights }) => (
  <View style={styles.timeline}>
    {highlights.map((item, idx) => (
      <View key={idx} style={styles.row}>
        <View style={styles.iconColumn}>
          <View style={styles.iconWrapper}>
            <Text style={styles.icon}>{item.icon}</Text>
          </View>
          {idx < highlights.length - 1 && <View style={styles.verticalLine} />}
        </View>
        <View style={styles.card}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  timeline: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: SPACING.spacing20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.spacing16,
    minHeight: 72,
  },
  iconColumn: {
    alignItems: 'center',
    width: 28,
    marginRight: SPACING.spacing8,
    height: '100%',
    justifyContent: 'flex-start',
  },
  iconWrapper: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F5F3FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 0,
    marginTop: 0,
  },
  icon: {
    fontSize: 18,
    color: COLORS.purple700,
  },
  verticalLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#E5E7EB',
    marginTop: 0,
    marginBottom: 0,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: RADIUS.md,
    paddingVertical: SPACING.spacing12,
    paddingHorizontal: SPACING.spacing16,
    flex: 1,
    shadowColor: COLORS.gray900,
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
    marginBottom: 0,
    minHeight: 64,
    justifyContent: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.purple700,
    marginBottom: SPACING.spacing4,
  },
  description: {
    fontSize: 14,
    color: COLORS.gray700,
  },
});

export default WeekHighlightsDetails;
