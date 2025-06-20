import React from "react";
import { Text } from "react-native-paper";
import { View } from "react-native";
import FitbitAuthScreen from "./Fitbit/FitbitAuthScreen";

export default function HealthScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Health Screen</Text>
      <FitbitAuthScreen />
    </View>
  );
}
