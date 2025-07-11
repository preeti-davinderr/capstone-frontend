import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
  Image,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Audio } from 'expo-av';

const { width } = Dimensions.get('window');

export default function JournalPreviewScreen() {
  const route = useRoute();
  const { images, title } = route.params as {
    images: { url: string; description: string }[];
    title: string;
  };

  const [index, setIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const soundRef = useRef<Audio.Sound | null>(null);

  const animateImage = () => {
    fadeAnim.setValue(0);
    scaleAnim.setValue(1);

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1.05,
        duration: 3000,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    animateImage();
    const interval = setInterval(() => {
      setIndex((prev) => {
        const next = (prev + 1) % images.length;
        animateImage();
        return next;
      });
    }, 3500);
    return () => clearInterval(interval);
  }, [images]);

  useEffect(() => {
    const loadSound = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/embrace-364091.mp3'),
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

      <View style={styles.imageWrapper}>
        <Animated.Image
         source={{ uri: (images[index]?.uri ?? images[index]?.url) as string }}
          style={[
            styles.image,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        />
      </View>

      <Animated.Text style={[styles.caption, { opacity: fadeAnim }]}>
        {images[index].description}
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 16,
  },
  imageWrapper: {
    width: width * 0.9,
    height: width * 0.9,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  caption: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#fff',
    textAlign: 'center',
    marginTop: 8,
  },
});
