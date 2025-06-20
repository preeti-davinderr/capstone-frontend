import React from "react";
import { Text } from "react-native-paper";
import { View } from "react-native";
import CommonButton from "../components/CommonButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen({ navigation }: any) {
  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    navigation.replace("SignIn");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <CommonButton label={"Logout"} onPress={handleLogout} />
    </View>
  );
}
