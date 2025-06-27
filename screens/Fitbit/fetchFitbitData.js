// const fetchFitbitData = async (accessToken) => {
//   const today = new Date();
//   const date = today.toISOString().split('T')[0]; // Format: 'YYYY-MM-DD'

//   try {
//     // 👉 Fetch SLEEP Data
//     const sleepResponse = await fetch(`https://api.fitbit.com/1.2/user/-/sleep/date/${date}.json`, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });
//     const sleepData = await sleepResponse.json();

//     // 👉 Fetch STEP Data
//     const stepResponse = await fetch(`https://api.fitbit.com/1/user/-/activities/date/${date}.json`, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });
//     const stepData = await stepResponse.json();

//     return {
//       sleep: sleepData,
//       steps: stepData,
//     };
//   } catch (error) {
//     console.error('Error fetching Fitbit data:', error);
//     throw error;
//   }
// };

export const fetchFitbitData = async (accessToken) => {
  // const today = new Date().toISOString().split('T')[0];
  // const yesterday = new Date();
  //   yesterday.setDate(yesterday.getDate() - 1);
  //   const date = yesterday.toISOString().split('T')[0];
  const date = '2025-06-25';

  // Sleep
  const sleepRes = await fetch(`https://api.fitbit.com/1.2/user/-/sleep/date/${date}.json`, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });
  const sleep = await sleepRes.json();

  // Steps + Activity
  const activityRes = await fetch(`https://api.fitbit.com/1/user/-/activities/date/${date}.json`, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });
  const activity = await activityRes.json();

  // Heart Rate
  const heartRes = await fetch(`https://api.fitbit.com/1/user/-/activities/heart/date/${date}/1d.json`, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });
  const heart = await heartRes.json();

  return { sleep, activity, heart };
};
