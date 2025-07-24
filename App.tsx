// import React from "react";
import { View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { COLORS } from "./styles/globalStyles"; // adjust path

import SplashScreen from "./screens/OnBoardingScreens/SplashScreen";
import OnboardingScreen from "./screens/OnBoardingScreens/OnBoardingScreen";
import SignInScreen from "./screens/Auth/SignInScreen";
import SignUpScreen from "./screens/Auth/SignUpScreen";
import WhoForScreen from "./screens/Auth/WhoForScreen";
import TabNavigator from "./navigation/TabNavigator";
import BPInputScreen from "./screens/Health/BloodPressureTracker";
import WeightTracker from "./screens/Health/Weighttracker";
import KickCounterScreen from "./screens/KickCounterScreen";
import JournalEntryScreen from "./components/JounaryEnteryScreen";
import JournalPreviewScreen from "./components/JournalPreviewScreen";
import JournalPhotoViewerScreen from "./components/JournalPhotoViewerScreen";
import ChatBot from "./screens/ChatBot";
import SyncNowScreen from "./screens/Health/SyncNowFitbitData";
import FamilyTabNavigator from "./navigation/FamilyTabNavigator";
import ArticlesScreen from "./screens/ArticlesScreen";
import ArticleDetailScreen from "./screens/ArticleDetailScreen";

import {
  useFonts,
  WixMadeforDisplay_400Regular,
  WixMadeforDisplay_500Medium,
  WixMadeforDisplay_600SemiBold,
  WixMadeforDisplay_700Bold,
} from "@expo-google-fonts/wix-madefor-display";

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  SignIn: undefined;
  SignUp: { userType: string };
  WhoFor: undefined;
  MainApp: undefined;
  BloodPressure: undefined;
  Weight: undefined;
  KickCounter: undefined;
  journalEntery: {
    journalId?: string;
    title?: string;
    description?: string;
    meta?: string;
    isEdit?: boolean;
  };
  JournalPhotoViewer: {
    imagesByWeek: Record<string, { uri: string; description: string }[]>;
    title: string;
    selectedWeek: string;
  };
  JournalPreview: {
    images: { uri: string; description: string }[];
    title: string;
  };
  ChatBot: undefined;
  FitBitSummary: undefined;
  FamilyApp: undefined;
  Articles: { trimester: string };
  ArticleDetail: {
    title: string;
    description: string;
    readTime: string;
    image: any;
  };
};


const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [fontsLoaded] = useFonts({
    "WixMadeforDisplay-Regular": WixMadeforDisplay_400Regular,
    "WixMadeforDisplay-Medium": WixMadeforDisplay_500Medium,
    "WixMadeforDisplay-SemiBold": WixMadeforDisplay_600SemiBold,
    "WixMadeforDisplay-Bold": WixMadeforDisplay_700Bold,
  });
  
  if (!fontsLoaded) {
    return null; // Or <AppLoading /> if using expo-app-loading
  }
  
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="WhoFor" component={WhoForScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="MainApp" component={TabNavigator} />
          <Stack.Screen name="BloodPressure" component={BPInputScreen} />
          <Stack.Screen name="Weight" component={WeightTracker} />
          <Stack.Screen name="KickCounter" component={KickCounterScreen} />
          <Stack.Screen name="ChatBot" component={ChatBot} />
          <Stack.Screen name="journalEntery" component={JournalEntryScreen} />
          <Stack.Screen name="JournalPreview" component={JournalPreviewScreen} />
          <Stack.Screen name="JournalPhotoViewer" component={JournalPhotoViewerScreen} />
          <Stack.Screen name="FitBitSummary" component={SyncNowScreen} />
          <Stack.Screen name="FamilyApp" component={FamilyTabNavigator} />
          <Stack.Screen name="Articles" component={ArticlesScreen} />
          <Stack.Screen name="ArticleDetail" component={ArticleDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});
