import React, { useState } from 'react';
import { View, Text, Button, TextInput, Image, Alert, Switch } from 'react-native';
import { useRoute } from '@react-navigation/native';
import ImageUploader from './ImageUploader';

export default function JournalEntryScreen() {
  const route = useRoute();
  const { title, description, meta } = route.params;

  const [note, setNote] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [image, setImage] = useState(null);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{title}</Text>
      <Text style={{ color: '#666', marginBottom: 10 }}>{description}</Text>

      <View
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          borderStyle: 'dashed',
          height: 150,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
          marginVertical: 20,
        }}
      >
        <ImageUploader/>
      </View>

      <TextInput
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 8,
          padding: 10,
          height: 120,
          textAlignVertical: 'top',
        }}
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

      <Button title="Save Entry" onPress={() => Alert.alert('Saved!')} style={{ marginTop: 20 }} />
    </View>
  );
}
