import React from "react";
import { View, Text, StyleSheet, Image, ImageBackground } from "react-native";
import { COLORS, SPACING, RADIUS, TEXT_STYLES } from "../styles/globalStyles";

interface WeekDevelopmentImageCardProps {
  image?: any;
  title: string;
  size?: string;
  weight?: string;
}

const WeekDevelopmentImageCard: React.FC<WeekDevelopmentImageCardProps> = ({ image, title, size, weight }) => (
  <View style={styles.container}>
    <ImageBackground 
      source={require('../assets/development/background.png')} 
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          {image && <Image source={image} style={styles.image} />}
        </View>
        <View style={styles.sizeWeightRow}>
          {(size || weight) && (
            <View style={styles.pill}>
              <Text style={styles.sizeText}>
                {size && `Size: ${size}`}
                {size && weight && '        '}
                {weight && `Weight: ${weight}`}
              </Text>
            </View>
          )}
        </View>
      </View>
    </ImageBackground>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: SPACING.spacing20,
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    shadowColor: COLORS.gray900,
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 2,
  },
  backgroundImage: {
    width: '100%',
    height: 280,
  },
  content: {
    flex: 1,
    padding: SPACING.spacing20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: 180,
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.spacing20,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  sizeWeightRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SPACING.spacing24,
    marginBottom: SPACING.spacing8,
  },
  pill: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.xl,
    paddingHorizontal: SPACING.spacing16,
    paddingVertical: SPACING.spacing8,
    shadowColor: COLORS.gray900,
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    opacity: 0.9,
  },
  sizeText: {
    ...TEXT_STYLES.bodySmall,
    color: COLORS.gray700,
  },
});

export default WeekDevelopmentImageCard;
