// import React, { useEffect, useState } from 'react';
// import { ScrollView, View, StyleSheet, Alert } from 'react-native';
// import { Button, Text } from 'react-native-paper';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';
// import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { RootStackParamList } from '../App';
// import { Ionicons } from '@expo/vector-icons';

// type UserProfile = {
//   name: string;
//   email?: string;
//   phone?: string;
//   age?: string;
//   dueDate?: string;
// };

// const InfoRow = ({ icon, label, value }: any) => (
//   <View style={styles.infoRow}>
//     <Ionicons name={icon} size={20} color="#6b46c1" />
//     <Text>
//       {label}: {String(value || "N/A")}
//     </Text>
//   </View>
// );

// export default function ProfileScreen() {
//   const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
//   const [profile, setProfile] = useState<UserProfile | null>(null);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const userString = await AsyncStorage.getItem("user");
//         if (!userString) {
//           Alert.alert("Error", "User not found in local storage.");
//           return;
//         }

//         const user = JSON.parse(userString);
//         if (!user?.id) {
//           Alert.alert("Error", "Invalid user ID.");
//           return;
//         }

//         const res = await fetch(
//           `${process.env.EXPO_PUBLIC_API_URL}/api/user/userProfile?id=${user.id}`
//         );

//         const data = await res.json();
//         console.log("Profile data:", data);
//         if (data.success && data.data) {
//           setProfile(data.data);
//         } else {
//           Alert.alert("Error", data.message || "Failed to load profile.");
//         }
//       } catch (err: any) {
//         console.error("❌ Error fetching profile:", err);
//         Alert.alert("Error", "Something went wrong while fetching profile.");
//       }
//     };

//     fetchProfile();
//   }, []);

//   const handleLogout = async () => {
//     try {
//       await AsyncStorage.removeItem("user");
//       await AsyncStorage.removeItem("token");
//       console.log("✅ User logged out.");
//       navigation.reset({
//         index: 0,
//         routes: [{ name: "SignIn" }],
//       });
//     } catch (error) {
//       console.error("❌ Logout failed:", error);
//     }
//   };

//   return (
//     <ScrollView
//       contentContainerStyle={{
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//         padding: 16,
//         backgroundColor: "#fff",
//       }}
//     >
//       <Text variant="titleLarge" style={{ marginBottom: 20 }}>
//         👤 Profile Screen: {profile?.name || "Loading..."}
//       </Text>

//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Personal Information</Text>
//         <InfoRow icon="calendar" label="Due Date" value={profile?.dueDate} />
//         <InfoRow icon="person" label="Age" value={profile?.age} />
//         <InfoRow icon="mail" label="Email" value={profile?.email} />
//         <InfoRow icon="call" label="Phone" value={profile?.phone} />
//       </View>

//       <Button mode="contained" onPress={handleLogout}>
//         Logout
//       </Button>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   section: {
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 16,
//     width: '100%',
//   },
//   sectionTitle: {
//     fontWeight: "600",
//     fontSize: 16,
//     marginBottom: 12,
//     color: "#2d2d2d",
//   },
//   infoRow: {
//     flexDirection: "row",
//     alignItems: "center",
//    },
// });
import React, { useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet, Alert, Switch, TouchableOpacity } from 'react-native';
import { Text, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native';

// const InfoRow = ({ icon, label, value }: { icon: keyof typeof Ionicons.glyphMap; label: string; value: string }) => (
//   <View style={styles.infoRow}>
//     <Ionicons name={icon} size={20} color="#6b46c1" style={{ marginRight: 8 }} />
//     <Text style={styles.infoText}>{label}: {value}</Text>
//   </View>
// );

const InfoRow = ({ icon, iconType = 'icon', label, value }: any) => (
  <View style={styles.infoRow}>
    {iconType === 'image' ? (
      <Image source={icon} style={styles.imageIcon} />
    ) : (
      <Ionicons name={icon} size={20} color="#6b46c1" style={styles.icon} />
    )}
    <Text style={styles.infoText}>
      {label}: {String(value || 'N/A')}
    </Text>
  </View>
);

type UserProfile = {
  name: string;
  email?: string;
  phone?: string;
  age?: string;
  dueDate?: string;
};

export default function ProfileScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [notifications, setNotifications] = useState(true);
  const [miscarriageSupport, setMiscarriageSupport] = useState(false);
  const [prematureBirthInfo, setPrematureBirthInfo] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userString = await AsyncStorage.getItem('user');
        if (!userString) return Alert.alert('Error', 'User not found.');

        const user = JSON.parse(userString);
        const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/user/userProfile?id=${user.id}`);
        const data = await res.json();

        if (data.success && data.data) setProfile(data.data);
        else Alert.alert('Error', data.message || 'Profile load failed.');
      } catch (err) {
        Alert.alert('Error', 'Something went wrong.');
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('token');
    navigation.reset({ index: 0, routes: [{ name: 'SignIn' }] });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>My Profile</Text>

      {/* <View style={styles.profileCard}>
        <View style={styles.avatar} />
        <Text style={styles.profileName}>{profile?.name ?? 'Name'}</Text>
        <Text style={styles.subText}>22 weeks pregnant</Text>
        <TouchableOpacity style={styles.editIcon}><Ionicons name="create-outline" size={18} /></TouchableOpacity>
      </View> */}

      <View style={styles.profileCard}>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatar} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.profileName}>{profile?.name ?? 'Name'}</Text>
            <View style={styles.subRow}>
              <Image
                source={require('../assets/profile_images/user.png')} // adjust path based on your folder
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
        <InfoRow icon={require('../assets/profile_images/dOB.png')} iconType="image" label="Due Date" value={profile?.dueDate ?? 'N/A'} />
        <InfoRow icon={require('../assets/profile_images/dOB.png')} iconType="image" label="Age" value={profile?.age ? `${profile.age} years` : 'N/A'} />
        <InfoRow icon={require('../assets/profile_images/email.png')} iconType="image" label="Email" value={profile?.email ?? 'N/A'} />
        <InfoRow icon={require('../assets/profile_images/call.png')} iconType="image" label="Phone" value={profile?.phone ?? 'N/A'} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Family & Friends</Text>
        <InfoRow icon="person" label="Partner" value="Augusto Wong (Connected)" />
        <InfoRow icon="person" label="Mom" value="Lydia Li (Connected)" />
        <Button icon="account-plus" mode="contained" buttonColor="#9f7aea" style={{ marginTop: 12 }}>
          Share your journey
        </Button>
      </View>

      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Privacy Settings</Text>

        <View style={styles.switchRow}>
          <Image source={require('../assets/profile_images/Notification.png')} style={styles.iconImage} />
          <Text style={styles.switchLabel}>Notifications</Text>
          <Switch value={notifications} onValueChange={setNotifications} />
        </View>

        <View style={styles.switchRow}>
          <Image source={require('../assets/profile_images/MiscarriageSupport.png')} style={styles.iconImage} />
          <Text style={styles.switchLabel}>Miscarriage Support</Text>
          <Switch value={miscarriageSupport} onValueChange={setMiscarriageSupport} />
        </View>

        <View style={styles.switchRow}>
          <Image source={require('../assets/profile_images/PrematureBirth.png')} style={styles.iconImage} />
          <Text style={styles.switchLabel}>Premature Birth Info</Text>
          <Switch value={prematureBirthInfo} onValueChange={setPrematureBirthInfo} />
        </View>
      </View>

      <View style={styles.section}>
      <Text style={styles.sectionTitle}>App Settings</Text>

      <TouchableOpacity>
        <View style={styles.row}>
          <Image source={require('../assets/profile_images/ChangePassword.png')} style={styles.iconImage} />
          <Text style={styles.linkText}>Change Password</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleLogout}>
        <View style={styles.row}>
          <Image source={require('../assets/profile_images/Logout.png')} style={styles.iconImage} />
          <Text style={styles.linkText}>Logout</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity>
        <View style={styles.row}>
          <Image source={require('../assets/profile_images/delete.png')} style={styles.iconImage} />
          <Text style={styles.linkText}>Delete Account</Text>
        </View>
      </TouchableOpacity>
    </View>

    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Support & Resources</Text>

      <TouchableOpacity>
        <View style={styles.row}>
          <Image source={require('../assets/profile_images/FAQ.png')} style={styles.iconImage} />
          <Text style={styles.linkText}>FAQs</Text>
        </View>
      </TouchableOpacity>
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
  },icon: {
    marginRight: 10,
  },
  profileCard: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#f3f0ff',
  padding: 16,
  borderRadius: 12,
  position: 'relative',
},

avatarWrapper: {
  width: 60,
  height: 60,
  borderRadius: 30,
  borderWidth: 2,
  borderColor: '#A48EF0',
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: 12,
},

avatar: {
  width: 50,
  height: 50,
  borderRadius: 25,
  backgroundColor: '#ccc',
},

textContainer: {
  flex: 1,
},

profileName: {
  fontSize: 18,
  fontWeight: '600',
  color: '#1C1C1E',
},

subRow: {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: 4,
},
subText: {
  fontSize: 14,
  color: '#A48EF0',
},
    imageIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    resizeMode: 'contain',
    },
  editIcon: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 6,
  },
  linkText: {
    fontSize: 14,
    color: '#6b46c1',
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
    color: '#444',
  },
  row: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 12,
},
});
