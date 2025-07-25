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
import { RootStackParamList } from "../../App";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../styles/globalStyles";
import MainHeader from "../../components/MainHeader";
import CommonButton from "../../components/CommonButton";
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
  const [showFAQ, setShowFAQ] = useState(false); // 👈 FAQ modal state

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
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }} edges={["left", "right", "bottom"]}>
      <MainHeader title="My Profile" subtitle="" />
      <ScrollView style={styles.container}>
        <View style={styles.profileCard}>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatar} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.profileName}>{profile?.name ?? "Name"}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <InfoRow icon={require("../assets/profile_images/dOB.png")} iconType="image" label="Due Date" value={profile?.dueDate ?? "N/A"} />
          <InfoRow icon={require("../assets/profile_images/dOB.png")} iconType="image" label="Age" value={profile?.age ? `${profile.age} years` : "N/A"} />
          <InfoRow icon={require("../assets/profile_images/email.png")} iconType="image" label="Email" value={profile?.email ?? "N/A"} />
          <InfoRow icon={require("../assets/profile_images/call.png")} iconType="image" label="Phone" value={profile?.phone ?? "N/A"} />
        </View>

        {/* <View style={styles.section}>
          <Text style={styles.sectionTitle}>Family & Friends</Text>
          <InfoRow icon="person" label="Partner" value="Augusto Wong" />
          <CommonButton label={`${profile?.familyCode ?? ""}`} onPress={handleCopyFamilyCode} />
        </View> */}

        <View style={styles.section}>
          <View style={styles.switchRow}>
            <Image source={require("../assets/profile_images/Notification.png")} style={styles.iconImage} />
            <Text style={styles.switchLabel}>Notifications</Text>
            <Switch value={notifications} onValueChange={setNotifications} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Settings</Text>

          <TouchableOpacity>
            <View style={styles.row}>
              <Image source={require("../assets/profile_images/ChangePassword.png")} style={styles.iconImage} />
              <Text style={styles.linkText}>Change Password</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleLogout}>
            <View style={styles.row}>
              <Image source={require("../assets/profile_images/Logout.png")} style={styles.iconImage} />
              <Text style={styles.linkText}>Logout</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={styles.row}>
              <Image source={require("../assets/profile_images/delete.png")} style={styles.iconImage} />
              <Text style={styles.linkText}>Delete Account</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support & Resources</Text>

          <TouchableOpacity style={styles.row_FAQ} onPress={() => setShowFAQ(true)}>
            <View style={styles.row}>
              <Image source={require("../assets/profile_images/FAQ.png")} style={styles.iconImage} />
              <Text style={styles.linkText}>FAQs</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* ✅ FAQ Modal */}
      {showFAQ && (
        <View style={styles.faqModalOverlay}>
          <View style={styles.faqModal}>
            <Text style={styles.faqTitle}>Frequently Asked Questions</Text>

            <View style={styles.faqItem}>
              <Text style={styles.faqQuestion}>❓ How do I track my baby bump?</Text>
              <Text style={styles.faqAnswer}>Use the "Baby Bump" journal to upload weekly bump photos.</Text>
            </View>

            <View style={styles.faqItem}>
              <Text style={styles.faqQuestion}>❓ How can I invite family?</Text>
              <Text style={styles.faqAnswer}>Share your Family Code from your profile screen.</Text>
            </View>

            <CommonButton label="Close" onPress={() => setShowFAQ(false)} style={{ marginTop: 20 }} />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  imageIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    resizeMode: "contain",
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
  iconImage: {
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
  iconImage_FAQ: {
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
  row_FAQ: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 50,
  },
  // FAQ Modal styles
  faqModalOverlay: {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    zIndex: 999,
  },
  faqModal: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    width: "100%",
    maxWidth: 340,
    elevation: 5,
  },
  faqTitle: {
    fontSize: 25,
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
  },
  faqItem: {
    marginBottom: 12,
  },
  faqQuestion: {
    fontWeight: "600",
    fontSize: 14,
    marginBottom: 2,
  },
  faqAnswer: {
    fontSize: 13,
    color: "#555",
    lineHeight: 18,
  },
});
