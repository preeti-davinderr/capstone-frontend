import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { COLORS } from "../styles/globalStyles";

export default function FloatingBotButton() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const goToChat = () => {
    navigation.navigate("ChatBot"); // ✅ This must exist in your RootStackParamList
  };

  return (
    <TouchableOpacity style={styles.button} onPress={goToChat}>
      <MaterialCommunityIcons name="chat" size={28} color="white" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    right: 20,
    bottom: 100,
    backgroundColor: COLORS.purple500,
    borderRadius: 50,
    padding: 16,
    elevation: 4,
    zIndex: 999,
  },
});
