import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useFitbitAuth } from './Fitbit/FitbitAuthScreen';
import { fetchFitbitData } from './Fitbit/fetchFitbitData';
import * as WebBrowser from 'expo-web-browser';

export default function ProfileScreen() {
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

      {/* Add any buttons or user info here */}
      <Button mode="contained" onPress={() => console.log('Logout pressed')}>
        Logout
      </Button>
    </ScrollView>
  );
}