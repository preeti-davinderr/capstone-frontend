import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { Text } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as WebBrowser from "expo-web-browser";
import {
  useAuthRequest,
  ResponseType,
  makeRedirectUri,
  exchangeCodeAsync,
} from "expo-auth-session";

import CommonInput from "../../components/CommonInput";
import CommonButton from "../../components/CommonButton";
import {
  COLORS,
  TEXT_STYLES,
  SPACING,
  EFFECTS,
} from "../../styles/globalStyles";

WebBrowser.maybeCompleteAuthSession();

const CLIENT_ID = "179983777454-hn5gk917in11l7ag6f2j39enoref7j38.apps.googleusercontent.com";

const discovery = {
  authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",
  tokenEndpoint: "https://oauth2.googleapis.com/token",
  revocationEndpoint: "https://oauth2.googleapis.com/revoke",
};

export default function SignInScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const redirectUri = makeRedirectUri({
    scheme: "capstonefrontend",
    path: "redirect",
    // useProxy: true, 
  });

  console.log(redirectUri,"???");
  

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: CLIENT_ID,
      redirectUri,
      responseType: ResponseType.Token,
      scopes: ["openid", "profile", "email"],
      // usePKCE: true,
    },
    discovery
  );

  useEffect(() => {
    const handleAuth = async () => {
      if (response?.type === "success") {
        try {
          const { code } = response.params;

          const tokenResult = await exchangeCodeAsync(
            {
              clientId: CLIENT_ID,
              code,
              redirectUri,
              extraParams: {
                code_verifier: request?.codeVerifier || "",
              },
            },
            discovery
          );

          const accessToken = tokenResult.accessToken;

          const res = await fetch("https://www.googleapis.com/userinfo/v2/me", {
            headers: { Authorization: `Bearer ${accessToken}` },
          });

          const userInfo = await res.json();

          await AsyncStorage.setItem("token", accessToken);
          await AsyncStorage.setItem("user", JSON.stringify(userInfo));

          navigation.replace("MainApp");
        } catch (err) {
          console.error("Auth Error:", err);
          Alert.alert("Login Failed", "Something went wrong with Google login.");
        }
      }
    };

    handleAuth();
  }, [response]);

  const handleGoogleLogin = () => {
    promptAsync();
  };

  const handleLogin = async () => {
    try {
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

        navigation.replace(data.user.role === "other" ? "FamilyApp" : "MainApp");
      } else {
        Alert.alert("Login Failed", data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
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
        <TouchableOpacity onPress={handleGoogleLogin} disabled={!request}>
          <View style={styles.socialCircle}>
            <Image
              source={require("../../assets/splash/google.png")}
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
    marginBottom: SPACING.spacing32,
  },
  orText: {
    ...TEXT_STYLES.bodyBase,
    marginTop: SPACING.spacing16,
    textAlign: "center",
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: SPACING.spacing24,
    marginTop: SPACING.spacing16,
  },
  socialIcon: {
    width: 28,
    height: 28,
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
    backgroundColor: COLORS.white,
    ...EFFECTS.softShadow,
  },
});
