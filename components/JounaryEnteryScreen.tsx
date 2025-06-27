// import React, { useState } from 'react';
// import { View, Text, Button, TextInput, Image, Alert, Switch } from 'react-native';
// import { useRoute } from '@react-navigation/native';
// import ImageUploader from './ImageUploader';

// export default function JournalEntryScreen() {
//   const route = useRoute();
//   const { title, description, meta } = route.params;

//   const [note, setNote] = useState('');
//   const [isPrivate, setIsPrivate] = useState(false);
//   const [image, setImage] = useState(null);

//   return (
//     <View style={{ flex: 1, padding: 20 }}>
//       <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{title}</Text>
//       <Text style={{ color: '#666', marginBottom: 10 }}>{description}</Text>

//       <View
//         style={{
//           borderWidth: 1,
//           borderColor: '#ccc',
//           borderStyle: 'dashed',
//           height: 150,
//           justifyContent: 'center',
//           alignItems: 'center',
//           borderRadius: 10,
//           marginVertical: 20,
//         }}
//       >
//         <ImageUploader/>
//       </View>

//       <TextInput
//         style={{
//           borderWidth: 1,
//           borderColor: '#ccc',
//           borderRadius: 8,
//           padding: 10,
//           height: 120,
//           textAlignVertical: 'top',
//         }}
//         multiline
//         maxLength={200}
//         placeholder="Share your thoughts here..."
//         value={note}
//         onChangeText={setNote}
//       />
//       <Text style={{ textAlign: 'right', marginTop: 5 }}>{note.length}/200</Text>

//       <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
//         <Text>Keep it Private</Text>
//         <Switch value={isPrivate} onValueChange={setIsPrivate} style={{ marginLeft: 10 }} />
//       </View>

//       <Button title="Save Entry" onPress={() => Alert.alert('Saved!')} style={{ marginTop: 20 }} />
//     </View>
//   );
// }


// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   Button,
//   TextInput,
//   Switch,
//   Image,
//   Alert,
//   StyleSheet,
//   ScrollView,
// } from 'react-native';
// import { useRoute } from '@react-navigation/native';
// import * as ImagePicker from 'expo-image-picker';
// import * as FileSystem from 'expo-file-system';

// interface ImageItem {
//   uri: string;
//   description: string;
// }

// export default function JournalEntryScreen() {
//   const route = useRoute();
//   const { title, description, meta } = route.params || {};

//   const [note, setNote] = useState('');
//   const [isPrivate, setIsPrivate] = useState(false);
//   const [images, setImages] = useState<ImageItem[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [journalId, setJournalId] = useState<string | null>(null);

//   const userID = '68363fabfa6e794d7eac980a'; // 👈 Replace with actual auth user ID

//   const pickImages = async () => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       allowsMultipleSelection: true,
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       quality: 1,
//     });

//     if (!result.canceled && result.assets) {
//       const selected = result.assets.map((img) => ({
//         uri: img.uri,
//         description: '',
//       }));
//       setImages((prev) => [...prev, ...selected]);
//     }
//   };

//   const updateDescription = (index: number, text: string) => {
//     const updated = [...images];
//     updated[index].description = text;
//     setImages(updated);
//   };

//   const getMimeType = (uri: string): string => {
//     const ext = uri.split('.').pop()?.toLowerCase() || '';
//     switch (ext) {
//       case 'jpg':
//       case 'jpeg':
//         return 'image/jpeg';
//       case 'png':
//         return 'image/png';
//       default:
//         return 'application/octet-stream';
//     }
//   };

//   const handleSave = async () => {
//     if (images.length === 0) {
//       Alert.alert('Please upload at least one image');
//       return;
//     }
  
//     setLoading(true);
  
//     try {
//       const imagePayloads = await Promise.all(
//         images.map(async (img) => {
//           const fileName = `journal/${Date.now()}-${Math.random().toString(36).substring(2)}.jpg`;
//           const contentType = getMimeType(img.uri);
//           const base64 = await FileSystem.readAsStringAsync(img.uri, {
//             encoding: FileSystem.EncodingType.Base64,
//           });
  
//           return {
//             base64,
//             fileName,
//             contentType,
//             description: img.description || '',
//           };
//         })
//       );
  
//       const payload = {
//         images: imagePayloads,
//         userID,
//         title: title || 'Untitled Journal',
//         designTemplate: meta || 'Default',
//         note,
//         isPrivate,
//       };
  
//       const res = await fetch('http://localhost:5001/api/journal', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload),
//       });
  
//       const text = await res.text();
//       const data = JSON.parse(text);
  
//       if (!res.ok) {
//         Alert.alert('Upload failed', data.error || 'Unknown error');
//       } else {
//         setJournalId(data.journal?._id || null);
//         Alert.alert('Journal saved successfully!');
//         setImages([]);
//         setNote('');
//       }
//     } catch (err: any) {
//       Alert.alert('Network error', err.message || 'Something went wrong');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <ScrollView style={{ flex: 1, padding: 20 }}>
//       <Text style={styles.heading}>{title}</Text>
//       <Text style={styles.subHeading}>{description}</Text>

//       <Button title="📸 Upload Images" onPress={pickImages} />

//       {images.map((img, index) => (
//         <View key={index} style={styles.imageBlock}>
//           <Image source={{ uri: img.uri }} style={styles.image} />
//           <TextInput
//             style={styles.imageDesc}
//             placeholder="Image description..."
//             value={img.description}
//             onChangeText={(text) => updateDescription(index, text)}
//           />
//         </View>
//       ))}

//       <TextInput
//         style={styles.noteBox}
//         multiline
//         maxLength={200}
//         placeholder="Share your thoughts here..."
//         value={note}
//         onChangeText={setNote}
//       />
//       <Text style={{ textAlign: 'right', marginTop: 5 }}>{note.length}/200</Text>

//       <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
//         <Text>Keep it Private</Text>
//         <Switch value={isPrivate} onValueChange={setIsPrivate} style={{ marginLeft: 10 }} />
//       </View>

//       <View style={{ marginTop: 20 }}>
//         <Button title={loading ? 'Saving...' : '💾 Save Journal'} onPress={handleSave} />
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   heading: {
//     fontSize: 22,
//     fontWeight: 'bold',
//   },
//   subHeading: {
//     color: '#666',
//     marginBottom: 10,
//   },
//   imageBlock: {
//     alignItems: 'center',
//     marginVertical: 16,
//   },
//   image: {
//     width: 220,
//     height: 220,
//     borderRadius: 10,
//   },
//   imageDesc: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     padding: 8,
//     marginTop: 8,
//     width: 220,
//   },
//   noteBox: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     padding: 10,
//     height: 120,
//     textAlignVertical: 'top',
//     marginTop: 10,
//   },
// });





import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  Switch,
  Image,
  Alert,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

interface ImageItem {
  uri: string;
  description: string;
}

export default function JournalEntryScreen({ navigation }: any) {
  const route = useRoute();
  const { title, description, meta, journalId: passedJournalId, isEdit = false } = route.params || {};

  const [note, setNote] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [journalId, setJournalId] = useState<string | null>(passedJournalId || null);
// console.log(">>>>>>>", passedJournalId, isEdit);
  const userID = '68363fabfa6e794d7eac980a'; // 👈 Replace with actual auth user ID

  useEffect(() => {
    if (isEdit && journalId) {
      fetch(`http://localhost:5001/api/journal/byId?id=${journalId}`)
        .then((res) => res.json())
        .then((data) => {
          console.log('Fetched journal data>>:', data.data);
          setNote(data.data?.note || '');
          setIsPrivate(data.data?.isPrivate || false);
          const loadedImages = data.data?.images?.map((img: any) => (console.log(img),{
            uri: img.url,
            description: img.description || '',
          })) || [];
          console.log("LOADED IMAGES", loadedImages);
          setImages(loadedImages);
        })
        .catch((err) => console.error('Error fetching journal:', err));
    }
  }, [journalId, isEdit]);

  const pickImages = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      const selected = result.assets.map((img) => ({
        uri: img.uri,
        description: '',
      }));
      setImages((prev) => [...prev, ...selected]);
    }
  };

  const updateDescription = (index: number, text: string) => {
    const updated = [...images];
    updated[index].description = text;
    setImages(updated);
  };

  const deleteImage = (index: number) => {
    const updated = [...images];
    updated.splice(index, 1);
    setImages(updated);
  };

  const getMimeType = (uri: string): string => {
    const ext = uri.split('.').pop()?.toLowerCase() || '';
    switch (ext) {
      case 'jpg':
      case 'jpeg':
        return 'image/jpeg';
      case 'png':
        return 'image/png';
      default:
        return 'application/octet-stream';
    }
  };

  const handleSave = async () => {
    if (images.length === 0) {
      Alert.alert('Please upload at least one image');
      return;
    }

    setLoading(true);

    try {
      const imagePayloads = await Promise.all(
        images.map(async (img) => {
          const fileName = `journal/${Date.now()}-${Math.random().toString(36).substring(2)}.jpg`;
          const contentType = getMimeType(img.uri);
          const base64 = await FileSystem.readAsStringAsync(img.uri, {
            encoding: FileSystem.EncodingType.Base64,
          });

          return {
            base64,
            fileName,
            contentType,
            description: img.description || '',
          };
        })
      );

      const payload = {
        images: imagePayloads,
        userID,
        title: title || 'Untitled Journal',
        designTemplate: meta || 'Default',
        note,
        isPrivate,
      };

      const res = await fetch(`http://localhost:5001/api/journal${isEdit ? '/' + journalId : ''}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const text = await res.text();
      const data = JSON.parse(text);

      if (!res.ok) {
        Alert.alert('Upload failed', data.error || 'Unknown error');
      } else {
        if (!isEdit) setJournalId(data.journal?._id || null);
        Alert.alert(isEdit ? 'Journal updated!' : 'Journal saved successfully!');
        setImages([]);
        setNote('');
      }
    } catch (err: any) {
      Alert.alert('Network error', err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };
console.log("IMAGES", images);
  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      <Text style={styles.heading}>{title}</Text>
      <Text style={styles.subHeading}>{description}</Text>

      <Button title="📸 Upload Images" onPress={pickImages} />

      {images.map((img, index) => (
        <View key={index} style={styles.imageBlock}>
          <Image source={{ uri: img.uri }} style={styles.image} />
          <TextInput
            style={styles.imageDesc}
            placeholder="Image description..."
            value={img.description}
            onChangeText={(text) => updateDescription(index, text)}
          />
          <TouchableOpacity onPress={() => deleteImage(index)}>
            <Text style={styles.deleteText}>❌ Remove</Text>
          </TouchableOpacity>
        </View>
      ))}

      <TextInput
        style={styles.noteBox}
        multiline
        maxLength={200}
        placeholder="Share your thoughts here..."
        value={note}
        onChangeText={setNote}
      />
      <Text style={{ textAlign: 'right', marginTop: 5 }}>{note.length}/200</Text>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
        <Text>Keep it Private</Text>
        <Switch value={isPrivate} onValueChange={setIsPrivate} style={{ marginLeft: 10 }} />
      </View>
      {isEdit && images.length > 0 && (
  <View style={{ marginTop: 10 }}>
    <Button
      title="🎞️ Preview Journal Video"
      onPress={() => {
        navigation.navigate('JournalPreview', {
          images,
          title,
        });
      }}
      color="#007AFF"
    />
  </View>
)}
      <View style={{ marginTop: 20 }}>
        <Button title={loading ? 'Saving...' : isEdit ? '💾 Update Journal' : '💾 Save Journal'} onPress={handleSave} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  subHeading: {
    color: '#666',
    marginBottom: 10,
  },
  imageBlock: {
    alignItems: 'center',
    marginVertical: 16,
  },
  image: {
    width: 220,
    height: 220,
    borderRadius: 10,
  },
  imageDesc: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginTop: 8,
    width: 220,
  },
  deleteText: {
    marginTop: 6,
    color: '#d00',
    fontSize: 12,
  },
  noteBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    height: 120,
    textAlignVertical: 'top',
    marginTop: 10,
  },
});
