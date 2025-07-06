import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { Button, Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState<string>("");

  useEffect(() => {
    const loadUserName = async () => {
      try {
        const userString = await AsyncStorage.getItem("user");
        if (userString) {
          const user = JSON.parse(userString);
          setName(user.name || "");
        }
      } catch (error) {
        console.error("Error loading user from AsyncStorage:", error);
      }
    };

    loadUserName();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("user");
      await AsyncStorage.removeItem("token");
      console.log("✅ User logged out.");
      navigation.dispatch(StackActions.replace("SignIn"));
    } catch (error) {
      console.error("❌ Logout failed:", error);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      }}
    >
      <Text variant="titleLarge" style={{ marginBottom: 20 }}>
        👤 Profile Screen: {name}
      </Text>

      <Button mode="contained" onPress={handleLogout}>
        Logout
      </Button>
    </ScrollView>
  );
}
