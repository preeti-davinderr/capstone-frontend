import React from 'react';
import { Text } from 'react-native-paper';
import { View, Button } from 'react-native';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons, FontAwesome, MaterialIcons, Entypo } from '@expo/vector-icons';
import CommonButton from '../components/CommonButton';
// import RNFS from 'react-native-fs';
// const imageFolder = `${RNFS.DocumentDirectoryPath}/journal_photos`;
// import { useEffect } from 'react';
// import * as ImagePicker from 'expo-image-picker';

// const ensureImageFolder = async () => {
//   const exists = await RNFS.exists(imageFolder);
//   if (!exists) {
//     await RNFS.mkdir(imageFolder);
//     console.log('📁 journal_photos folder created.');
//   } else {
//     console.log('📁 journal_photos folder already exists.');
//   }
// };

// useEffect(() => {
//   ensureImageFolder();
// }, []);

// const imageFolder = `${RNFS.DocumentDirectoryPath}/journal_photos`;

// const pickImagesAndStore = async () => {
//   // Ask permission
//   const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
//   if (!permissionResult.granted) {
//     alert("Permission to access gallery is required!");
//     return;
//   }

//   // Launch image picker
//   const result = await ImagePicker.launchImageLibraryAsync({
//     mediaTypes: ImagePicker.MediaTypeOptions.Images,
//     allowsMultipleSelection: true, // Expo SDK 49+
//     quality: 1,
//   });

//   if (result.canceled) return;

//   const assets = result.assets || [result]; // support both single/multiple selection

//   // Ensure folder exists
//   const folderExists = await RNFS.exists(imageFolder);
//   if (!folderExists) await RNFS.mkdir(imageFolder);

//   // Copy images
//   await Promise.all(
//     assets.map((asset, index) => {
//       const sourcePath = asset.uri;
//       const destPath = `${imageFolder}/img_${index + 1}.jpg`;
//       return RNFS.copyFile(sourcePath, destPath);
//     })
//   );

//   console.log('✅ Images copied to journal_photos folder.');
// };


export default function JournalScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* <Button title="Select Journal Images" onPress={pickImagesAndStore} /> */}
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.iconPlaceholder} />
        <Text style={styles.headerTitle}>My Journal</Text>
        <Ionicons name="notifications-outline" size={24} color="#333" />
      </View>

      {/* Create New Journal Box */}
      <View style={styles.createBox}>
        <View style={styles.plusCircle}>
          <Text style={styles.plus}>+</Text>
        </View>
        <Text style={styles.createTitle}>Create New Journal</Text>
        <Text style={styles.createSub}>Start documenting your pregnancy journey</Text>

        <CommonButton
          label="Add Journal Book"
          onPress={() => {}}
          style={{ marginTop: 12 }}
        />
      </View>

      {/* My Active Journals */}
      <Text style={styles.sectionTitle}>My Active Journals</Text>
      <View style={styles.activeBox}>
        <FontAwesome name="book" size={28} color="#ccc" />
        <Text style={styles.activeText}>No active journals yet</Text>
        <Text style={styles.activeSub}>Start your first journal to see it here</Text>
      </View>

      {/* Pre-designed Journals */}
      <View style={styles.rowBetween}>
        <Text style={styles.sectionTitle}>Pre-designed Journals</Text>
        <TouchableOpacity><Text style={styles.link}>View All</Text></TouchableOpacity>
      </View>

      {/* Journal Cards */}
      {journalData.map((item, index) => (
        <View key={index} style={styles.card}>
          <View style={styles.cardLeft}>
            {item.icon}
          </View>
          <View style={styles.cardCenter}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
            <View style={styles.metaRow}>
              {item.metaIcon}
              <Text style={styles.metaText}>{item.meta}</Text>
            </View>
          </View>
          <CommonButton
            label="Start"
            onPress={() => {}}
            style={styles.startButton}
          />
        </View>
      ))}
    </ScrollView>
  );
}

const journalData = [
  {
    title: "Baby Bump Diary",
    subtitle: "Track your growing belly week by week",
    meta: "40 weeks",
    icon: <Ionicons name="flower-outline" size={28} color="#aaa" />,
    metaIcon: <Ionicons name="time-outline" size={14} color="#888" />,
  },
  {
    title: "Dear Baby",
    subtitle: "Write loving notes to your baby as they grow.",
    meta: "Events & Photos",
    icon: <FontAwesome name="gift" size={28} color="#aaa" />,
    metaIcon: <Ionicons name="people-outline" size={14} color="#888" />,
  },
  {
    title: "My Body, My Feelings",
    subtitle: "Reflect on how your body and emotions change each week.",
    meta: "Weeks 1–12",
    icon: <Entypo name="leaf" size={28} color="#aaa" />,
    metaIcon: <MaterialIcons name="event" size={14} color="#888" />,
  },
  {
    title: "First Movements",
    subtitle: "Record baby's kicks and movements",
    meta: "Movement Tracker",
    icon: <Entypo name="hand" size={28} color="#aaa" />,
    metaIcon: <Ionicons name="refresh-outline" size={14} color="#888" />,
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
  marginBottom: 16,
  marginTop: 35,
},

headerTitle: {
  fontSize: 18,
  fontWeight: '500',
  textAlign: 'center',
  flex: 1, // Ensures it takes up middle space
},

iconPlaceholder: {
  width: 24, // same as bell icon width
},
  createBox: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 24,
  },
  plusCircle: {
    backgroundColor: '#ddd',
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  plus: {
    fontSize: 24,
    color: '#888',
  },
  createTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  createSub: {
    color: '#666',
    fontSize: 13,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  activeBox: {
    backgroundColor: '#f9f9f9',
    padding: 24,
    alignItems: 'center',
    borderRadius: 12,
    marginBottom: 20,
  },
  activeText: {
    fontSize: 15,
    fontWeight: '500',
    marginTop: 10,
  },
  activeSub: {
    color: '#888',
    fontSize: 13,
    marginTop: 2,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  link: {
    color: '#007AFF',
    fontSize: 13,
  },
  card: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardLeft: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cardCenter: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#555',
    marginTop: 2,
    paddingLeft: 2,
    paddingRight: 8,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  metaText: {
    fontSize: 12,
    color: '#888',
    marginLeft: 4,
  },
  startButton: {
    backgroundColor: '#444',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 6,
    width: 'auto',
  },
});
