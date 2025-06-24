import React, { useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Text, TextInput } from "react-native-paper";
import CommonButton from "../../components/CommonButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";

export default function SignInScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      await AsyncStorage.setItem("token", data.token);
      await AsyncStorage.setItem("user", JSON.stringify({ id: data.user.id }));

      navigation.replace("MainApp");
    } else {
      alert(data.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        label="Email"
        value={email}
        mode="outlined"
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        label="Password"
        value={password}
        mode="outlined"
        secureTextEntry
        onChangeText={setPassword}
        style={styles.input}
      />

      <CommonButton label="Sign In" onPress={handleLogin} />
      <Text style={styles.noAccount}>Don't have an account yet?</Text>
      <CommonButton
        label="Create New Account"
        onPress={() => navigation.navigate("WhoFor")}
        style={styles.createAccountBtn}
        buttonLabel={styles.createAccountLabel}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexGrow: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    marginBottom: 16,
  },
  noAccount: {
    fontSize: 14,
    color: "#888",
    marginTop: 8,
    textAlign: "center",
  },
  createAccountBtn: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "black",
  },
  createAccountLabel: {
    color: "black",
  },
});
