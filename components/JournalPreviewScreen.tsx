import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, Animated } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Audio } from 'expo-av';

const { width } = Dimensions.get('window');

export default function JournalPreviewScreen() {
  const route = useRoute();
  const { images, title } = route.params as {
    images: { uri: string; description: string }[];
    title: string;
  };

  const [index, setIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const soundRef = useRef<Audio.Sound | null>(null);

  // Animate fade in for each image
  const animateImage = () => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  // Start slideshow
  useEffect(() => {
    animateImage();
    const interval = setInterval(() => {
      setIndex((prev) => {
        const next = (prev + 1) % images.length;
        animateImage();
        return next;
      });
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [images]);

  // Load and play background music
  useEffect(() => {
    const loadSound = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/embrace-364091.mp3'), // 🎵 Put your music file in `assets/`
        { isLooping: true }
      );
      soundRef.current = sound;
      await sound.playAsync();
    };

    loadSound();

    return () => {
      if (soundRef.current) {
        soundRef.current.stopAsync();
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{title}</Text>
      <Animated.Image
        source={{ uri: images[index].uri }}
        style={[styles.image, { opacity: fadeAnim }]}
      />
      <Text style={styles.caption}>{images[index].description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    alignItems: 'center',
    paddingTop: 60,
  },
  heading: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    width: width * 0.9,
    height: width * 0.9,
    borderRadius: 16,
    resizeMode: 'cover',
  },
  caption: {
    marginTop: 12,
    color: '#f0f0f0',
    fontSize: 16,
    fontStyle: 'italic',
  },
});
