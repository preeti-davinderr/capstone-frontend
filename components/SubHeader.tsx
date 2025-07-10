import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SPACING, TEXT_STYLES } from "../styles/globalStyles";

type SubHeaderProps = {
  title: string; // keep as string
};

const SubHeader: React.FC<SubHeaderProps> = ({ title }) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color={COLORS?.gray900 || "black"}
          />
        </TouchableOpacity>
        <Text style={styles.title}>
          {typeof title === "string" ? title : "Untitled"}
        </Text>
        <View style={{ width: 24 }} />
      </View>
    </SafeAreaView>
  );
};

export default SubHeader;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: COLORS.white,
  },
  container: {
    height: 88,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.spacing16,
    backgroundColor: COLORS.white,
  },
  backBtn: {
    padding: 4,
  },
  title: {
    ...TEXT_STYLES.subheading,
    color: COLORS.gray900,
    textAlign: "center",
    flex: 1,
  },
});
