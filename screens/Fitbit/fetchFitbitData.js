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
  const today = new Date();
  const date = today.toISOString().split('T')[0]; // e.g. '2025-06-19'

  try {
    // 💤 Sleep
    const sleepResponse = await fetch(`https://api.fitbit.com/1.2/user/-/sleep/date/${date}.json`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const sleepData = await sleepResponse.json();

    // 🚶 Steps & activity
    const activityResponse = await fetch(`https://api.fitbit.com/1/user/-/activities/date/${date}.json`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const activityData = await activityResponse.json();

    // ❤️ Heart Rate
    const heartResponse = await fetch(`https://api.fitbit.com/1/user/-/activities/heart/date/${date}/1d.json`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const heartData = await heartResponse.json();

    // Extract simplified values for your UI
    const steps = activityData.summary?.steps ?? 0;
    const calories = activityData.summary?.caloriesOut ?? 0;
    const distance = activityData.summary?.distances?.find(d => d.activity === 'total')?.distance ?? 0;
    const sleepMinutes = sleepData?.summary?.totalMinutesAsleep ?? 0;
    const heartRate = heartData['activities-heart']?.[0]?.value?.restingHeartRate ?? '--';

    // Convert sleep to readable time
    const hours = Math.floor(sleepMinutes / 60);
    const minutes = sleepMinutes % 60;
    const sleep = `${hours}h ${minutes}m`;

    return {
      steps,
      sleep,
      heartRate,
      calories,
      distance,
      lastSync: new Date().toLocaleTimeString(), // optional
    };
  } catch (error) {
    console.error('❌ Error fetching Fitbit data:', error);
    throw error;
  }
};
