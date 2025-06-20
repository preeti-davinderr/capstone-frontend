import React from "react";
import { Text } from "react-native-paper";
import { View } from "react-native";
import CommonButton from "../components/CommonButton";
import AsyncStorage from "@react-native-async-storage/async-storage";// update the path as needed
import Fitbit from "../screens/Fitbit/Fitbit"; 

export default function HomeScreen({ navigation }: any) {
  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    navigation.replace("SignIn");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {/* ✅ Fitbit component added */}
      <Fitbit />

      {/* ✅ Logout button */}
      <CommonButton label={"Logout"} onPress={handleLogout} />
    </View>
  );
}
