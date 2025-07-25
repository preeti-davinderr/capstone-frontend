import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import FamilyHomeScreen from "../screens/FamilyScreens/FamilyHomeScreen";
import FamilyProfileScreen from "../screens/FamilyScreens/FamilyProfileScreen";
import { COLORS, SPACING, RADIUS, EFFECTS } from "../styles/globalStyles";

const Tab = createBottomTabNavigator();

export default function FamilyTabNavigator() {
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
        marginHorizontal: SPACING.spacing20, // ✅ fixes side spacing
        backgroundColor: COLORS.white,
        borderRadius: RADIUS.xl,
        height: 80,
        paddingBottom: SPACING.spacing8,
        paddingTop: SPACING.spacing8,
        ...EFFECTS.softShadow,
        borderTopWidth: 0,
      },
      tabBarLabelStyle: {
        fontSize: 12,
        fontWeight: "500",
        fontFamily: "WixMadeforDisplay-Medium",
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
        component={FamilyProfileScreen}
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
