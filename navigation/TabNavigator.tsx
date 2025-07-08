// TabNavigator.tsx
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import HealthScreen from "../screens/HealthScreen";
import JournalScreen from "../screens/JournalScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { COLORS, SPACING, RADIUS, EFFECTS } from "../styles/globalStyles"; // adjust path if needed

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.purple500,
        tabBarInactiveTintColor: COLORS.gray700,
        tabBarShowLabel: true,
        tabBarStyle: {
          position: "absolute",
          bottom: SPACING.spacing24,
          marginHorizontal: SPACING.spacing24, // ✅ fixes side spacing
          backgroundColor: COLORS.white,
          borderRadius: RADIUS.lg,
          height: 70,
          paddingBottom: SPACING.spacing8,
          paddingTop: SPACING.spacing8,
          ...EFFECTS.softShadow,
          borderTopWidth: 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Health"
        component={HealthScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="heart-pulse" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Journal"
        component={JournalScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="notebook" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-circle" color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
