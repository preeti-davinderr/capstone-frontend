import React from "react";
import {
  TextInput,
  StyleSheet,
  TextInputProps,
  View,
  Text,
} from "react-native";
import { COLORS, SPACING, TEXT_STYLES } from "../styles/globalStyles";

type CommonInputProps = TextInputProps & {
  label?: string;
  errorText?: string;
};

const CommonInput: React.FC<CommonInputProps> = ({
  label,
  errorText,
  style,
  ...props
}) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.input, style, !!errorText && styles.inputError]}
        placeholderTextColor={COLORS.gray500}
        {...props}
      />
      {errorText && <Text style={styles.errorText}>{errorText}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  label: {
    ...TEXT_STYLES.bodyBase,
    fontWeight: "500",
    marginBottom: SPACING.spacing8,
    color: COLORS.gray900,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.gray300,
    borderRadius: 12,
    paddingVertical: SPACING.spacing12,
    paddingHorizontal: SPACING.spacing16,
    backgroundColor: COLORS.white,
    fontFamily: TEXT_STYLES.bodyBase.fontFamily,
    fontSize: 16,
    color: COLORS.gray900,
  },
  inputError: {
    borderColor: COLORS.error,
  },
  errorText: {
    // color: COLORS.error,
    marginTop: SPACING.spacing4,
    ...TEXT_STYLES.bodySmall,
  },
});

export default CommonInput;
