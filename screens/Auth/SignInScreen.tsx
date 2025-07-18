import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { Text } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CommonInput from "../../components/CommonInput";
import CommonButton from "../../components/CommonButton";
import {
  COLORS,
  TEXT_STYLES,
  SPACING,
  EFFECTS,
} from "../../styles/globalStyles";

export default function SignInScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/api/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      await AsyncStorage.setItem("token", data.token);
      await AsyncStorage.setItem(
        "user",
        JSON.stringify({
          id: data.user.id,
          role: data.user.role,
          name: data.user.name,
          familyCode: data.user.familyCode,
        })
      );

      if (data.user.role === "other") {
        navigation.replace("FamilyApp");
      } else {
        navigation.replace("MainApp");
      }
    } else {
      alert(data.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>
        Every journey begins{"\n"}with a moment.
      </Text>
      <Text style={styles.subheading}>
        Sign in to start tracking your little one’s milestones.
      </Text>

      <View style={styles.form}>
        <CommonInput
          label="Email Address"
          value={email}
          onChangeText={setEmail}
          placeholder="Email Address"
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
      </View>
      <CommonButton label="Log In" onPress={handleLogin} />
      <Text style={styles.signUpText}>
        Don’t have an account?{" "}
        <Text
          onPress={() => navigation.navigate("WhoFor")}
          style={styles.signUpLink}
        >
          Sign Up
        </Text>
      </Text>
      <Text style={styles.orText}>- or continue with -</Text>

      <View style={styles.socialRow}>
        <TouchableOpacity>
          <View style={styles.socialCircle}>
            <Image
              source={require("../../assets/splash/person.png")}
              style={styles.socialIcon}
            />
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

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
    marginBottom: SPACING.spacing12,
    color: COLORS.gray900,
  },
  subheading: {
    ...TEXT_STYLES.headingH2,
    textAlign: "center",
    color: COLORS.gray700,
    marginBottom: SPACING.spacing48,
  },
  form: {
    gap: SPACING.spacing16,
    // marginTop: SPACING.spacing16,
    marginBottom: SPACING.spacing32,
  },
  orText: {
    ...TEXT_STYLES.bodyBase,
    marginTop: SPACING.spacing16,
    textAlign: "center",
    // marginVertical: SPACING.spacing24,
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: SPACING.spacing24,
    marginTop: SPACING.spacing16,
  },
  socialIcon: {
    width: 48,
    height: 48,
    // resizeMode: "contain",
  },
  signUpText: {
    ...TEXT_STYLES.bodyBase,
    textAlign: "center",
    marginTop: SPACING.spacing32,
  },
  signUpLink: {
    color: COLORS.purple500,
    fontWeight: "700",
  },
  socialCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 1,
    borderColor: COLORS.gray300,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white, // optional
    ...EFFECTS.softShadow, // if you want to add subtle elevation
  },
});
