import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";

interface Props {
  label: string;
  onPress?: () => void;
  variant?: "primary" | "border" | "disabled";
  size?: "large" | "small";
  style?: ViewStyle;
  labelStyle?: TextStyle;
}

const CommonButton: React.FC<Props> = ({
  label,
  onPress,
  variant = "primary",
  size = "large",
  style,
  labelStyle,
}) => {
  const isDisabled = variant === "disabled";

  const buttonStyles = [
    styles.base,
    size === "large" ? styles.large : styles.small,
    variant === "primary" && styles.primary,
    variant === "border" && styles.border,
    isDisabled && styles.disabled,
    style,
  ];

  const textStyles = [
    styles.label,
    variant === "border" && styles.borderText,
    isDisabled && styles.disabledText,
    labelStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={isDisabled}
    >
      <Text style={textStyles}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: 8, // radius-md
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  large: {
    height: 48,
    paddingHorizontal: 16,
  },
  small: {
    height: 40,
    paddingHorizontal: 16,
  },
  primary: {
    backgroundColor: "#8C63C7", // Purple 700
  },
  border: {
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#E8DBF5", // light purple border
  },
  disabled: {
    backgroundColor: "#E5E7EB", // gray-200 equivalent
  },
  label: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  borderText: {
    color: "#8C63C7", // Purple 700 for border variant
  },
  disabledText: {
    color: "#9CA3AF", // gray-400 equivalent
  },
});

export default CommonButton;
