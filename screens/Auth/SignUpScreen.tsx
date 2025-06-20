import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { TextInput, Text, Checkbox } from "react-native-paper";
import CommonButton from "../../components/CommonButton";

const SignUpScreen = ({ navigation, route }: any) => {
  const userType = route.params?.userType;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);

  const handleSignup = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Validation", "Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Validation", "Passwords do not match.");
      return;
    }

    if (!agreed) {
      Alert.alert("Agreement", "Please agree to the Terms before continuing.");
      return;
    }

    try {
      const response = await fetch(
        "http://192.168.1.121:5002/api/auth/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password, role: userType }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", "Account created. Please sign in.");
        navigation.replace("SignIn");
      } else {
        Alert.alert("Signup Failed", data.message);
      }
    } catch (error) {
      Alert.alert("Error", "Network error");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        {userType === "self" ? "Create Account" : "Sign Up on Behalf"}
      </Text>

      <TextInput
        label="Full Name"
        value={name}
        mode="outlined"
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        label="Email"
        value={email}
        mode="outlined"
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />
      <TextInput
        label="Password"
        value={password}
        mode="outlined"
        secureTextEntry
        onChangeText={setPassword}
        style={styles.input}
      />
      <TextInput
        label="Confirm Password"
        value={confirmPassword}
        mode="outlined"
        secureTextEntry
        onChangeText={setConfirmPassword}
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.checkboxRow}
        activeOpacity={0.8}
        onPress={() => setAgreed(!agreed)}
      >
        <Checkbox
          status={agreed ? "checked" : "unchecked"}
          onPress={() => setAgreed(!agreed)}
          color="#000"
        />
        <Text style={styles.agreeText}>I have read and agree to the Terms</Text>
      </TouchableOpacity>

      <CommonButton label="Create Account" onPress={handleSignup} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 26,
    fontWeight: "600",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    marginBottom: 16,
  },
  Checkbox: {
    borderColor: "black",
    borderWidth: 1,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  agreeText: {
    fontSize: 14,
    color: "#333",
    marginLeft: 8,
    flex: 1,
    flexWrap: "wrap",
  },
});

export default SignUpScreen;
