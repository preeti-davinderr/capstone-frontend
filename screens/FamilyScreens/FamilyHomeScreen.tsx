import React from "react";
import { View, Text, StyleSheet } from "react-native";

const FamilyHomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>👋 HI, Family Home Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 24,
    fontWeight: "600",
    color: "#333",
  },
});

export default FamilyHomeScreen;
