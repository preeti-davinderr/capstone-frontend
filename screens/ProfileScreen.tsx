import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput, Modal } from 'react-native';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';


const BASE_URL = 'http://192.168.1.112:5001';
// const BASE_URL = 'https://moments-backend.onrender.com';

const InfoRow = ({ icon, label, value }: any) => (
  <View style={styles.infoRow}>
    <Ionicons name={icon} size={20} color="#6b46c1" style={styles.icon} />
    <Text style={styles.infoText}>{label}: {value}</Text>
  </View>
);

const ToggleRow = ({ label, value, onValueChange }: any ) => (
  <View style={styles.settingRow}>
    <Text style={styles.settingText}>{label}</Text>
    <Switch value={value} onValueChange={onValueChange} />
  </View>
);

const styles = StyleSheet.create({
  container: { backgroundColor: '#fdfdfd', padding: 16, flex: 1 },
  loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 },
  headerText: { fontSize: 22, fontWeight: 'bold', color: '#222' },
  profileInfo: { alignItems: 'center', marginBottom: 20 },
  name: { fontSize: 18, fontWeight: '600', marginTop: 6 },
  subtext: { fontSize: 14, color: '#6b6b6b' },
  section: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 16 },
  sectionTitle: { fontWeight: '600', fontSize: 16, marginBottom: 12, color: '#2d2d2d' },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  icon: { marginRight: 10 },
  infoText: { fontSize: 15, color: '#444' },
  settingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  settingText: { fontSize: 15, color: '#444' },
  linkRow: { paddingVertical: 10 },
  linkText: { fontSize: 15, color: '#6b46c1' },
});

export default function MyProfileScreen() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [miscarriageSupport, setMiscarriageSupport] = useState(false);
  const [prematureInfo, setPrematureInfo] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleLogout = async () => {
      try {
        await AsyncStorage.removeItem('userEmail');
        await AsyncStorage.removeItem('token');

        Alert.alert("Logged Out", "Your session has been cleared.");

        // Optional: clear profile data locally
        setProfile(null);
      } catch (err: any) {
        Alert.alert("Error", err.message || "Could not log out");
      }
    };

    {profile ? (
  <>
    {/* Render profile info */}
    <Text style={styles.name}>{profile?.name}</Text>
          ...
        </>
      ) : (
        <View style={{ padding: 20, alignItems: 'center' }}>
          <Text style={{ fontSize: 16, color: '#666' }}>You are logged out.</Text>
        </View>
      )}


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const email = await AsyncStorage.getItem('userEmail');
        const res = await fetch(`${BASE_URL}/userProfile`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });

        const data = await res.json();
        if (data.success) {
          setProfile(data.data);
        } else {
          Alert.alert("Error", data.message);
        }
      } catch (err: any) {
        Alert.alert("Error", err.message || 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#6b46c1" />
      </View>
    );
  }


  return (
  <>
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>My Profile</Text>
        <Ionicons name="notifications-outline" size={24} color="#333" />
      </View>

      {/* Profile Info */}
      <View style={styles.profileInfo}>
        <Ionicons name="person-circle" size={72} color="#aaa" />
        <Text style={styles.name}>{profile?.name || 'Unnamed'}</Text>
        <Text style={styles.subtext}>{profile?.pregnancyWeek}</Text>
      </View>

      {/* Personal Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        <InfoRow icon="calendar" label="Due Date" value={profile?.dueDate} />
        <InfoRow icon="person" label="Age" value={profile?.age} />
        <InfoRow icon="mail" label="Email" value={profile?.email} />
        <InfoRow icon="call" label="Phone" value={profile?.phone || 'N/A'} />
      </View>

      {/* Privacy Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Privacy Settings</Text>
        <ToggleRow label="Notifications" value={notificationsEnabled} onValueChange={setNotificationsEnabled} />
        <ToggleRow label="Miscarriage Support" value={miscarriageSupport} onValueChange={setMiscarriageSupport} />
        <ToggleRow label="Premature Birth Info" value={prematureInfo} onValueChange={setPrematureInfo} />
      </View>

      {/* App Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App Settings</Text>
        <TouchableOpacity style={styles.linkRow} onPress={() => setShowPasswordModal(true)}>
          <Text style={styles.linkText}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkRow} onPress={handleLogout}>
          <Text style={styles.linkText}>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkRow}><Text style={[styles.linkText, { color: '#c53030' }]}>Delete Account</Text></TouchableOpacity>
      </View>
    </ScrollView>

    {/* ✅ Modal must be inside the return block */}
    <Modal visible={showPasswordModal} transparent animationType="slide">
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: 'rgba(0,0,0,0.5)'
      }}>
        <View style={{
          backgroundColor: 'white',
          padding: 20,
          borderRadius: 12,
          width: '85%'
        }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10 }}>Change Password</Text>

          <TextInput
            placeholder="Old Password"
            secureTextEntry
            value={oldPassword}
            onChangeText={setOldPassword}
            style={{ borderBottomWidth: 1, marginBottom: 12 }}
          />
          <TextInput
            placeholder="New Password"
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
            style={{ borderBottomWidth: 1, marginBottom: 20 }}
          />

          <TouchableOpacity
            style={{ backgroundColor: '#6b46c1', padding: 10, borderRadius: 8 }}
            onPress={async () => {
              if (!oldPassword || !newPassword) {
                Alert.alert("Error", "Both fields are required.");
                return;
              }
              try {
                const res = await fetch(`${BASE_URL}/changePassword`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    email: profile?.email,
                    oldPassword,
                    password: newPassword
                  })
                });
                const data = await res.json();
                if (data.success) {
                  Alert.alert("Success", data.message || "Password changed");
                  setShowPasswordModal(false);
                  setOldPassword('');
                  setNewPassword('');
                } else {
                  Alert.alert("Error", data.message || "Failed to change password");
                }
              } catch (err: any) {
                Alert.alert("Error", err.message || "Network error");
              }
            }}
          >
            <Text style={{ color: 'white', textAlign: 'center' }}>Submit</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setShowPasswordModal(false)} style={{ marginTop: 12 }}>
            <Text style={{ color: '#6b46c1', textAlign: 'center' }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  </>
);
}

