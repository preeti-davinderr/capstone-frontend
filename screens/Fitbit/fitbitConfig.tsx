// // screens/Fitbit/Fitbit.tsx
// import React from 'react';
// import FitbitAuthScreen from './FitbitAuthScreen';

// export default function Fitbit() {
//   return <FitbitAuthScreen />;
// }

export const fitbitConfig = {
  clientId: '23QKK4',
  clientSecret: 'bd7b638eb2b56ad437f0bbd9038e8db8',
  scopes: ['activity', 'heartrate', 'sleep', 'profile'],
  redirectUri: 'capstonefrontend://fitbit',
  authorizationEndpoint: 'https://www.fitbit.com/oauth2/authorize',
  tokenEndpoint: 'https://api.fitbit.com/oauth2/token',
};
