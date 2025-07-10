import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet } from "react-native";
import { COLORS, SPACING, TEXT_STYLES, EFFECTS } from "../styles/globalStyles";

type MainHeaderProps = {
  title: string;
  subtitle?: string;
};

const MainHeader: React.FC<MainHeaderProps> = ({ title, subtitle }) => {
  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
    </SafeAreaView>
  );
};

export default MainHeader;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: COLORS.white,
  },
  container: {
    height: 88,
    justifyContent: "center",
    paddingHorizontal: SPACING.spacing20,
    backgroundColor: COLORS.white,
    // ...EFFECTS.softShadow,
  },
  title: {
    ...TEXT_STYLES.displayH1,
    color: COLORS.purple700,
    textAlign: "left",
  },
  subtitle: {
    ...TEXT_STYLES.bodyBase,
    color: COLORS.gray700,
    marginTop: SPACING.spacing4,
    textAlign: "left",
  },
});
