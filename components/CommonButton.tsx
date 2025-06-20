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
  onPress: () => void;
  style?: ViewStyle;
  buttonLabel?: TextStyle;
}

const CommonButton: React.FC<Props> = ({
  label,
  onPress,
  style,
  buttonLabel,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.label, buttonLabel]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#000",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
  },
  label: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default CommonButton;
