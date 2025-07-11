import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS, SPACING, RADIUS } from "../styles/globalStyles";

interface HighlightItem {
  icon: string;
  title: string;
  subtitle: string;
}

interface WeekHighlightsListProps {
  highlights: HighlightItem[];
}

const WeekHighlightsList: React.FC<WeekHighlightsListProps> = ({ highlights }) => (
  <View style={styles.listContainer}>
    {highlights.map((item, idx) => (
      <View key={idx} style={styles.timelineRow}>
        {/* Timeline line */}
        <View style={styles.timelineColumn}>
          {/* Top line (not for first) */}
          {idx !== 0 && <View style={styles.timelineLine} />}
          {/* Icon */}
          <View style={styles.iconWrapper}>
            <Text style={styles.icon}>{item.icon}</Text>
          </View>
          {/* Bottom line (not for last) */}
          {idx !== highlights.length - 1 && <View style={styles.timelineLine} />}
        </View>
        {/* Card */}
        <View style={styles.card}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>{item.subtitle}</Text>
        </View>
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  listContainer: {
    width: '100%',
    marginBottom: SPACING.spacing20,
  },
  timelineRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SPACING.spacing12,
  },
  timelineColumn: {
    width: 36,
    alignItems: 'center',
    position: 'relative',
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: COLORS.purple100,
    minHeight: 12,
  },
  iconWrapper: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.purple100,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    marginVertical: 2,
  },
  icon: {
    fontSize: 16,
    color: COLORS.purple700,
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    marginLeft: 4,
    shadowColor: COLORS.gray900,
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#f2f2f2',
  },
  title: {
    fontSize: 15.5,
    fontWeight: '700',
    color: COLORS.purple700,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 13.5,
    color: COLORS.gray700,
    marginBottom: 0,
  },
});

export default WeekHighlightsList;
