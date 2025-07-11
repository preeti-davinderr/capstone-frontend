import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Alert,
  Switch,
  TouchableOpacity,
} from "react-native";
import { Text, Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../styles/globalStyles";
import MainHeader from "../components/MainHeader";
import CommonButton from "../components/CommonButton";
import * as Clipboard from "expo-clipboard";

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
  phone?: string;
  age?: string;
  dueDate?: string;
  familyCode?: string;
};

export default function ProfileScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [notifications, setNotifications] = useState(true);
  const [miscarriageSupport, setMiscarriageSupport] = useState(false);
  const [prematureBirthInfo, setPrematureBirthInfo] = useState(false);

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
        const familyCode = await AsyncStorage.getItem("user");
        const parsed = familyCode ? JSON.parse(familyCode) : null;

        console.log(">>>>jj", parsed, data);

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
    console.log("hi");
    
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
      <ScrollView style={styles.container}>
        <View style={styles.profileCard}>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatar} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.profileName}>{profile?.name ?? "Name"}</Text>
            <View style={styles.subRow}>
              <Image
                source={require("../assets/profile_images/user.png")} // adjust path based on your folder
                style={styles.iconImage}
              />
              <Text style={styles.subText}>22 weeks pregnant</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.editIcon}>
            <Ionicons name="create-outline" size={18} color="#000" />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <InfoRow
            icon={require("../assets/profile_images/dOB.png")}
            iconType="image"
            label="Due Date"
            value={profile?.dueDate ?? "N/A"}
          />
          <InfoRow
            icon={require("../assets/profile_images/dOB.png")}
            iconType="image"
            label="Age"
            value={profile?.age ? `${profile.age} years` : "N/A"}
          />
          <InfoRow
            icon={require("../assets/profile_images/email.png")}
            iconType="image"
            label="Email"
            value={profile?.email ?? "N/A"}
          />
          <InfoRow
            icon={require("../assets/profile_images/call.png")}
            iconType="image"
            label="Phone"
            value={profile?.phone ?? "N/A"}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Family & Friends</Text>
          <InfoRow
            icon="person"
            label="Partner"
            value="Augusto Wong (Connected)"
          />
          <InfoRow icon="person" label="Mom" value="Lydia Li (Connected)" />
          <InfoRow icon="person" label="Family Code" value="." />
          <CommonButton
            label={`${profile?.familyCode ?? ""}`}
            onPress={handleCopyFamilyCode}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy Settings</Text>

          <View style={styles.switchRow}>
            <Image
              source={require("../assets/profile_images/Notification.png")}
              style={styles.iconImage}
            />
            <Text style={styles.switchLabel}>Notifications</Text>
            <Switch value={notifications} onValueChange={setNotifications} />
          </View>

          <View style={styles.switchRow}>
            <Image
              source={require("../assets/profile_images/MiscarriageSupport.png")}
              style={styles.iconImage}
            />
            <Text style={styles.switchLabel}>Miscarriage Support</Text>
            <Switch
              value={miscarriageSupport}
              onValueChange={setMiscarriageSupport}
            />
          </View>

          <View style={styles.switchRow}>
            <Image
              source={require("../assets/profile_images/PrematureBirth.png")}
              style={styles.iconImage}
            />
            <Text style={styles.switchLabel}>Premature Birth Info</Text>
            <Switch
              value={prematureBirthInfo}
              onValueChange={setPrematureBirthInfo}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Settings</Text>

          <TouchableOpacity>
            <View style={styles.row}>
              <Image
                source={require("../assets/profile_images/ChangePassword.png")}
                style={styles.iconImage}
              />
              <Text style={styles.linkText}>Change Password</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleLogout}>
            <View style={styles.row}>
              <Image
                source={require("../assets/profile_images/Logout.png")}
                style={styles.iconImage}
              />
              <Text style={styles.linkText}>Logout</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={styles.row}>
              <Image
                source={require("../assets/profile_images/delete.png")}
                style={styles.iconImage}
              />
              <Text style={styles.linkText}>Delete Account</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support & Resources</Text>

          <TouchableOpacity>
            <View style={styles.row}>
              <Image
                source={require("../assets/profile_images/FAQ.png")}
                style={styles.iconImage}
              />
              <Text style={styles.linkText}>FAQs</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
  },
  icon: {
    marginRight: 10,
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f0ff",
    padding: 16,
    borderRadius: 12,
    position: "relative",
  },

  avatarWrapper: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#A48EF0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#ccc",
  },

  textContainer: {
    flex: 1,
  },

  profileName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1C1C1E",
  },

  subRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  subText: {
    fontSize: 14,
    color: "#A48EF0",
  },
  imageIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    resizeMode: "contain",
  },
  editIcon: {
    position: "absolute",
    top: 12,
    right: 12,
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 6,
  },
  linkText: {
    fontSize: 14,
    color: "#6b46c1",
    paddingVertical: 6,
  },
  iconImage: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  switchLabel: {
    flex: 1,
    fontSize: 15,
    color: "#444",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
});
