import React from "react";
import { View, StyleSheet } from "react-native";
import WeekDevelopmentImageCard from "./WeekDevelopmentImageCard";
import { COLORS, SPACING, RADIUS } from "../styles/globalStyles";

interface WeekDevelopmentCardProps {
  image?: any;
  size?: string;
  weight?: string;
  developments: string[];
}

// --- Old development card structure (commented out for reference) ---
// /*
// const WeekDevelopmentCard: React.FC<WeekDevelopmentCardProps> = ({
//   image,
//   size,
//   weight,
//   developments,
//   footer,
// }) => (
//   <View style={styles.card}>
//     <Text style={styles.sectionTitle}>What's Developing This Week</Text>
//     {image && <Image source={image} style={styles.image} />}
//     <View style={styles.sizeWeightRow}>
//       {size && <Text style={styles.sizeText}>Size: {size}</Text>}
//       {weight && <Text style={styles.sizeText}>Weight: {weight}</Text>}
//     </View>
//     <View style={styles.developmentList}>
//       {developments.map((item, index) => (
//         <Text key={index} style={styles.bullet}>
//           • {item}
//         </Text>
//       ))}
//     </View>
//     {footer && <Text style={styles.footer}>{footer}</Text>}
//   </View>
// );
// */
// --- New modular card structure ---
const WeekDevelopmentCard: React.FC<WeekDevelopmentCardProps> = ({
  image,
  size,
  weight,
  developments,
}) => (
  <View style={styles.card}>
    <WeekDevelopmentImageCard image={image} title="What's Developing This Week" size={size} weight={weight} />
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    marginBottom: SPACING.spacing20,
    alignItems: 'center',
  },
});

export default WeekDevelopmentCard;
