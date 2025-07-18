import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import CommonButton from "../../components/CommonButton";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { COLORS, TEXT_STYLES, SPACING } from "../../styles/globalStyles";

type Props = NativeStackScreenProps<RootStackParamList, "WhoFor">;

export default function WhoForScreen({ navigation }: Props) {
  const handleSelect = (choice: string) => {
    navigation.navigate("SignUp", { userType: choice });
  };

  return (
    <View style={styles.container}>
      <View style={styles.centeredContent}>
        <Text style={styles.title}>Are you using MoMents for yourself?</Text>
        <Text style={styles.subtitle}>
          This helps set up the right features for you.
        </Text>

        <View style={styles.buttons}>
          <CommonButton
            label="Yes, for myself"
            onPress={() => handleSelect("self")}
          />
          <CommonButton
            label="No, I have a family code"
            onPress={() => handleSelect("other")}
            variant="border"
            style={{ backgroundColor: "#E8DBF5" }}
          />
        </View>
      </View>
      <Text style={styles.signInLink}>
        Already have an account?{" "}
        <Text
          onPress={() => navigation.replace("SignIn")}
          style={styles.linkText}
        >
          Sign In
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingVertical: SPACING.spacing48,
    paddingHorizontal: SPACING.spacing48,
    justifyContent: "center",
  },
  centeredContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    ...TEXT_STYLES.displayH1,
    textAlign: "center",
    marginBottom: SPACING.spacing12,
  },
  subtitle: {
    ...TEXT_STYLES.headingH2,
    textAlign: "center",
    color: COLORS.gray700,
    marginBottom: SPACING.spacing48,
    paddingHorizontal: SPACING.spacing4,
  },
  buttons: {
    gap: SPACING.spacing16,
    width: "100%",
  },
  signInLink: {
    ...TEXT_STYLES.bodyBase,
    marginTop: SPACING.spacing32,
    textAlign: "center",
  },
  linkText: {
    color: COLORS.purple500,
    fontWeight: "700",
  },
});
