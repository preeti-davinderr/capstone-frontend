// utils/useFirebaseGoogleLogin.ts
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { useEffect } from 'react';
// import { auth } from './firebase'; 
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from './firebaseConfig';

WebBrowser.maybeCompleteAuthSession();

export const useFirebaseGoogleLogin = (onLoginSuccess) => {
    const [request, response, promptAsync] = Google.useAuthRequest({
      expoClientId: '88587075672-l7tj82q29ipc4lspct2mtqucup3ko1rk.apps.googleusercontent.com',
      iosClientId: '88587075672-ahh9ek707daft1bukgpf69qaki33dp13.apps.googleusercontent.com',
      androidClientId: '88587075672-luumg658dj3akni6vucibec9j1c718hv.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
    });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);

      signInWithCredential(auth, credential)
        .then(async (userCred) => {
          const user = userCred.user;

          await AsyncStorage.setItem('token', await user.getIdToken());
          await AsyncStorage.setItem(
            'user',
            JSON.stringify({
              id: user.uid,
              name: user.displayName,
              email: user.email,
            })
          );

          console.log('✅ Logged in with Firebase:', user.email);
          onLoginSuccess();
        })
        .catch((error) => {
          console.error('❌ Firebase login failed', error);
        });
    }
  }, [response]);

  return { request, response, promptAsync };
};
