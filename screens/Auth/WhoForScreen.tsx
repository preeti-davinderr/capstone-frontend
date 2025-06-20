import React from "react";
import { View, StyleSheet, Text } from "react-native";
import CommonButton from "../../components/CommonButton";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

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
        <CommonButton
          label="Yes, for myself"
          onPress={() => handleSelect("self")}
        />

        <CommonButton
          label="No, I have a family code"
          onPress={() => handleSelect("other")}
          style={styles.outlinedButton}
          buttonLabel={styles.outlinedLabel}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 48,
    paddingHorizontal: 24,
    justifyContent: "center",
  },
  centeredContent: {
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 14,
    color: "#444",
    textAlign: "center",
    paddingHorizontal: 8,
  },
  outlinedButton: {
    backgroundColor: "#fff",
    borderColor: "#000",
    borderWidth: 1,
  },
  outlinedLabel: {
    color: "#000",
  },
});
