
// import React, { useState, useEffect } from 'react';
// import { Button, Image, View, Alert, ActivityIndicator, StyleSheet } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import * as FileSystem from 'expo-file-system';

// export default function ImageUploader() {
//   const [imageUrl, setImageUrl] = useState('');
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     (async () => {
//       const media = await ImagePicker.requestMediaLibraryPermissionsAsync();
//       const camera = await ImagePicker.requestCameraPermissionsAsync();
//       if (media.status !== 'granted' || camera.status !== 'granted') {
//         Alert.alert('Permission denied', 'Camera and media access are required.');
//       }
//     })();
//   }, []);

//   const getMimeType = (uri) => {
//     const ext = uri?.split('.').pop().toLowerCase() || '';
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

//   const handleImage = async (fromCamera = false) => {
//     const result = fromCamera
//       ? await ImagePicker.launchCameraAsync({ quality: 1 })
//       : await ImagePicker.launchImageLibraryAsync({ quality: 1 });

//     if (result.canceled) return;

//     const file = result.assets[0];
//     const fileUri = file.uri;
//     const fileExt = fileUri.split('.').pop();
//     const fileName = `image-${Date.now()}.${fileExt || 'jpg'}`;
//     const contentType = getMimeType(fileUri);

//     const base64 = await FileSystem.readAsStringAsync(fileUri, {
//       encoding: FileSystem.EncodingType.Base64,
//     });

//     try {
//       let description = "test"
//       let title ="NEW JOURNAL"
//       let userID = "68363fabfa6e794d7eac980a"
//       setLoading(true);
//       const res = await fetch('http://localhost:5001/api/journal', {
//       // const res = await fetch('http://localhost:5001/api/uploadImage', {
//       // const res = await fetch('https://rsinnovates.com/api/uploadImage', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ base64, fileName, contentType, description, title, userID }),
//       });

//       const text = await res.text();
//       const data = JSON.parse(text);

//       if (!res.ok) {
//         Alert.alert('Upload failed', data.error || 'Unknown error');
//         setLoading(false);
//         return;
//       }

//       setImageUrl(data.publicUrl);
//       setLoading(false);
//     } catch (err) {
//       Alert.alert('Upload error', err.message);
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Button title="📸 Take Photo" onPress={() => handleImage(true)} />
//       <View style={{ marginVertical: 10 }} />
//       <Button title="🖼️ Pick from Gallery" onPress={() => handleImage(false)} />
//       {loading && <ActivityIndicator style={{ marginTop: 20 }} />}
//       {imageUrl !== '' && (
//         <Image source={{ uri: imageUrl }} style={styles.image} />
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { marginTop: 40, alignItems: 'center' },
//   image: { width: 200, height: 200, marginTop: 20, borderRadius: 10 },
// });

import React, { useState, useEffect } from 'react';
import {
  View,
  Button,
  Image,
  TextInput,
  Alert,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

interface ImageItem {
  uri: string;
  description: string;
}

interface Props {
  userID: string;
  onJournalCreated?: (id: string) => void;
  journalId?: string; // Optional: pass if editing an existing journal
  title?: string;
  designTemplate?: string;
}

const ImageUploader: React.FC<Props> = ({
  userID,
  onJournalCreated,
  journalId: initialJournalId,
  title = 'New Journal',
  designTemplate = 'Default',
}) => {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [journalId, setJournalId] = useState<string | null>(initialJournalId || null);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission required', 'Please allow media access');
      }
    })();
  }, []);

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

  const pickImages = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
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
    const newImages = [...images];
    newImages[index].description = text;
    setImages(newImages);
  };

  const uploadImages = async () => {
    if (images.length === 0) return;

    setLoading(true);

    for (let i = 0; i < images.length; i++) {
      const img = images[i];
      const fileName = `journal/${Date.now()}-${Math.random().toString(36).substring(2)}.jpg`;
      const contentType = getMimeType(img.uri);

      const base64 = await FileSystem.readAsStringAsync(img.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const payload: Record<string, any> = {
        base64,
        fileName,
        contentType,
        userID,
        description: img.description || '',
      };

      if (i === 0 && !journalId) {
        payload.title = title;
        payload.designTemplate = designTemplate;
      }

      if (journalId) {
        payload.journalId = journalId;
      }

      try {
        const res = await fetch('http://localhost:5001/api/journal', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        const text = await res.text();
        const data = JSON.parse(text);

        if (!res.ok) {
          Alert.alert('Upload error', data.error || 'Unknown error');
        } else {
          if (i === 0 && !journalId && data.journal?._id) {
            setJournalId(data.journal._id);
            onJournalCreated?.(data.journal._id);
          }
          console.log(`✅ Uploaded image ${i + 1}`);
        }
      } catch (err: any) {
        Alert.alert('Upload failed', err.message || 'Network error');
      }
    }

    setLoading(false);
    Alert.alert('Upload Complete');
    setImages([]);
  };

  return (
    <View style={{ marginTop: 20 }}>
      <Button title="🖼️ Pick Images" onPress={pickImages} />
      <FlatList
        data={images}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.uri }} style={styles.img} />
            <TextInput
              placeholder="Add description..."
              style={styles.input}
              value={item.description}
              onChangeText={(text) => updateDescription(index, text)}
            />
          </View>
        )}
      />
      {images.length > 0 && (
        <Button title="⬆️ Upload All" onPress={uploadImages} disabled={loading} />
      )}
      {loading && <ActivityIndicator style={{ marginTop: 20 }} />}
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    marginVertical: 10,
    alignItems: 'center',
  },
  img: {
    width: 200,
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    width: 200,
    borderRadius: 6,
    padding: 8,
  },
});

export default ImageUploader;

