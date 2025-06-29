import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
  
import SplashScreen from "./screens/OnBoardingScreens/SplashScreen";
import OnboardingScreen from "./screens/OnBoardingScreens/OnBoardingScreen";
import SignInScreen from "./screens/Auth/SignInScreen";
import SignUpScreen from "./screens/Auth/SignUpScreen";
import WhoForScreen from "./screens/Auth/WhoForScreen";
import TabNavigator from "./navigation/TabNavigator";
import BPInputScreen from './screens/Health/BloodPressureTracker';
import WeightTracker from './screens/Health/Weighttracker';
import KickCounterScreen from "./screens/KickCounterScreen";
import JournalEntryScreen from "./components/JounaryEnteryScreen";
import JournalPreviewScreen from "./components/JournalPreviewScreen";
import ChatBot from "./screens/ChatBot";
import SyncNowScreen from "./screens/Health/SyncNowFitbitData";

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
  journalEntery:  {
    journalId?: string;
    title?: string;
    description?: string;
    meta?: string;
    isEdit?: boolean;
  };
  JournalPreview: {
    images: { uri: string; description: string }[];
    title: string;
  };
  ChatBot:undefined;
  FitBitSummary:undefined;
};



const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
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
        <Stack.Screen name="journalEntery" component={JournalEntryScreen}/>
        <Stack.Screen name="JournalPreview" component={JournalPreviewScreen}/>
        <Stack.Screen name="FitBitSummary" component={SyncNowScreen}/>
      </Stack.Navigator>
    </NavigationContainer>

  );
}
