import { Buffer } from 'buffer';
import FitbitDataScreen from './FitbitDataScreen';
import {
  makeRedirectUri,
  ResponseType,
  useAuthRequest
} from 'expo-auth-session';
import { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';

const CLIENT_ID = '23QKK4';
const CLIENT_SECRET = 'YOUR_CLIENT_SECRET'; // ← Add this

const discovery = {
  authorizationEndpoint: 'https://www.fitbit.com/oauth2/authorize',
  tokenEndpoint: 'https://api.fitbit.com/oauth2/token',
};

const FitbitAuthScreen = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [error, setError] = useState(null);

  
  const redirectUri = makeRedirectUri({
    scheme: 'capstonefrontend',
    path: 'fitbit',
    preferLocalhost: false
    });

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: CLIENT_ID,
      scopes: ['sleep', 'activity', 'profile', 'heartrate'],
      redirectUri,
      responseType: ResponseType.Code,
    },
    discovery
  );

  useEffect(() => {
    const fetchToken = async () => {
      if (response?.type === 'success') {
        const code = response.params.code;
        console.log('🔑 Code:', code);

        const basicAuth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

        try {
          const tokenResponse = await fetch(discovery.tokenEndpoint, {
            method: 'POST',
            headers: {
              'Authorization': `Basic ${basicAuth}`,
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
              clientId: CLIENT_ID,
              grant_type: 'authorization_code',
              redirect_uri: redirectUri,
              code,
            }).toString(),
          });

          const tokenData = await tokenResponse.json();
          console.log('✅ Token Result:', tokenData);

          if (tokenData.access_token) {
            setAccessToken(tokenData.access_token);
          } else {
            setError(JSON.stringify(tokenData));
          }
        } catch (err) {
          console.error('❌ Token exchange error:', err);
          setError(err.message);
        }
      }
    };

    fetchToken();
  }, [response]);


  console.log('📍 Redirect URI:', redirectUri);
  console.log('🔗 Generated Auth URL:', request?.url);

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      {accessToken ? (
        <FitbitDataScreen accessToken={accessToken} />
      ) : (
        <Button title="Connect Fitbit" disabled={!request} onPress={() => promptAsync()} />
      )}
      {accessToken && <Text style={{ marginTop: 20 }}>Token: {accessToken}</Text>}
      {error && <Text style={{ color: 'red', marginTop: 20 }}>{error}</Text>}
    </View>
  );
};

export default FitbitAuthScreen;
