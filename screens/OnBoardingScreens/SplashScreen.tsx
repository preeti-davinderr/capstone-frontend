import React, { useEffect } from "react";
import { View, ActivityIndicator, StyleSheet, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App.js";

type Props = NativeStackScreenProps<RootStackParamList, "Splash">;

export default function SplashScreen({ navigation }: Props) {
  useEffect(() => {
    const checkStatus = async () => {
      try {
        navigation.replace("MainApp");
        const onboarded = await AsyncStorage.getItem("hasOnboarded");
        const token = await AsyncStorage.getItem("token");
        console.log("onboarded:", onboarded, "| token:", token);

        if (onboarded !== "true") {
          navigation.replace("Onboarding");
        } else if (!token) {
          navigation.replace("SignIn");
        } else {
          navigation.replace("MainApp");
        }
      } catch (error) {
        console.error("SplashScreen error:", error);
        navigation.replace("SignIn"); // fallback
      }
    };

    setTimeout(checkStatus, 1000);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>MoMents</Text>
      <ActivityIndicator size="large" color="#6200ee" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#6200ee",
  },
});
