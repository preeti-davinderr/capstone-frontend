// import * as ImagePicker from 'expo-image-picker';
// import * as FileSystem from 'expo-file-system';
// import { supabase } from '../lib/supabase';
// // import { supabase } from './lib/supabase';

// const pickAndUploadImage = async () => {
//   const result = await ImagePicker.launchImageLibraryAsync({
//     mediaTypes: ImagePicker.MediaTypeOptions.Images,
//     quality: 1,
//     allowsEditing: false,
//   });

//   if (!result.canceled) {
//     const image = result.assets[0];
//     const file = await FileSystem.readAsStringAsync(image.uri, {
//       encoding: FileSystem.EncodingType.Base64,
//     });

//     const fileName = `profile-${Date.now()}.jpg`;

//     const { error } = await supabase.storage
//       .from('images')
//       .upload(fileName, Buffer.from(file, 'base64'), {
//         contentType: 'image/jpeg',
//         upsert: true,
//       });

//     if (error) console.log('Upload Error:', error);
//     else console.log('Uploaded successfully!');
//   }
// };


// import React, { useState, useEffect } from 'react';
// import { Button, Image, View, Alert, ActivityIndicator } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import * as FileSystem from 'expo-file-system';

// export default function ImageUploader() {
//   const [imageUrl, setImageUrl] = useState('');
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     (async () => {
//       const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//       if (status !== 'granted') {
//         Alert.alert('Permission required', 'Please allow access to your photos.');
//       }
//     })();
//   }, []);

//   const getMimeType = (uri) => {
//     const ext = uri.split('.').pop().toLowerCase();
//     switch (ext) {
//       case 'jpg':
//       case 'jpeg':
//         return 'image/jpeg';
//       case 'png':
//         return 'image/png';
//       case 'gif':
//         return 'image/gif';
//       default:
//         return 'application/octet-stream';
//     }
//   };

//   const uploadImage = async () => {
//     try {
//       const result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         quality: 1,
//       });

//       if (result.canceled) return;

//       const file = result.assets[0];
//       const fileUri = file.uri;
//       const fileExt = fileUri.split('.').pop();
//       const contentType = getMimeType(fileUri);
//       const fileName = `image-${Date.now()}.${fileExt}`;

//       setLoading(true);

//       const base64 = await FileSystem.readAsStringAsync(fileUri, {
//         encoding: FileSystem.EncodingType.Base64,
//       });

//       const response = await fetch('http://localhost:5001/api/uploadImage', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ base64, fileName, contentType }),
//       });
      
//       const text = await response.text();
//       console.log('Raw response:', text); // 👈 this helps you see what's wrong
      
//       let data;
//       try {
//         data = JSON.parse(text);
//       } catch (err) {
//         Alert.alert('Server error', 'Invalid response from server:\n' + text);
//         return;
//       }

//       if (!response.ok) {
//         Alert.alert('Upload failed', data.error || 'Unknown error');
//         setLoading(false);
//         return;
//       }

//       setImageUrl(data.publicUrl);
//       setLoading(false);
//     } catch (error) {
//       Alert.alert('Upload error', error.message);
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={{ marginTop: 40, alignItems: 'center' }}>
//       <Button title="Pick and Upload Image" onPress={uploadImage} />
//       {loading && <ActivityIndicator style={{ marginTop: 20 }} />}
//       {imageUrl !== '' && (
//         <Image
//           source={{ uri: imageUrl }}
//           style={{ width: 200, height: 200, marginTop: 20, borderRadius: 10 }}
//         />
//       )}
//     </View>
//   );
// }

import React, { useState, useEffect } from 'react';
import { Button, Image, View, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

export default function ImageUploader() {
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const media = await ImagePicker.requestMediaLibraryPermissionsAsync();
      const camera = await ImagePicker.requestCameraPermissionsAsync();
      if (media.status !== 'granted' || camera.status !== 'granted') {
        Alert.alert('Permission denied', 'Camera and media access are required.');
      }
    })();
  }, []);

  const getMimeType = (uri) => {
    const ext = uri?.split('.').pop().toLowerCase() || '';
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

  const handleImage = async (fromCamera = false) => {
    const result = fromCamera
      ? await ImagePicker.launchCameraAsync({ quality: 1 })
      : await ImagePicker.launchImageLibraryAsync({ quality: 1 });

    if (result.canceled) return;

    const file = result.assets[0];
    const fileUri = file.uri;
    const fileExt = fileUri.split('.').pop();
    const fileName = `image-${Date.now()}.${fileExt || 'jpg'}`;
    const contentType = getMimeType(fileUri);

    const base64 = await FileSystem.readAsStringAsync(fileUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    try {
      setLoading(true);
    //   const res = await fetch('http://localhost:5001/api/uploadImage', {
      const res = await fetch('https://rsinnovates.com/api/uploadImage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ base64, fileName, contentType }),
      });

      const text = await res.text();
      const data = JSON.parse(text);

      if (!res.ok) {
        Alert.alert('Upload failed', data.error || 'Unknown error');
        setLoading(false);
        return;
      }

      setImageUrl(data.publicUrl);
      setLoading(false);
    } catch (err) {
      Alert.alert('Upload error', err.message);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="📸 Take Photo" onPress={() => handleImage(true)} />
      <View style={{ marginVertical: 10 }} />
      <Button title="🖼️ Pick from Gallery" onPress={() => handleImage(false)} />
      {loading && <ActivityIndicator style={{ marginTop: 20 }} />}
      {imageUrl !== '' && (
        <Image source={{ uri: imageUrl }} style={styles.image} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 40, alignItems: 'center' },
  image: { width: 200, height: 200, marginTop: 20, borderRadius: 10 },
});
