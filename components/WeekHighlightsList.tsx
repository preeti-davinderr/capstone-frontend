import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS, SPACING, RADIUS, EFFECTS } from "../styles/globalStyles";

interface HighlightItem {
  icon: string;
  title: string;
  subtitle: string;
  iconColor?: string;
  bgColor?: string;
}

interface WeekHighlightsListProps {
  highlights: HighlightItem[];
}

const WeekHighlightsList: React.FC<WeekHighlightsListProps> = ({
  highlights,
}) => {
  const iconColors = [
    COLORS.purple500,
    COLORS.peach400,
    COLORS.blush100,
    COLORS.purple100,
    COLORS.white,
  ];

  return (
    <View style={styles.listContainer}>
      {highlights.map((item, idx) => {
        const colorIndex = idx % iconColors.length;
        const iconColor = iconColors[colorIndex];

        let iconTextColor = COLORS.white;
        if (
          iconColor === COLORS.blush100 ||
          iconColor === COLORS.purple100 ||
          iconColor === COLORS.white
        ) {
          iconTextColor = COLORS.purple700;
        }

        return (
          <View key={idx} style={styles.timelineRow}>
            <View style={styles.timelineColumn}>
              {idx !== 0 && <View style={styles.timelineLine} />}

              <View
                style={[styles.iconWrapper, { backgroundColor: iconColor }]}
              >
                <MaterialCommunityIcons
                  name={item.icon as any}
                  size={20}
                  color={iconTextColor}
                />
              </View>

              {idx !== highlights.length - 1 && (
                <View style={styles.timelineLine} />
              )}
            </View>
            <View style={styles.card}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle}>{item.subtitle}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    width: "100%",
    marginBottom: SPACING.spacing20,
  },
  timelineRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: SPACING.spacing12,
  },
  timelineColumn: {
    width: 36,
    alignItems: "center",
    position: "relative",
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: COLORS.purple100,
    height: 8,
  },
  iconWrapper: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.purple100,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    marginVertical: 2,
  },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: RADIUS.lg,
    padding: 14,
    marginLeft: 4,
    borderWidth: 1,
    borderColor: "#f2f2f2",
    ...EFFECTS.shadowLarge,
  },
  title: {
    fontSize: 15.5,
    fontWeight: "700",
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
