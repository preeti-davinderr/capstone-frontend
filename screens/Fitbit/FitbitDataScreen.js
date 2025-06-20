import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const FitbitDataScreen = ({ accessToken }) => {
  const [stepData, setStepData] = useState(null);
  const [distanceData, setDistanceData] = useState(null);
  const [heartData, setHeartData] = useState(null);
  const [sleepData, setSleepData] = useState(null);
  const [error, setError] = useState(null);

  // 📅 Get today's date in yyyy-MM-dd format
  const today = new Date().toISOString().split('T')[0]; // e.g. "2025-06-07"

  useEffect(() => {
    if (!accessToken) return;

    const fetchData = async () => {
      try {
        // 🔍 Activity
        const activityRes = await fetch(`https://api.fitbit.com/1/user/-/activities/date/${today}.json`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const activityJson = await activityRes.json();
        console.log('📊 Activity Data:', activityJson);

        const steps = activityJson?.summary?.steps ?? 'N/A';
        const distance = activityJson?.summary?.distances?.find(d => d.activity === 'total')?.distance ?? 'N/A';

        setStepData(steps);
        setDistanceData(distance);

        // ❤️ Heart
        const heartRes = await fetch(`https://api.fitbit.com/1/user/-/activities/heart/date/${today}/1d.json`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const heartJson = await heartRes.json();
        console.log('❤️ Heart Data:', heartJson);

        const heart = heartJson?.['activities-heart']?.[0] ?? {};
        setHeartData(heart);

        // 😴 Sleep
        const sleepRes = await fetch(`https://api.fitbit.com/1.2/user/-/sleep/date/${today}.json`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const sleepJson = await sleepRes.json();
        console.log('😴 Sleep Data:', sleepJson);

        setSleepData(sleepJson ?? {});
      } catch (err) {
        console.error('❌ Fitbit API error:', err);
        setError('Failed to fetch Fitbit data');
      }
    };

    fetchData();
  }, [accessToken]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>📊 Fitbit Data</Text>
      {error && <Text style={styles.error}>{error}</Text>}

      <Text>👟 Steps: {stepData}</Text>
      <Text>🚶 Distance: {distanceData} km</Text>
      <Text>
        ❤️ Heart Rate: {heartData?.value?.restingHeartRate !== undefined
          ? `${heartData.value.restingHeartRate} bpm`
          : 'N/A'}
      </Text>
      <Text>
        😴 Sleep Duration: {sleepData?.summary?.totalMinutesAsleep !== undefined
          ? `${sleepData.summary.totalMinutesAsleep} mins`
          : 'N/A'}
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default FitbitDataScreen;

