import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Switch,
  Image,
  Alert,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

import Header from "./SubHeader";

interface ImageItem {
  uri: string;
  description: string;
}

export default function JournalEntryScreen({ navigation }: any) {
  const route = useRoute();
  const {
    title,
    allowCustomTitle = false,
    description,
    meta,
    journalId: passedJournalId,
    isEdit = false,
  } = route.params || {};

  const [note, setNote] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [images, setImages] = useState<ImageItem[]>([]);

  const [loading, setLoading] = useState(false);
  const [journalId, setJournalId] = useState<string | null>(
    passedJournalId || null
  );
  const [userID, setUserID] = useState<string | null>(null);

  const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
  const [selectedWeek, setSelectedWeek] = useState('Week 1');
  const [editableTitle, setEditableTitle] = useState(title || "Untitled Journal");

  useEffect(() => {
    const fetchUserID = async () => {
      try {
        const user = await AsyncStorage.getItem("user");
        const parsed = user ? JSON.parse(user) : null;
        setUserID(parsed?.id || null);
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    fetchUserID();
  }, []);

  useEffect(() => {
    if (isEdit && journalId) {
      fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/api/journal/byId?id=${journalId}`
      )
        .then((res) => res.json())
        .then((data) => {
          setNote(data.data?.note || "");
          setIsPrivate(data.data?.isPrivate || false);
          const loadedImages =
            data.data?.images?.map((img: any) => ({
              url: img.url,
              description: img.description || "",
            })) || [];
          setImages(loadedImages);
        })
        .catch((err) => console.error("Error fetching journal:", err));
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
        url: img.uri,
        description: "",
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
    const ext = uri.split(".").pop()?.toLowerCase() || "";
    switch (ext) {
      case "jpg":
      case "jpeg":
        return "image/jpeg";
      case "png":
        return "image/png";
      default:
        return "application/octet-stream";
    }
  };

  const handleSave = async () => {
    if (!userID) {
      Alert.alert(
        "User ID missing",
        "Unable to save journal. Please try again."
      );
      return;
    }

    if (images.length === 0) {
      Alert.alert("Please upload at least one image");
      return;
    }

    setLoading(true);

    try {
      const imagePayloads = await Promise.all(
        images.map(async (img) => {
          const fileName = `journal/${Date.now()}-${Math.random()
            .toString(36)
            .substring(2)}.jpg`;
          const contentType = getMimeType(img.uri);
          const base64 = await FileSystem.readAsStringAsync(img.uri, {
            encoding: FileSystem.EncodingType.Base64,
          });

          return {
            base64,
            fileName,
            contentType,
            description: img.description || "",
          };
        })
      );

      const payload = {
        images: imagePayloads,
        userID,
        title: title || "Untitled Journal",
        designTemplate: meta || "Default",
        note,
        isPrivate,
      };

      const res = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/api/journal${
          isEdit ? "/" + journalId : ""
        }`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const text = await res.text();
      const data = JSON.parse(text);

      if (!res.ok) {
        Alert.alert("Upload failed", data.error || "Unknown error");
      } else {
        if (!isEdit) setJournalId(data.journal?._id || null);
        Alert.alert(
          isEdit ? "Journal updated!" : "Journal saved successfully!"
        );
        setImages([]);
        setNote("");
      }
    } catch (err: any) {
      Alert.alert("Network error", err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header title={editableTitle} />
      <ScrollView style={{ flex: 1, padding: 20 }}>
        <View style={styles.weekTabContainer}>
          {weeks.map((week) => (
            <TouchableOpacity
              key={week}
              style={[styles.weekTab, selectedWeek === week && styles.weekTabSelected]}
              onPress={() => setSelectedWeek(week)}
            >
              <Text
                style={
                  selectedWeek === week ? styles.weekTabTextSelected : styles.weekTabText
                }
              >
                {week}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {allowCustomTitle && (
        <TextInput
          style={{
            fontSize: 15,
            fontWeight: '600',
            marginBottom: 10,
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
            paddingBottom: 4,
          }}
          placeholder="Enter your journal title"
          value={editableTitle}
          onChangeText={setEditableTitle}
        />
      )}
        <Text style={styles.subHeading}>{description}</Text>
  
        <View style={styles.imageGrid}>
          {Array.from({ length: 4 }).map((_, index) => (
            <TouchableOpacity
              key={index}
              style={styles.imagePlaceholder}
              onPress={pickImages}
            >
              {images[index] ? (
                <Image source={{ uri: images[index].uri }} style={styles.gridImage} />
              ) : (
                <Ionicons name="add" size={30} color="#aaa" />
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.cameraButton}>
            <Ionicons name="camera" size={16} color="#fff" />
            <Text style={styles.buttonText}>Take Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.galleryButton} onPress={pickImages}>
            <Ionicons name="image" size={16} color="#fff" />
            <Text style={styles.buttonText}>Gallery</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>How are you feeling today?</Text>
        <TextInput
          style={styles.noteInput}
          multiline
          maxLength={200}
          placeholder="Share your thoughts and emotions..."
          value={note}
          onChangeText={setNote}
        />

        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 15 }}
        >
          <Text>Keep it Private</Text>
          <Switch
            value={isPrivate}
            onValueChange={setIsPrivate}
            style={{ marginLeft: 10 }}
          />
        </View>

        {isEdit && images.length > 0 && (
          <View style={{ marginTop: 10 }}>
            <TouchableOpacity
              style={styles.galleryButton}
              onPress={() => {
                navigation.navigate("JournalPreview", {
                  images,
                  title,
                });
              }}
            >
              <Text style={styles.buttonText}>🎞️ Preview Journal Video</Text>
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>
            {loading ? "Saving..." : isEdit ? "Update Journal" : "Save Journal"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  subHeading: {
    color: "#666",
    marginBottom: 10,
  },
  weekTabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  weekTab: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    backgroundColor: "#eee",
    borderRadius: 20,
  },
  weekTabSelected: {
    backgroundColor: "#B89CFC",
  },
  weekTabText: {
    color: "#666",
  },
  weekTabTextSelected: {
    color: "#fff",
    fontWeight: "bold",
  },
  imageGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 16,
  },
  imagePlaceholder: {
    width: 70,
    height: 70,
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  gridImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  cameraButton: {
    flexDirection: "row",
    backgroundColor: "#A88BFA",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  galleryButton: {
    flexDirection: "row",
    backgroundColor: "#A88BFA",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    marginLeft: 6,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
  noteInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    minHeight: 100,
    textAlignVertical: "top",
    backgroundColor: "#fff",
  },
  saveButton: {
    backgroundColor: "#A88BFA",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});