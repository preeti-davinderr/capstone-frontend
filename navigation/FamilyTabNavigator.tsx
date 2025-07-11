import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import FamilyHomeScreen from "../screens/FamilyScreens/FamilyHomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { COLORS, SPACING, RADIUS, EFFECTS } from "../styles/globalStyles";

const Tab = createBottomTabNavigator();

export default function FamilyTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.purple700,
        tabBarInactiveTintColor: COLORS.gray700,
        tabBarShowLabel: true,
        tabBarStyle: {
          position: "absolute",
          bottom: SPACING.spacing24,
          marginHorizontal: SPACING.spacing20,
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
        component={FamilyHomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-circle"
              color={color}
              size={24}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
