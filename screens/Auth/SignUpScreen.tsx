import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { TextInput, Text, Checkbox } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CommonButton from "../../components/CommonButton";

const SignUpScreen = ({ navigation, route }: any) => {
  const userType = route.params?.userType;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [familyCode, setFamilyCode] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [dueDate, setDueDate] = useState<string | null>(null);
  const [nickName, setNickName] = useState<string | null>(null);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userString = await AsyncStorage.getItem("user");
        if (userString) {
          const user = JSON.parse(userString);
          setNickName(user.nickName || "");
          setDueDate(user.dueDate || null);
        }
      } catch (err) {
        console.error("Failed to load user from AsyncStorage", err);
      }
    };

    loadUserData();
  }, []);

  const handleSignup = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Validation", "Please fill in all fields.");
      return;
    }

    if (userType === "other" && !familyCode) {
      Alert.alert("Validation", "Please enter your family code.");
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
      const payload: any = {
        name,
        email,
        password,
        role: userType,
        nickName,
        dueDate,
      };

      console.log(payload,">>");
      
      if (userType === "other") {
        payload.familyCode = familyCode;
      }

      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/api/auth/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", "Account created. Please sign in.");
        navigation.replace("SignIn");
      } else {
        Alert.alert("Signup Failed", data.message || "Something went wrong.");
      }
    } catch (error) {
      Alert.alert("Error", "Network error");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        {userType === "self" ? "Create Account" : "Sign Up with Family Code"}
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

      {userType === "other" && (
        <TextInput
          label="Enter Family Code"
          value={familyCode}
          mode="outlined"
          onChangeText={setFamilyCode}
          style={styles.input}
        />
      )}

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
