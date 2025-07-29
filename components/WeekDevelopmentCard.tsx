import React from "react";
import WeekDevelopmentImageCard from "./WeekDevelopmentImageCard";

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
  <WeekDevelopmentImageCard
    image={image}
    title="What's Developing This Week"
    size={size}
    weight={weight}
  />
);

export default WeekDevelopmentCard;
