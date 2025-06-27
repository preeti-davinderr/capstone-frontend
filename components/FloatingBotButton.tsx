import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

export default function FloatingBotButton() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const goToChat = () => {
    navigation.navigate("ChatBot"); // ✅ This must exist in your RootStackParamList
  };

  return (
    <TouchableOpacity style={styles.button} onPress={goToChat}>
      <MaterialCommunityIcons name="robot" size={28} color="#fff" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    right: 20,
    bottom: 30,
    backgroundColor: "#6200ee",
    borderRadius: 50,
    padding: 16,
    elevation: 4,
    zIndex: 999,
  },
});
