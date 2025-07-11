import React, { useState } from 'react';
import {
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
  Image,
  Dimensions,
} from 'react-native';
import { COLORS, SPACING, RADIUS } from '../styles/globalStyles';

interface WeekInfo {
  week: number;
  title: string;
  size: string;
  weight: string;
  visualText: string;
  footer: string;
  image: any;
}

interface WeekScrollProps {
  weekData: WeekInfo[];
  style?: StyleProp<ViewStyle>;
  onWeekChange?: (week: number) => void;
}

const screenWidth = Dimensions.get('window').width;
const weekButtonWidth = screenWidth / 4.5;

const HorizontalScroll: React.FC<WeekScrollProps> = ({ weekData, style, onWeekChange }) => {
  const [selectedWeek, setSelectedWeek] = useState<number>(weekData[0].week);
  const currentWeek = weekData.find(w => w.week === selectedWeek)!;

  return (
    <View style={[styles.container, style]}>
      {/* Horizontal Week Selector */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.weekScroll}>
        {weekData.map(item => (
          <TouchableOpacity
            key={item.week}
            onPress={() => {
              setSelectedWeek(item.week);
              onWeekChange?.(item.week);
            }}
            style={[
              styles.weekButton,
              { width: weekButtonWidth },
              selectedWeek === item.week && styles.activeWeekButton,
            ]}
          >
            <Text
              style={[
                styles.weekButtonText,
                selectedWeek === item.week && styles.activeWeekButtonText,
              ]}
            >
              {`Week ${item.week}`}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Week Content Card (commented out) */}
      {/*
      <View style={styles.card}>
        <Text style={styles.title}>{currentWeek.title}</Text>
        <View style={styles.cardContent}>
          <View>
            <Text style={styles.sizeText}>Size: {currentWeek.size}</Text>
            <Text style={styles.sizeText}>Weight: {currentWeek.weight}</Text>
          </View>
          <Image source={currentWeek.image} style={styles.image} />
        </View>
        <Text style={styles.footer}>{currentWeek.footer}</Text>
      </View>
      */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.spacing4,
    marginBottom: SPACING.spacing20,
  },
  weekScroll: {
    flexDirection: 'row',
    marginBottom: SPACING.spacing12,
    paddingHorizontal: SPACING.spacing4,
  },
  weekButton: {
    paddingVertical: SPACING.spacing8,
    paddingHorizontal: SPACING.spacing8,
    borderRadius: 999,
    backgroundColor: COLORS.gray100,
    marginRight: SPACING.spacing8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeWeekButton: {
    backgroundColor: COLORS.purple500,
  },
  weekButtonText: {
    color: COLORS.gray700,
    fontWeight: '500',
    fontSize: 15,
  },
  activeWeekButtonText: {
    color: COLORS.white,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    padding: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    alignItems: 'center',
    marginBottom: SPACING.spacing16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.purple700,
    marginBottom: 16,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  sizeText: {
    fontSize: 16,
    marginBottom: 4,
    color: COLORS.gray700,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.pink500,
    opacity: 0.15,
  },
  footer: {
    textAlign: 'center',
    marginTop: 16,
    color: '#777',
    fontSize: 13,
  },
});

export default HorizontalScroll;
