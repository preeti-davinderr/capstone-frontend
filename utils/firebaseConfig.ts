import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAHfgjdQt1-c6zdrTI-WuaEn9j9GlKuwtM",
  authDomain: "wndd-8df00.firebaseapp.com",
  projectId: "wndd-8df00",
  storageBucket: "wndd-8df00.firebasestorage.app",
  messagingSenderId: "437665404349",
  appId: "1:437665404349:web:04f94757ceda54104beed4",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);