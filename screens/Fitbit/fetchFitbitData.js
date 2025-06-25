 const fetchFitbitData = async (accessToken) => {
  const today = new Date();
  const date = today.toISOString().split('T')[0]; // Format: 'YYYY-MM-DD'

  try {
    // 👉 Fetch SLEEP Data
    const sleepResponse = await fetch(`https://api.fitbit.com/1.2/user/-/sleep/date/${date}.json`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const sleepData = await sleepResponse.json();

    // 👉 Fetch STEP Data
    const stepResponse = await fetch(`https://api.fitbit.com/1/user/-/activities/date/${date}.json`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const stepData = await stepResponse.json();

    return {
      sleep: sleepData,
      steps: stepData,
    };
  } catch (error) {
    console.error('Error fetching Fitbit data:', error);
    throw error;
  }
};
