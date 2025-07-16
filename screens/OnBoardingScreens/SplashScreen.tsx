import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import { RootStackParamList } from "../../App";
import {
  COLORS,
  TEXT_STYLES,
  SPACING,
  GRADIENTS,
} from "../../styles/globalStyles";
import Logo from "../../assets/AppIcon.png";

type Props = NativeStackScreenProps<RootStackParamList, "Splash">;

export default function SplashScreen({ navigation }: Props) {
  useEffect(() => {
    const checkStatus = async () => {
      try {
        const onboarded = await AsyncStorage.getItem("hasOnboarded");
        const token = await AsyncStorage.getItem("token");
        const userString = await AsyncStorage.getItem("user");
        const user = userString ? JSON.parse(userString) : null;

        console.log(
          "onboarded:",
          onboarded,
          "| token:",
          token,
          "| user:",
          user
        );
        // navigation.replace("Onboarding");
        if (onboarded !== "true") {
          navigation.replace("Onboarding");
        } else if (!token) {
          navigation.replace("SignIn");
        } else {
          if (user?.role === "other") {
            navigation.replace("FamilyApp");
          } else {
            navigation.replace("MainApp");
          }
        }
      } catch (error) {
        console.error("SplashScreen error:", error);
        navigation.replace("SignIn");
      }
    };

    setTimeout(checkStatus, 1000);
  }, []);

  return (
    <LinearGradient
      colors={GRADIENTS.onboardingBackground}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.container}
    >
      <Text style={styles.welcome}>Welcome to</Text>
      <Text style={styles.brand}>MOMents</Text>
      <Image source={Logo} style={styles.logo} resizeMode="contain" />
      <Text style={styles.subtitle}>
        Your pregnancy journey companion,{"\n"}here to support you every step of
        the way
      </Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: SPACING.spacing24,
  },
  welcome: {
    ...TEXT_STYLES.displayH1,
    textAlign: "center",
    color: COLORS.gray900,
  },
  brand: {
    ...TEXT_STYLES.displayH1,
    textAlign: "center",
    color: COLORS.purple500,
    marginBottom: SPACING.spacing24,
  },
  logo: {
    width: 196,
    height: 196,
    marginBottom: SPACING.spacing24,
  },
  subtitle: {
    ...TEXT_STYLES.bodyBase,
    textAlign: "center",
    color: COLORS.gray700,
  },
});
