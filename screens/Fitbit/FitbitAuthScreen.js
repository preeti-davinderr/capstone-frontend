import { Buffer } from 'buffer';
import FitbitDataScreen from './FitbitDataScreen';
import {
  makeRedirectUri,
  ResponseType,
  useAuthRequest,
} from 'expo-auth-session';
import { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';

const CLIENT_ID = '23QKK4';
const CLIENT_SECRET = 'bd7b638eb2b56ad437f0bbd9038e8db8'; // ✅ Your actual secret

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
  });

  console.log('📍 Redirect URI:', redirectUri);

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: CLIENT_ID,
      scopes: ['sleep', 'activity', 'profile', 'heartrate'],
      redirectUri,
      responseType: ResponseType.Code,
      usePKCE: true,
      codeChallengeMethod: 'S256',
    },
    discovery
  );

  useEffect(() => {
    const fetchToken = async () => {
      if (response?.type === 'success') {
        const code = response.params.code;
        console.log('🔑 Authorization code:', code);

        const basicAuth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

        try {
          const tokenResponse = await fetch(discovery.tokenEndpoint, {
            method: 'POST',
            headers: {
              Authorization: `Basic ${basicAuth}`,
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
              grant_type: 'authorization_code',
              code,
              redirect_uri: redirectUri,
              client_id: CLIENT_ID,
              code_verifier: request?.codeVerifier || '',
            }).toString(),
          });

          const tokenData = await tokenResponse.json();
          console.log('✅ Token response:', tokenData);

          if (!tokenResponse.ok) {
            throw new Error(tokenData.errors?.[0]?.message || 'Token exchange failed');
          }

          setAccessToken(tokenData.access_token);
        } catch (err) {
          console.error('❌ Token exchange error:', err);
          setError(err.message);
        }
      } else if (response?.type === 'error') {
        setError(response.error || 'Authorization failed');
      }
    };

    fetchToken();
  }, [response]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      {error && <Text style={{ color: 'red', marginBottom: 20 }}>Error: {error}</Text>}
      <Button title="Connect Fitbit" disabled={!request} onPress={() => promptAsync()} />
      {accessToken && (
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontWeight: 'bold' }}>Access Token:</Text>
          <Text numberOfLines={2} selectable>{accessToken}</Text>
          <FitbitDataScreen accessToken={accessToken} />
        </View>
      )}
    </View>
  );
};

export default FitbitAuthScreen;
