import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Text, Checkbox } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CommonInput from "../../components/CommonInput";
import CommonButton from "../../components/CommonButton";
import {
  COLORS,
  TEXT_STYLES,
  SPACING,
} from "../../styles/globalStyles";

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
      <Text style={styles.heading}>
        {userType === "self" ? "Create Account" : "Sign Up with Family Code"}
      </Text>

      <View style={styles.form}>
        <CommonInput
          label="Full Name"
          value={name}
          onChangeText={setName}
          placeholder="Your name"
        />
        <CommonInput
          label="Email Address"
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <CommonInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
        />
        <CommonInput
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm Password"
          secureTextEntry
        />
        {userType === "other" && (
          <CommonInput
            label="Enter Family Code"
            value={familyCode}
            onChangeText={setFamilyCode}
            placeholder="Family Code"
          />
        )}
      </View>

      <TouchableOpacity
        style={styles.checkboxRow}
        activeOpacity={0.8}
        onPress={() => setAgreed(!agreed)}
      >
        <Checkbox.Android
          status={agreed ? "checked" : "unchecked"}
          onPress={() => setAgreed(!agreed)}
          color={COLORS.purple500}
        />
        <Text style={styles.agreeText}>I have read and agree to the Terms</Text>
      </TouchableOpacity>

      <CommonButton label="Create Account" onPress={handleSignup} />

      <Text style={styles.signInLink}>
        Already have an account?{" "}
        <Text
          onPress={() => navigation.replace("SignIn")}
          style={styles.linkText}
        >
          Sign In
        </Text>
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SPACING.spacing48,
    flexGrow: 1,
    justifyContent: "center",
    backgroundColor: COLORS.background,
  },
  heading: {
    ...TEXT_STYLES.displayH1,
    textAlign: "center",
    marginBottom: SPACING.spacing32,
  },
  form: {
    gap: SPACING.spacing16,
    marginBottom: SPACING.spacing32,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.spacing24,
  },
  agreeText: {
    ...TEXT_STYLES.bodyBase,
    color: COLORS.gray700,
    marginLeft: SPACING.spacing2,
    flex: 1,
    flexWrap: "wrap",
  },
  signInLink: {
    ...TEXT_STYLES.bodyBase,
    marginTop: SPACING.spacing32,
    textAlign: "center",
  },
  linkText: {
    color: COLORS.purple500,
    fontWeight: "700",
  },
});

export default SignUpScreen;
