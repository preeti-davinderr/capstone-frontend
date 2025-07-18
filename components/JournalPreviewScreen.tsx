// import React, { useEffect, useState, useRef } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Dimensions,
//   Animated,
//   Easing,
//   Image,
// } from 'react-native';
// import { useRoute } from '@react-navigation/native';
// import { Audio } from 'expo-av';
// import Header from "./SubHeader";

// const { width } = Dimensions.get('window');

// export default function JournalPreviewScreen() {
//   const route = useRoute();
//   const { images, title } = route.params as {
//     images: { url: string; description: string }[];
//     title: string;
//   };

//   const [index, setIndex] = useState(0);
//   const fadeAnim = useRef(new Animated.Value(0)).current;
//   const scaleAnim = useRef(new Animated.Value(1)).current;
//   const soundRef = useRef<Audio.Sound | null>(null);

//   const animateImage = () => {
//     fadeAnim.setValue(0);
//     scaleAnim.setValue(1);

//     Animated.parallel([
//       Animated.timing(fadeAnim, {
//         toValue: 1,
//         duration: 1000,
//         useNativeDriver: true,
//       }),
//       Animated.timing(scaleAnim, {
//         toValue: 1.05,
//         duration: 3000,
//         easing: Easing.inOut(Easing.ease),
//         useNativeDriver: true,
//       }),
//     ]).start();
//   };

//   useEffect(() => {
//     animateImage();
//     const interval = setInterval(() => {
//       setIndex((prev) => {
//         const next = (prev + 1) % images.length;
//         animateImage();
//         return next;
//       });
//     }, 3500);
//     return () => clearInterval(interval);
//   }, [images]);

//   useEffect(() => {
//     const loadSound = async () => {
//       const { sound } = await Audio.Sound.createAsync(
//         require('../assets/embrace-364091.mp3'),
//         { isLooping: true }
//       );
//       soundRef.current = sound;
//       await sound.playAsync();
//     };

//     loadSound();

//     return () => {
//       if (soundRef.current) {
//         soundRef.current.stopAsync();
//         soundRef.current.unloadAsync();
//       }
//     };
//   }, []);

//   return (
//     <>
//     <Header title={title} />
//     <View style={styles.container}>
//       <Text style={styles.heading}>{title}</Text>

//       <View style={styles.imageWrapper}>
//         <Animated.Image
//          source={{ uri: (images[index]?.uri ?? images[index]?.url) as string }}
//           style={[
//             styles.image,
//             {
//               opacity: fadeAnim,
//               transform: [{ scale: scaleAnim }],
//             },
//           ]}
//         />
//       </View>

//       <Animated.Text style={[styles.caption, { opacity: fadeAnim }]}>
//         {images[index].description}
//       </Animated.Text>
//     </View>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#0a0a0a',
//     alignItems: 'center',
//     paddingTop: 60,
//     paddingHorizontal: 16,
//   },
//   heading: {
//     fontSize: 22,
//     fontWeight: '700',
//     color: '#fff',
//     marginBottom: 16,
//   },
//   imageWrapper: {
//     width: width * 0.9,
//     height: width * 0.9,
//     borderRadius: 20,
//     overflow: 'hidden',
//     marginBottom: 16,
//   },
//   image: {
//     width: '100%',
//     height: '100%',
//     resizeMode: 'cover',
//   },
//   caption: {
//     fontSize: 16,
//     fontStyle: 'italic',
//     color: '#fff',
//     textAlign: 'center',
//     marginTop: 8,
//   },
// });


// import React, { useEffect, useState, useRef } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Dimensions,
//   Animated,
//   Easing,
//   ImageBackground,
// } from 'react-native';
// import { useRoute } from '@react-navigation/native';
// import { Audio } from 'expo-av';
// import Header from "./SubHeader";

// const { width, height } = Dimensions.get('window');

// export default function JournalPreviewScreen() {
//   const route = useRoute();
//   const { images, title } = route.params as {
//     images: { url: string; description: string }[];
//     title: string;
//   };

//   const [index, setIndex] = useState(0);
//   const fadeAnim = useRef(new Animated.Value(0)).current;
//   const scaleAnim = useRef(new Animated.Value(1)).current;
//   const slideAnim = useRef(new Animated.Value(30)).current;
//   const soundRef = useRef<Audio.Sound | null>(null);

//   const animateImage = () => {
//     fadeAnim.setValue(0);
//     scaleAnim.setValue(1);
//     slideAnim.setValue(30);

//     Animated.parallel([
//       Animated.timing(fadeAnim, {
//         toValue: 1,
//         duration: 1000,
//         useNativeDriver: true,
//       }),
//       Animated.timing(scaleAnim, {
//         toValue: 1.05,
//         duration: 3000,
//         easing: Easing.inOut(Easing.ease),
//         useNativeDriver: true,
//       }),
//       Animated.timing(slideAnim, {
//         toValue: 0,
//         duration: 1000,
//         easing: Easing.out(Easing.ease),
//         useNativeDriver: true,
//       }),
//     ]).start();
//   };

//   useEffect(() => {
//     animateImage();
//     const interval = setInterval(() => {
//       setIndex((prev) => {
//         const next = (prev + 1) % images.length;
//         animateImage();
//         return next;
//       });
//     }, 3500);
//     return () => clearInterval(interval);
//   }, [images]);

//   useEffect(() => {
//     const loadSound = async () => {
//       const { sound } = await Audio.Sound.createAsync(
//         require('../assets/embrace-364091.mp3'),
//         { isLooping: true }
//       );
//       soundRef.current = sound;
//       await sound.playAsync();
//     };

//     loadSound();

//     return () => {
//       if (soundRef.current) {
//         soundRef.current.stopAsync();
//         soundRef.current.unloadAsync();
//       }
//     };
//   }, []);

//   return (
//     <>
//       <Header title={title} />
//       <ImageBackground
//         source={{ uri: images[index]?.url || images[index]?.uri }}
//         style={styles.background}
//         blurRadius={20}
//       >
//         <View style={styles.overlay}>
//           <Animated.Text style={[styles.heading, { opacity: fadeAnim }]}> {title} </Animated.Text>

//           <Animated.View
//             style={[styles.imageWrapper, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}
//           >
//             <ImageBackground
//               source={{ uri: images[index]?.url || images[index]?.uri }}
//               style={styles.image}
//               imageStyle={{ borderRadius: 24 }}
//             />
//           </Animated.View>

//           <Animated.Text
//             style={[styles.caption, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}
//           >
//             {images[index].description}
//           </Animated.Text>
//         </View>
//       </ImageBackground>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//     width: width,
//     height: height,
//   },
//   overlay: {
//     flex: 1,
//     alignItems: 'center',
//     paddingTop: 80,
//     paddingHorizontal: 20,
//     backgroundColor: 'rgba(0,0,0,0.4)',
//   },
//   heading: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#fff',
//     marginBottom: 24,
//   },
//   imageWrapper: {
//     width: width * 0.9,
//     height: width * 0.9,
//     borderRadius: 24,
//     overflow: 'hidden',
//     marginBottom: 20,
//     backgroundColor: '#000',
//     shadowColor: '#000',
//     shadowOpacity: 0.3,
//     shadowRadius: 10,
//     shadowOffset: { width: 0, height: 5 },
//     elevation: 5,
//   },
//   image: {
//     width: '100%',
//     height: '100%',
//     resizeMode: 'cover',
//   },
//   caption: {
//     fontSize: 16,
//     fontStyle: 'italic',
//     color: '#eee',
//     textAlign: 'center',
//     paddingHorizontal: 10,
//     marginTop: 10,
//   },
// });


// import React, { useEffect, useState, useRef } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Dimensions,
//   Animated,
//   Easing,
//   ImageBackground,
//   TouchableOpacity,
// } from 'react-native';
// import { useRoute } from '@react-navigation/native';
// import { Audio } from 'expo-av';
// import Header from "./SubHeader";
// import { Ionicons } from '@expo/vector-icons';

// const { width, height } = Dimensions.get('window');

// export default function JournalPreviewScreen() {
//   const route = useRoute();
//   const { images, title } = route.params as {
//     images: { url: string; description: string }[];
//     title: string;
//   };

//   const [index, setIndex] = useState(0);
//   const [isFullScreen, setIsFullScreen] = useState(false);
//   const fadeAnim = useRef(new Animated.Value(0)).current;
//   const scaleAnim = useRef(new Animated.Value(1)).current;
//   const slideAnim = useRef(new Animated.Value(30)).current;
//   const soundRef = useRef<Audio.Sound | null>(null);

//   const animateImage = () => {
//     fadeAnim.setValue(0);
//     scaleAnim.setValue(1);
//     slideAnim.setValue(30);

//     Animated.parallel([
//       Animated.timing(fadeAnim, {
//         toValue: 1,
//         duration: 1000,
//         useNativeDriver: true,
//       }),
//       Animated.timing(scaleAnim, {
//         toValue: 1.05,
//         duration: 3000,
//         easing: Easing.inOut(Easing.ease),
//         useNativeDriver: true,
//       }),
//       Animated.timing(slideAnim, {
//         toValue: 0,
//         duration: 1000,
//         easing: Easing.out(Easing.ease),
//         useNativeDriver: true,
//       }),
//     ]).start();
//   };

//   useEffect(() => {
//     animateImage();
//     const interval = setInterval(() => {
//       setIndex((prev) => {
//         const next = (prev + 1) % images.length;
//         animateImage();
//         return next;
//       });
//     }, 3500);
//     return () => clearInterval(interval);
//   }, [images]);

//   useEffect(() => {
//     const loadSound = async () => {
//       const { sound } = await Audio.Sound.createAsync(
//         require('../assets/embrace-364091.mp3'),
//         { isLooping: true }
//       );
//       soundRef.current = sound;
//       await sound.playAsync();
//     };

//     loadSound();

//     return () => {
//       if (soundRef.current) {
//         soundRef.current.stopAsync();
//         soundRef.current.unloadAsync();
//       }
//     };
//   }, []);

//   return (
//     <>
//       {!isFullScreen && <Header title={title} />}
//       <ImageBackground
//         source={{ uri: images[index]?.url || images[index]?.uri }}
//         style={styles.background}
//         blurRadius={20}
//       >
//         <View style={styles.overlay}>
//           <TouchableOpacity
//             style={styles.fullScreenToggle}
//             onPress={() => setIsFullScreen((prev) => !prev)}
//           >
//             <Ionicons
//               name={isFullScreen ? 'contract' : 'expand'}
//               size={28}
//               color="#fff"
//             />
//           </TouchableOpacity>

//           <Animated.Text style={[styles.heading, { opacity: fadeAnim }]}> {title} </Animated.Text>

//           <Animated.View
//             style={[styles.imageWrapper, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}
//           >
//             <ImageBackground
//               source={{ uri: images[index]?.url || images[index]?.uri }}
//               style={styles.image}
//               imageStyle={{ borderRadius: 24 }}
//             />
//           </Animated.View>

//           <Animated.Text
//             style={[styles.caption, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}
//           >
//             {images[index].description}
//           </Animated.Text>
//         </View>
//       </ImageBackground>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//     width: width,
//     height: height,
//   },
//   overlay: {
//     flex: 1,
//     alignItems: 'center',
//     paddingTop: 80,
//     paddingHorizontal: 20,
//     backgroundColor: 'rgba(0,0,0,0.4)',
//   },
//   fullScreenToggle: {
//     position: 'absolute',
//     top: 40,
//     right: 20,
//     zIndex: 10,
//     padding: 8,
//   },
//   heading: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#fff',
//     marginBottom: 24,
//   },
//   imageWrapper: {
//     width: width * 0.9,
//     height: width * 0.9,
//     borderRadius: 24,
//     overflow: 'hidden',
//     marginBottom: 20,
//     backgroundColor: '#000',
//     shadowColor: '#000',
//     shadowOpacity: 0.3,
//     shadowRadius: 10,
//     shadowOffset: { width: 0, height: 5 },
//     elevation: 5,
//   },
//   image: {
//     width: '100%',
//     height: '100%',
//     resizeMode: 'cover',
//   },
//   caption: {
//     fontSize: 16,
//     fontStyle: 'italic',
//     color: '#eee',
//     textAlign: 'center',
//     paddingHorizontal: 10,
//     marginTop: 10,
//   },
// });


import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
  ImageBackground,
  TouchableOpacity,
  Platform,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useRoute } from '@react-navigation/native';
import { Audio } from 'expo-av';
import Header from "./SubHeader";
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const musicOptions = [
  { label: 'Embrace', value: require('../assets/embrace-364091.mp3') },
  { label: 'Dreamscape', value: require('../assets/dreams-of-peace-252534.mp3') },
  // { label: 'Calm Breeze', value: require('../assets/calm-breeze.mp3') },
];

export default function JournalPreviewScreen() {
  const route = useRoute();
  const { images, title } = route.params as {
    images: { url: string; description: string }[];
    title: string;
  };

  const [index, setIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [selectedMusic, setSelectedMusic] = useState(musicOptions[0].value);
  const [open, setOpen] = useState(false);
  const [musicItems, setMusicItems] = useState(musicOptions);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const soundRef = useRef<Audio.Sound | null>(null);

  const animateImage = () => {
    fadeAnim.setValue(0);
    scaleAnim.setValue(1);
    slideAnim.setValue(30);

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
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        easing: Easing.out(Easing.ease),
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
      if (soundRef.current) {
        await soundRef.current.stopAsync();
        await soundRef.current.unloadAsync();
      }
      const { sound } = await Audio.Sound.createAsync(
        selectedMusic,
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
  }, [selectedMusic]);

  return (
    <>
      {!isFullScreen && <Header title={title} />}
      <ImageBackground
        source={{ uri: images[index]?.url || images[index]?.uri }}
        style={styles.background}
        blurRadius={20}
      >
        <View style={styles.overlay}>
          <TouchableOpacity
            style={styles.fullScreenToggle}
            onPress={() => setIsFullScreen((prev) => !prev)}
          >
            <Ionicons
              name={isFullScreen ? 'contract' : 'expand'}
              size={28}
              color="#fff"
            />
          </TouchableOpacity>

          {/* {!isFullScreen && (
            <DropDownPicker
              open={open}
              value={selectedMusic}
              items={musicItems}
              setOpen={setOpen}
              setValue={setSelectedMusic}
              setItems={setMusicItems}
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
            />
          )} */}

          <Animated.Text style={[styles.heading, { opacity: fadeAnim }]}> {title} </Animated.Text>

          <Animated.View
            style={[styles.imageWrapper, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}
          >
            <ImageBackground
              source={{ uri: images[index]?.url || images[index]?.uri }}
              style={styles.image}
              imageStyle={{ borderRadius: 24 }}
            />
          </Animated.View>

          <Animated.Text
            style={[styles.caption, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}
          >
            {images[index].description}
          </Animated.Text>
        </View>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: width,
    height: height,
  },
  overlay: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 80,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  fullScreenToggle: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 10,
    padding: 8,
  },
  dropdown: {
    width: 200,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    zIndex: 1000,
  },
  dropdownContainer: {
    width: 200,
    zIndex: 1000,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 24,
  },
  imageWrapper: {
    width: width * 0.9,
    height: width * 0.9,
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 20,
    backgroundColor: '#000',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  caption: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#eee',
    textAlign: 'center',
    paddingHorizontal: 10,
    marginTop: 10,
  },
});
