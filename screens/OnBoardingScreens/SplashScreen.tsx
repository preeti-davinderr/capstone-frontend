import React, { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = NativeStackScreenProps<RootStackParamList, "Splash">;

const SplashScreen = ({ navigation }: Props) => {
  useEffect(() => {
    const checkStatus = async () => {
      const hasOnboarded = await AsyncStorage.getItem("hasOnboarded");
      setTimeout(() => {
        navigation.replace(hasOnboarded === "true" ? "MainApp" : "Onboarding");
      }, 2000);
    };
    checkStatus();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>MoMents</Text>
      <ActivityIndicator size="large" color="#6200ee" />
    </View>
  );
};

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
  },
});

export default SplashScreen;
