
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
import Header from "./SubHeader";
import CommonButton from "./CommonButton";
import { COLORS,
  EFFECTS,
  RADIUS,
  SPACING,
  TEXT_STYLES,
 } from "../styles/globalStyles";

// const { width } = Dimensions.get("window");

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
  const [imagesByWeek, setImagesByWeek] = useState<Record<string, ImageItem[]>>(
    {}
  );
  const [loading, setLoading] = useState(false);
  const [journalId, setJournalId] = useState<string | null>(
    passedJournalId || null
  );
  const [userID, setUserID] = useState<string | null>(null);
  const weeks = Array.from({ length: 40 }, (_, i) => `Week ${i + 1}`);
  const [selectedWeek, setSelectedWeek] = useState("Week 1");
  const [editableTitle, setEditableTitle] = useState(
    title || "Untitled Journal"
  );

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
              uri: img.url,
              description: img.description || "",
            })) || [];

          const isBabyBump = title?.toLowerCase() === "baby bump";

          if (isBabyBump) {
            const weekMap: Record<string, ImageItem[]> = {};
            loadedImages.forEach((img: ImageItem, i: number) => {
              const week = `Week ${i + 1}`;
              if (!weekMap[week]) {
                weekMap[week] = [img]; // one image per week
              }
            });
            setImagesByWeek(weekMap);
          } else {
            setImagesByWeek({ [selectedWeek]: loadedImages });
          }
        })
        .catch((err) => console.error("Error fetching journal:", err));
    }
  }, [journalId, isEdit]);

  const pickImages = async () => {
    const isBabyBump = title?.toLowerCase() === "baby bump";
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: !isBabyBump,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      const selected = result.assets.map((img) => ({
        uri: img.uri,
        description: "",
      }));

      setImagesByWeek((prev) => {
        if (isBabyBump) {
          // Only one image per week (overwrite)
          return { ...prev, [selectedWeek]: [selected[0]] };
        } else {
          const current = prev[selectedWeek] || [];
          const isEditMode = isEdit && journalId;
          if (isEditMode) {
            // Overwrite in edit mode for non-Baby Bump to prevent stacking
            return { ...prev, [selectedWeek]: [...selected] };
          } else {
            // Append in non-edit mode
            return { ...prev, [selectedWeek]: [...current, ...selected] };
          }
        }
      });
    }
  };

  const updateDescription = (index: number, text: string) => {
    const currentImages = [...(imagesByWeek[selectedWeek] || [])];
    currentImages[index].description = text;
    setImagesByWeek((prev) => ({ ...prev, [selectedWeek]: currentImages }));
  };

  const deleteImage = (index: number) => {
    const updated = [...(imagesByWeek[selectedWeek] || [])];
    updated.splice(index, 1);
    setImagesByWeek((prev) => ({ ...prev, [selectedWeek]: updated }));
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

    const allImages: ImageItem[] = Object.values(imagesByWeek).flat();
    if (!allImages.length) {
      Alert.alert("Please upload at least one image");
      return;
    }

    setLoading(true);

    try {
      const imagePayloads = await Promise.all(
        allImages.map(async (img) => {
          const isRemote = !img.uri.startsWith("file://");

          if (isRemote) {
            return {
              url: img.uri,
              description: img.description || "",
            };
          }

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
        title: editableTitle,
        designTemplate: meta || "Default",
        note,
        journalId,
        isPrivate,
      };

      const res = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/api/journal`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      let data;
      try {
        data = await res.json();
      } catch (jsonErr) {
        const text = await res.text();
        console.error("Unexpected response from server:", text);
        Alert.alert("Server Error", "Unexpected response from the server.");
        setLoading(false);
        return;
      }

      if (!res.ok) {
        Alert.alert("Upload failed", data.error || "Unknown error");
      } else {
        if (!isEdit) setJournalId(data.journal?._id || null);
        Alert.alert(
          isEdit ? "Journal updated!" : "Journal saved successfully!"
        );
        setImagesByWeek({});
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
        {/* week tabs */}
        {title?.toLowerCase() === "baby bump" && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginBottom: 20 }}
          >
            <View style={styles.weekTabRow}>
              {weeks.map((week) => (
                <TouchableOpacity
                  key={week}
                  style={[
                    styles.weekTab,
                    selectedWeek === week && styles.weekTabSelected,
                  ]}
                  onPress={() => setSelectedWeek(week)}
                >
                  <Text
                    style={
                      selectedWeek === week
                        ? styles.weekTabTextSelected
                        : styles.weekTabText
                    }
                  >
                    {week}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        )}

        {allowCustomTitle && (
          <TextInput
            style={{
              fontSize: 15,
              fontWeight: "600",
              marginBottom: 10,
              borderBottomWidth: 1,
              borderBottomColor: "#ccc",
              paddingBottom: 4,
            }}
            placeholder="Enter your journal title"
            value={editableTitle}
            onChangeText={setEditableTitle}
          />
        )}

        <Text style={styles.subHeading}>{description}</Text>

        {/* images */}
        {(imagesByWeek[selectedWeek] || []).map((img, index) => (
          <View key={index} style={styles.imageBlock}>
            <View style={styles.imageContainerLarge}>
              <Image source={{ uri: img.uri }} style={styles.imagePreview} />
              <TouchableOpacity
                style={styles.deleteIcon}
                onPress={() => deleteImage(index)}
              >
                <Ionicons name="close-circle" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
            <Text style={styles.label}>How are you feeling today?</Text>
            <TextInput
              value={img.description}
              onChangeText={(text) => updateDescription(index, text)}
              placeholder="Write a detailed memory or emotion..."
              style={styles.noteInput}
              multiline
              maxLength={200}
              textAlignVertical="top"
            />
          </View>
        ))}

        {/* add image */}
        <TouchableOpacity onPress={pickImages} style={styles.imageAdd}>
          <Ionicons name="add" size={32} color="#aaa" />
        </TouchableOpacity>

        {/* <Text style={styles.label}>How are you feeling today?</Text>
        <TextInput
          style={styles.noteInput}
          multiline
          maxLength={200}
          placeholder="Share your thoughts and emotions..."
          value={note}
          onChangeText={setNote}
        /> */}

        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 15,marginBottom: SPACING.spacing12 }}
        >
          <Text>Keep it Private</Text>
          <Switch
            value={isPrivate}
            onValueChange={setIsPrivate}
            style={{ marginLeft: 10 }}
          />
        </View>

<View style={styles.buttons}>
        {isEdit && Object.values(imagesByWeek).flat().length > 0 && (
          <CommonButton
            label="Preview Journal Video"
            onPress={() => {
              const allImages = Object.values(imagesByWeek).flat();
              navigation.navigate("JournalPreview", {
                images: allImages,
                title,
              });
            }}
          />
        )}
        <CommonButton
          label="View Photos"
          onPress={() =>
            navigation.navigate("JournalPhotoViewer", {
              imagesByWeek,
              title,
              selectedWeek,
            })
          }
        />
        <CommonButton
          label={
            loading ? "Saving..." : isEdit ? "Update Journal" : "Save Journal"
          }
          onPress={handleSave}
        />
        </View>

        {/* <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}></Text>
        </TouchableOpacity> */}
      </ScrollView>
    </>
  );
}
const styles = StyleSheet.create({
  subHeading: {
    ...TEXT_STYLES.bodySmall,
    color: COLORS.gray700,
    marginBottom: SPACING.spacing12,
  },
  weekTabRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.spacing4,
  },
  weekTab: {
    paddingVertical: SPACING.spacing8,
    paddingHorizontal: SPACING.spacing16 + 2,
    backgroundColor: COLORS.gray100,
    borderRadius: RADIUS.xl,
    marginRight: SPACING.spacing8 + 2,
  },
  weekTabSelected: {
    backgroundColor: COLORS.purple100,
  },
  weekTabText: {
    fontSize: 14,
    color: COLORS.gray500,
  },
  weekTabTextSelected: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.white,
  },
  imageBlock: {
    width: "100%",
    marginBottom: SPACING.spacing24,
  },
  imageContainerLarge: {
    width: "100%",
    height: 250,
    borderRadius: RADIUS.xl,
    overflow: "hidden",
    backgroundColor: COLORS.gray100,
    marginBottom: SPACING.spacing12,
  },
  imagePreview: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: RADIUS.xl,
  },
  deleteIcon: {
    position: "absolute",
    top: SPACING.spacing12,
    right: SPACING.spacing12,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: RADIUS.md,
    padding: SPACING.spacing4,
    zIndex: 2,
  },
  imageAdd: {
    width: 90,
    height: 90,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.gray100,
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "dashed",
    borderWidth: 1.5,
    borderColor: COLORS.gray300,
    marginBottom: SPACING.spacing24,
  },
  label: {
    fontSize: 15,
    fontWeight: "500",
    marginBottom: SPACING.spacing12 - 2,
    marginTop: SPACING.spacing16,
    color: COLORS.gray900,
  },
  noteInput: {
    borderWidth: 1,
    borderColor: COLORS.gray300,
    borderRadius: RADIUS.lg,
    padding: SPACING.spacing12,
    minHeight: 110,
    backgroundColor: COLORS.white,
    fontSize: 15,
    color: COLORS.gray900,
  },
  saveButton: {
    backgroundColor: COLORS.purple500,
    padding: SPACING.spacing16,
    borderRadius: RADIUS.xl,
    alignItems: "center",
    marginTop: SPACING.spacing24,
  },
  saveButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "600",
  },
  buttons: {
    gap: SPACING.spacing16,
    width: "100%",
    marginTop: SPACING.spacing4,
  },
});
