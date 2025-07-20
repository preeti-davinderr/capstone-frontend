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

const WeekDevelopmentCard: React.FC<WeekDevelopmentCardProps> = ({
  image,
  size,
  weight,
  developments,
}) => (
  <WeekDevelopmentImageCard image={image} title="What's Developing This Week" size={size} weight={weight} />
);

export default WeekDevelopmentCard;
