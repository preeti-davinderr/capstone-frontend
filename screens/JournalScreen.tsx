import React, { useState, useCallback } from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ImageEntry = {
  url: string;
  description: string;
  addedAt: string;
};

type Journal = {
  _id: string;
  title: string;
  designTemplate: string;
  createdAt: string;
  images: ImageEntry[];
};

export default function JournalScreen({ navigation }: any) {
  const [journals, setJournals] = useState<Journal[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const fetchJournals = async () => {
        try {
          setLoading(true);
          const user = await AsyncStorage.getItem("user");
          const parsed = user ? JSON.parse(user) : null;
          const userId = parsed?.id;

          if (!userId) {
            console.error("User ID not found in AsyncStorage.");
            setLoading(false);
            return;
          }

          const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/journal?id=${userId}`);
          const data = await res.json();
          setJournals(data.data as Journal[]);
        } catch (err) {
          console.error("Error fetching journals:", err);
        } finally {
          setLoading(false);
        }
      };

      fetchJournals();
    }, [])
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>My Journal</Text>
          <Text style={styles.headerSubtitle}>How are you feeling today?</Text>
        </View>
        <View style={styles.notificationIcon}>
          <Ionicons name="notifications-outline" size={24} color="#6A5ACD" />
          <View style={styles.notificationDot} />
        </View>
      </View>

      {/* Get Started Card */}
      <View style={styles.solidCard}>
  <Ionicons name="book" size={32} color="#fff" style={{ marginBottom: 10 }} />
  <Text style={styles.gradientTitle}>Start Your Pregnancy Journey</Text>
  <Text style={styles.gradientSubtitle}>Capture precious moments and memories</Text>
  <TouchableOpacity
    onPress={() => {
      navigation.navigate('journalEntery', {
        title: '',
        allowCustomTitle: true,
        description: 'Track your growing belly week by week',
        meta: '40 weeks',
      });
    }}
    style={styles.getStartedButton}
  >
    <Text style={styles.getStartedText}>Get Started</Text>
  </TouchableOpacity>
</View>

      {/* Active Journals */}
      {journals.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>My Active Journals</Text>
          {journals.map((journal) => (
            <View key={journal._id} style={styles.card}>
              <Ionicons name="book-outline" size={28} color="#6A5ACD" style={styles.cardIcon} />
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{journal.title}</Text>
                <Text style={styles.cardSubtitle}>{journal.designTemplate}</Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('journalEntery', {
                    journalId: journal._id,
                    title: journal.title,
                    description: journal.designTemplate,
                    meta: journal.designTemplate,
                    isEdit: true,
                  });
                }}
                style={styles.cardButton}
              >
                <Text style={styles.cardButtonText}>Open</Text>
              </TouchableOpacity>
            </View>
          ))}
        </>
      )}

      {/* Pre-Designed */}
      <Text style={styles.sectionTitle}>Pre-Designed Journals</Text>
      {journalData.map((item, index) => (
        <View key={index} style={styles.card}>
          {item.icon}
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('journalEntery', {
                title: item.title,
                description: item.subtitle,
                meta: item.meta,
              });
            }}
            style={styles.cardButton}
          >
            <Text style={styles.cardButtonText}>Start</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const journalData = [
  {
    title: "Baby Bump",
    subtitle: "Weekly photo diary",
    meta: "40 weeks",
    icon: <Ionicons name="camera-outline" size={28} color="#6A5ACD" style={{ marginRight: 12 }} />,
  },
  {
    title: "Dear Baby",
    subtitle: "Letters to your little ones",
    meta: "Letters",
    icon: <Entypo name="heart-outlined" size={28} color="#6A5ACD" style={{ marginRight: 12 }} />,
  },
  {
    title: "My Feelings",
    subtitle: "Write heartfelt letters to your baby.",
    meta: "Feelings",
    icon: <Entypo name="emoji-happy" size={28} color="#6A5ACD" style={{ marginRight: 12 }} />,
  },
  {
    title: "First Movements",
    subtitle: "Record those magical first kicks.",
    meta: "Kicks",
    icon: <Entypo name="hand" size={28} color="#6A5ACD" style={{ marginRight: 12 }} />,
  },
];

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#6A5ACD',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#999',
    marginTop: 2,
  },
  notificationIcon: {
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'red',
  },
  gradientCard: {
    borderRadius: 16,
    padding: 24,
    marginBottom: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradientTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 6,
  },
  gradientSubtitle: {
    fontSize: 13,
    color: '#f0f0f0',
    textAlign: 'center',
    marginBottom: 16,
  },
  getStartedButton: {
    backgroundColor: '#fff',
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  getStartedText: {
    color: '#6A5ACD',
    fontWeight: '600',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 1,
  },
  cardIcon: {
    marginRight: 12,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
    color: '#333',
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
  cardButton: {
    backgroundColor: '#6A5ACD',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  cardButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
  },
  solidCard: {
    backgroundColor: '#A18CD1',
    borderRadius: 16,
    padding: 24,
    marginBottom: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
