import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
} from "react-native";
import { Text } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  COLORS,
  EFFECTS,
  RADIUS,
  SPACING,
  TEXT_STYLES,
} from "../styles/globalStyles";
import MainHeader from "../components/MainHeader";
import CommonButton from "../components/CommonButton";
import * as Clipboard from "expo-clipboard";
import { format } from "date-fns";

const InfoRow = ({ icon, iconType = "icon", label, value }: any) => (
  <View style={styles.infoRow}>
    {iconType === "image" ? (
      <Image source={icon} style={styles.imageIcon} />
    ) : (
      <Ionicons name={icon} size={20} color="#6b46c1" style={styles.icon} />
    )}
    <Text style={styles.infoText}>
      {label}: {String(value || "N/A")}
    </Text>
  </View>
);

type UserProfile = {
  name: string;
  email?: string;
  dueDate?: string;
  familyCode?: string;
};

export default function ProfileScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userString = await AsyncStorage.getItem("user");
        if (!userString) return Alert.alert("Error", "User not found.");

        const user = JSON.parse(userString);
        const res = await fetch(
          `${process.env.EXPO_PUBLIC_API_URL}/api/user/userProfile?id=${user.id}`
        );
        const data = await res.json();

        if (data.success && data.data) setProfile(data.data);
        else Alert.alert("Error", data.message || "Profile load failed.");
      } catch (err) {
        Alert.alert("Error", "Something went wrong.");
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("token");
    navigation.reset({ index: 0, routes: [{ name: "SignIn" }] });
  };

  const handleCopyFamilyCode = async () => {
    if (profile?.familyCode) {
      await Clipboard.setStringAsync(profile.familyCode);
      Alert.alert("Copied", "Family code copied to clipboard.");
    } else {
      Alert.alert("Unavailable", "Family code is not available to copy.");
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.background }}
      edges={["left", "right", "bottom"]}
    >
      <MainHeader title="My Profile" subtitle="" />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.profileCard}>
          <View style={styles.avatarWrapper}>
            <Image
              source={require("../assets/profile_images/avatar.png")}
              style={styles.avatar}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.profileName}>{profile?.name ?? "Name"}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <InfoRow
            icon={require("../assets/profile_images/dOB.png")}
            iconType="image"
            label="Due Date"
            value={
              profile?.dueDate
                ? format(new Date(profile.dueDate), "dd-MMM-yyyy")
                : "N/A"
            }
          />
          <InfoRow
            icon={require("../assets/profile_images/email.png")}
            iconType="image"
            label="Email"
            value={profile?.email ?? "N/A"}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Family & Friends</Text>
          <InfoRow icon="person" label="Family Code" value=" " />
          <CommonButton
            label={`${profile?.familyCode ?? ""}`}
            onPress={handleCopyFamilyCode}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Settings</Text>
          <TouchableOpacity onPress={handleLogout}>
            <View style={styles.row}>
              <Image
                source={require("../assets/profile_images/Logout.png")}
                style={styles.imageIcon}
              />
              <Text style={styles.linkText}>Logout</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: SPACING.spacing12,
    padding: SPACING.spacing20,
    paddingBottom: 82,
    backgroundColor: COLORS.background,
  },
  imageIcon: {
    width: 20,
    marginRight: SPACING.spacing8,
    resizeMode: "contain",
  },
  icon: {
    marginRight: SPACING.spacing8,
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    padding: SPACING.spacing16,
    borderRadius: RADIUS.lg,
  },
  avatarWrapper: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: COLORS.purple500,
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.spacing12,
  },
  textContainer: {
    flex: 1,
  },
  profileName: {
    ...TEXT_STYLES.subheading,
    fontSize: 18,
    textAlign: "left",
  },
  section: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    padding: SPACING.spacing16,
    marginTop: SPACING.spacing20,
    ...EFFECTS.shadow,
  },
  sectionTitle: {
    ...TEXT_STYLES.bodyBase,
    fontWeight: "600",
    marginBottom: SPACING.spacing12,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.spacing8,
  },
  infoText: {
    ...TEXT_STYLES.bodySmall,
    flexShrink: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.spacing12,
  },
  linkText: {
    ...TEXT_STYLES.bodySmall,
    color: COLORS.purple500,
    paddingVertical: SPACING.spacing6,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    resizeMode: "cover",
  }
});
