import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import * as AuthSession from "expo-auth-session";
import { Platform } from 'react-native';

WebBrowser.maybeCompleteAuthSession();


export const isAndroid = () => Platform.OS === 'android';

export const useGoogleAuth = () => {
  
  const redirectUri = AuthSession.makeRedirectUri({
    useProxy: true, 
    scheme: "com.khushpreetcapstone.capstonefrontend", 
  }as any);

  console.log("✅ FINAL redirectUri:", redirectUri);

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: isAndroid() ? '88587075672-luumg658dj3akni6vucibec9j1c718hv.apps.googleusercontent.com':'88587075672-ahh9ek707daft1bukgpf69qaki33dp13.apps.googleusercontent.com',
    redirectUri, 
    responseType: "id_token", 
    scopes: ["openid", "profile", "email"], 
  });

  return { request, response, promptAsync };
};


// import { Platform } from "react-native";
// import * as WebBrowser from "expo-web-browser";
// import * as Google from "expo-auth-session/providers/google";
// import { makeRedirectUri } from "expo-auth-session";

// WebBrowser.maybeCompleteAuthSession();

// export const useGoogleAuth = () => {
//   const redirectUri = makeRedirectUri({
//     useProxy: true,
//     native: "capstonefrontend://redirect",
//     path: "redirect",
//   }as any);
//   console.log("✅ Final redirect URI:", redirectUri);

//   const [request, response, promptAsync] = Google.useAuthRequest({
//     clientId: Platform.select({
//       ios: "88587075672-ahh9ek707daft1bukgpf69qaki33dp13.apps.googleusercontent.com",
//       android: "88587075672-luumg658dj3akni6vucibec9j1c718hv.apps.googleusercontent.com",
//       default: "88587075672-l7tj82q29ipc4lspct2mtqucup3ko1rk.apps.googleusercontent.com", // web
//     }),
//     responseType: "code",
//     scopes: ["openid", "profile", "email"],
//     redirectUri,
//   });

//   return { request, response, promptAsync };
// };
