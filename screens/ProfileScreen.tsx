import React from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';

export default function ProfileScreen() {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("user");
      console.log("✅ User logged out.");
      navigation.dispatch(
        StackActions.replace("SignIn") 
      );
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
        👤 Profile Screen
      </Text>

      <Button mode="contained" onPress={handleLogout}>
        Logout
      </Button>
    </ScrollView>
  );
}
