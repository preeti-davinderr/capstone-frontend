import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, View } from "react-native";

import SplashScreen from "./screens/OnBoardingScreens/SplashScreen";
import OnboardingScreen from "./screens/OnBoardingScreens/OnBoardingScreen";
import TabNavigator from "./navigation/TabNavigator";

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  MainApp: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasOnboarded, setHasOnboarded] = useState(false);

  useEffect(() => {
    // remove this code later signup
    const resetOnboarding = async () => {
      await AsyncStorage.removeItem("hasOnboarded");
      console.log("Onboarding flag has been cleared ✅");
    };
    resetOnboarding();

    const checkOnboardingStatus = async () => {
      const value = await AsyncStorage.getItem("hasOnboarded");
      console.log("hasOnboarded:", value); // should show null now
      setHasOnboarded(value === "true");
      setIsLoading(false);
    };

    checkOnboardingStatus();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!hasOnboarded ? (
          <>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen name="MainApp" component={TabNavigator} />
          </>
        ) : (
          <Stack.Screen name="MainApp" component={TabNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
