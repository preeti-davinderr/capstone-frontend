import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { COLORS, SPACING, RADIUS, TEXT_STYLES } from "../styles/globalStyles";

interface WeekDevelopmentImageCardProps {
  image?: any;
  title: string;
  size?: string;
  weight?: string;
}

const WeekDevelopmentImageCard: React.FC<WeekDevelopmentImageCardProps> = ({ image, title, size, weight }) => (
  <View style={styles.card}>
    <View style={styles.imageContainer}>
      {image && <Image source={image} style={styles.image} />}
    </View>
    <View style={styles.sizeWeightRow}>
      {size && <Text style={styles.sizeText}>Size: {size}</Text>}
      {weight && <Text style={styles.sizeText}>Weight: {weight}</Text>}
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.background,
    borderRadius: RADIUS.lg,
    padding: SPACING.spacing20,
    alignItems: 'center',
    marginBottom: SPACING.spacing20,
    borderWidth: 1,
    borderColor: COLORS.gray300,
    shadowColor: COLORS.gray900,
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 2,
    width: '100%',
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.spacing12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    resizeMode: 'cover',
  },
  sizeWeightRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SPACING.spacing24,
    marginBottom: SPACING.spacing12,
  },
  sizeText: {
    ...TEXT_STYLES.bodySmall,
    color: COLORS.gray700,
    marginHorizontal: SPACING.spacing8,
  },
});

export default WeekDevelopmentImageCard;
