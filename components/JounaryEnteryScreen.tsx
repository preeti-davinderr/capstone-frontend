// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   Switch,
//   Image,
//   Alert,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Dimensions,
// } from "react-native";
// import { useRoute } from "@react-navigation/native";
// import * as ImagePicker from "expo-image-picker";
// import * as FileSystem from "expo-file-system";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// import { Ionicons } from "@expo/vector-icons";

// const { width } = Dimensions.get("window");

// import Header from "./SubHeader";

// interface ImageItem {
//   uri: string;
//   description: string;
// }

// export default function JournalEntryScreen({ navigation }: any) {
//   const route = useRoute();
//   const {
//     title,
//     allowCustomTitle = false,
//     description,
//     meta,
//     journalId: passedJournalId,
//     isEdit = false,
//   } = route.params || {};

//   const [note, setNote] = useState("");
//   const [isPrivate, setIsPrivate] = useState(false);
//   const [images, setImages] = useState<ImageItem[]>([]);

//   const [loading, setLoading] = useState(false);
//   const [journalId, setJournalId] = useState<string | null>(
//     passedJournalId || null
//   );
//   const [userID, setUserID] = useState<string | null>(null);

//   const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
//   const [selectedWeek, setSelectedWeek] = useState('Week 1');
//   const [editableTitle, setEditableTitle] = useState(title || "Untitled Journal");

//   useEffect(() => {
//     const fetchUserID = async () => {
//       try {
//         const user = await AsyncStorage.getItem("user");
//         const parsed = user ? JSON.parse(user) : null;
//         setUserID(parsed?.id || null);
//       } catch (error) {
//         console.error("Error fetching user ID:", error);
//       }
//     };

//     fetchUserID();
//   }, []);

//   useEffect(() => {
//     if (isEdit && journalId) {
//       fetch(
//         `${process.env.EXPO_PUBLIC_API_URL}/api/journal/byId?id=${journalId}`
//       )
//         .then((res) => res.json())
//         .then((data) => {
//           setNote(data.data?.note || "");
//           setIsPrivate(data.data?.isPrivate || false);
//           const loadedImages =
//             data.data?.images?.map((img: any) => ({
//               url: img.url,
//               description: img.description || "",
//             })) || [];
//           setImages(loadedImages);
//         })
//         .catch((err) => console.error("Error fetching journal:", err));
//     }
//   }, [journalId, isEdit]);

//   const pickImages = async () => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       allowsMultipleSelection: true,
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       quality: 1,
//     });

//     if (!result.canceled && result.assets) {
//       const selected = result.assets.map((img) => ({
//         url: img.uri,
//         description: "",
//       }));
//       setImages((prev) => [...prev, ...selected]);
//     }
//   };

//   const updateDescription = (index: number, text: string) => {
//     const updated = [...images];
//     updated[index].description = text;
//     setImages(updated);
//   };

//   const deleteImage = (index: number) => {
//     const updated = [...images];
//     updated.splice(index, 1);
//     setImages(updated);
//   };

//   const getMimeType = (uri: string): string => {
//     const ext = uri.split(".").pop()?.toLowerCase() || "";
//     switch (ext) {
//       case "jpg":
//       case "jpeg":
//         return "image/jpeg";
//       case "png":
//         return "image/png";
//       default:
//         return "application/octet-stream";
//     }
//   };

//   const handleSave = async () => {
//     if (!userID) {
//       Alert.alert(
//         "User ID missing",
//         "Unable to save journal. Please try again."
//       );
//       return;
//     }

//     if (images.length === 0) {
//       Alert.alert("Please upload at least one image");
//       return;
//     }

//     setLoading(true);

//     try {
//       const imagePayloads = await Promise.all(
//         images.map(async (img) => {
//           const fileName = `journal/${Date.now()}-${Math.random()
//             .toString(36)
//             .substring(2)}.jpg`;
//           const contentType = getMimeType(img.uri);
//           const base64 = await FileSystem.readAsStringAsync(img.uri, {
//             encoding: FileSystem.EncodingType.Base64,
//           });

//           return {
//             base64,
//             fileName,
//             contentType,
//             description: img.description || "",
//           };
//         })
//       );

//       const payload = {
//         images: imagePayloads,
//         userID,
//         title: title || "Untitled Journal",
//         designTemplate: meta || "Default",
//         note,
//         isPrivate,
//       };

//       const res = await fetch(
//         `${process.env.EXPO_PUBLIC_API_URL}/api/journal${
//           isEdit ? "/" + journalId : ""
//         }`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(payload),
//         }
//       );

//       const text = await res.text();
//       const data = JSON.parse(text);

//       if (!res.ok) {
//         Alert.alert("Upload failed", data.error || "Unknown error");
//       } else {
//         if (!isEdit) setJournalId(data.journal?._id || null);
//         Alert.alert(
//           isEdit ? "Journal updated!" : "Journal saved successfully!"
//         );
//         setImages([]);
//         setNote("");
//       }
//     } catch (err: any) {
//       Alert.alert("Network error", err.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <Header title={editableTitle} />
//       <ScrollView style={{ flex: 1, padding: 20 }}>
//         <View style={styles.weekTabContainer}>
//           {weeks.map((week) => (
//             <TouchableOpacity
//               key={week}
//               style={[styles.weekTab, selectedWeek === week && styles.weekTabSelected]}
//               onPress={() => setSelectedWeek(week)}
//             >
//               <Text
//                 style={
//                   selectedWeek === week ? styles.weekTabTextSelected : styles.weekTabText
//                 }
//               >
//                 {week}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>
//         {allowCustomTitle && (
//         <TextInput
//           style={{
//             fontSize: 15,
//             fontWeight: '600',
//             marginBottom: 10,
//             borderBottomWidth: 1,
//             borderBottomColor: '#ccc',
//             paddingBottom: 4,
//           }}
//           placeholder="Enter your journal title"
//           value={editableTitle}
//           onChangeText={setEditableTitle}
//         />
//       )}
//         <Text style={styles.subHeading}>{description}</Text>

//         <View style={styles.imageGrid}>
//           {Array.from({ length: 4 }).map((_, index) => (
//             <TouchableOpacity
//               key={index}
//               style={styles.imagePlaceholder}
//               onPress={pickImages}
//             >
//               {images[index] ? (
//                 <Image source={{ uri: images[index].uri }} style={styles.gridImage} />
//               ) : (
//                 <Ionicons name="add" size={30} color="#aaa" />
//               )}
//             </TouchableOpacity>
//           ))}
//         </View>

//         <View style={styles.buttonRow}>
//           <TouchableOpacity style={styles.cameraButton}>
//             <Ionicons name="camera" size={16} color="#fff" />
//             <Text style={styles.buttonText}>Take Photo</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.galleryButton} onPress={pickImages}>
//             <Ionicons name="image" size={16} color="#fff" />
//             <Text style={styles.buttonText}>Gallery</Text>
//           </TouchableOpacity>
//         </View>

//         <Text style={styles.label}>How are you feeling today?</Text>
//         <TextInput
//           style={styles.noteInput}
//           multiline
//           maxLength={200}
//           placeholder="Share your thoughts and emotions..."
//           value={note}
//           onChangeText={setNote}
//         />

//         <View
//           style={{ flexDirection: "row", alignItems: "center", marginTop: 15 }}
//         >
//           <Text>Keep it Private</Text>
//           <Switch
//             value={isPrivate}
//             onValueChange={setIsPrivate}
//             style={{ marginLeft: 10 }}
//           />
//         </View>

//         {isEdit && images.length > 0 && (
//           <View style={{ marginTop: 10 }}>
//             <TouchableOpacity
//               style={styles.galleryButton}
//               onPress={() => {
//                 navigation.navigate("JournalPreview", {
//                   images,
//                   title,
//                 });
//               }}
//             >
//               <Text style={styles.buttonText}>🎞️ Preview Journal Video</Text>
//             </TouchableOpacity>
//           </View>
//         )}

//         <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
//           <Text style={styles.saveButtonText}>
//             {loading ? "Saving..." : isEdit ? "Update Journal" : "Save Journal"}
//           </Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   subHeading: {
//     color: "#666",
//     marginBottom: 10,
//   },
//   weekTabContainer: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     marginBottom: 20,
//   },
//   weekTab: {
//     paddingVertical: 6,
//     paddingHorizontal: 16,
//     backgroundColor: "#eee",
//     borderRadius: 20,
//   },
//   weekTabSelected: {
//     backgroundColor: "#B89CFC",
//   },
//   weekTabText: {
//     color: "#666",
//   },
//   weekTabTextSelected: {
//     color: "#fff",
//     fontWeight: "bold",
//   },
//   imageGrid: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginVertical: 16,
//   },
//   imagePlaceholder: {
//     width: 70,
//     height: 70,
//     backgroundColor: "#f1f1f1",
//     borderRadius: 10,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   gridImage: {
//     width: 70,
//     height: 70,
//     borderRadius: 10,
//   },
//   buttonRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 16,
//   },
//   cameraButton: {
//     flexDirection: "row",
//     backgroundColor: "#A88BFA",
//     padding: 10,
//     borderRadius: 8,
//     alignItems: "center",
//   },
//   galleryButton: {
//     flexDirection: "row",
//     backgroundColor: "#A88BFA",
//     padding: 10,
//     borderRadius: 8,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   buttonText: {
//     color: "#fff",
//     marginLeft: 6,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: "500",
//     marginBottom: 8,
//   },
//   noteInput: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 10,
//     padding: 10,
//     minHeight: 100,
//     textAlignVertical: "top",
//     backgroundColor: "#fff",
//   },
//   saveButton: {
//     backgroundColor: "#A88BFA",
//     padding: 14,
//     borderRadius: 12,
//     alignItems: "center",
//     marginTop: 20,
//   },
//   saveButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
// });

// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   Switch,
//   Image,
//   Alert,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Dimensions,
// } from "react-native";
// import { useRoute } from "@react-navigation/native";
// import * as ImagePicker from "expo-image-picker";
// import * as FileSystem from "expo-file-system";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Ionicons } from "@expo/vector-icons";
// import Header from "./SubHeader";

// const { width } = Dimensions.get("window");

// interface ImageItem {
//   uri: string;
//   description: string;
// }

// export default function JournalEntryScreen({ navigation }: any) {
//   const route = useRoute();
//   const {
//     title,
//     allowCustomTitle = false,
//     description,
//     meta,
//     journalId: passedJournalId,
//     isEdit = false,
//   } = route.params || {};

//   const [note, setNote] = useState("");
//   const [isPrivate, setIsPrivate] = useState(false);
//   const [imagesByWeek, setImagesByWeek] = useState<Record<string, ImageItem[]>>({});
//   const [loading, setLoading] = useState(false);
//   const [journalId, setJournalId] = useState<string | null>(passedJournalId || null);
//   const [userID, setUserID] = useState<string | null>(null);
//   const weeks = Array.from({ length: 40 }, (_, i) => `Week ${i + 1}`);
//   const [selectedWeek, setSelectedWeek] = useState("Week 1");
//   const [editableTitle, setEditableTitle] = useState(title || "Untitled Journal");

//   useEffect(() => {
//     const fetchUserID = async () => {
//       try {
//         const user = await AsyncStorage.getItem("user");
//         const parsed = user ? JSON.parse(user) : null;
//         setUserID(parsed?.id || null);
//       } catch (error) {
//         console.error("Error fetching user ID:", error);
//       }
//     };
//     fetchUserID();
//   }, []);

//   useEffect(() => {
//     if (isEdit && journalId) {
//       fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/journal/byId?id=${journalId}`)
//         .then((res) => res.json())
//         .then((data) => {
//           setNote(data.data?.note || "");
//           setIsPrivate(data.data?.isPrivate || false);
//           const loadedImages =
//             data.data?.images?.map((img: any) => ({
//               uri: img.url,
//               description: img.description || "",
//             })) || [];

//           const isBabyBump = title?.toLowerCase() === "baby bump";

//           if (isBabyBump) {
//             const weekMap: Record<string, ImageItem[]> = {};
//             loadedImages.forEach((img: ImageItem, i: number) => {
//               const week = `Week ${i + 1}`;
//               if (!weekMap[week]) {
//                 weekMap[week] = [img]; // one image per week
//               }
//             });
//             setImagesByWeek(weekMap);
//           } else {
//             setImagesByWeek({ [selectedWeek]: loadedImages });
//           }
//         })
//         .catch((err) => console.error("Error fetching journal:", err));
//     }
//   }, [journalId, isEdit]);

//   const pickImages = async () => {
//     const isBabyBump = title?.toLowerCase() === "baby bump";
//     const result = await ImagePicker.launchImageLibraryAsync({
//       allowsMultipleSelection: !isBabyBump,
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       quality: 1,
//     });

//     if (!result.canceled && result.assets) {
//       const selected = result.assets.map((img) => ({
//         uri: img.uri,
//         description: "",
//       }));

//       setImagesByWeek((prev) => {
//         const current = prev[selectedWeek] || [];

//         if (isBabyBump) {
//           // Only one image allowed per week
//           return { ...prev, [selectedWeek]: [selected[0]] };
//         } else {
//           return { ...prev, [selectedWeek]: [...current, ...selected] };
//         }
//       });
//     }
//   };

//   const updateDescription = (index: number, text: string) => {
//     const currentImages = [...(imagesByWeek[selectedWeek] || [])];
//     currentImages[index].description = text;
//     setImagesByWeek((prev) => ({ ...prev, [selectedWeek]: currentImages }));
//   };

//   const deleteImage = (index: number) => {
//     const updated = [...(imagesByWeek[selectedWeek] || [])];
//     updated.splice(index, 1);
//     setImagesByWeek((prev) => ({ ...prev, [selectedWeek]: updated }));
//   };

//   const getMimeType = (uri: string): string => {
//     const ext = uri.split(".").pop()?.toLowerCase() || "";
//     switch (ext) {
//       case "jpg":
//       case "jpeg":
//         return "image/jpeg";
//       case "png":
//         return "image/png";
//       default:
//         return "application/octet-stream";
//     }
//   };

//   const handleSave = async () => {
//     if (!userID) {
//       Alert.alert("User ID missing", "Unable to save journal. Please try again.");
//       return;
//     }

//     const allImages: ImageItem[] = Object.values(imagesByWeek).flat();
//     if (!allImages.length) {
//       Alert.alert("Please upload at least one image");
//       return;
//     }

//     setLoading(true);

//     try {
//       const imagePayloads = await Promise.all(
//         allImages.map(async (img) => {
//           const isRemote = !img.uri.startsWith("file://");

//           if (isRemote) {
//             return {
//               url: img.uri,
//               description: img.description || "",
//             };
//           }

//           const fileName = `journal/${Date.now()}-${Math.random().toString(36).substring(2)}.jpg`;
//           const contentType = getMimeType(img.uri);
//           const base64 = await FileSystem.readAsStringAsync(img.uri, {
//             encoding: FileSystem.EncodingType.Base64,
//           });

//           return {
//             base64,
//             fileName,
//             contentType,
//             description: img.description || "",
//           };
//         })
//       );

//       const payload = {
//         images: imagePayloads,
//         userID,
//         title: editableTitle,
//         designTemplate: meta || "Default",
//         note,
//         journalId,
//         isPrivate,
//       };

//       const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/journal`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       let data;
//       try {
//         data = await res.json();
//       } catch (jsonErr) {
//         const text = await res.text();
//         console.error("Unexpected response from server:", text);
//         Alert.alert("Server Error", "Unexpected response from the server.");
//         setLoading(false);
//         return;
//       }

//       if (!res.ok) {
//         Alert.alert("Upload failed", data.error || "Unknown error");
//       } else {
//         if (!isEdit) setJournalId(data.journal?._id || null);
//         Alert.alert(isEdit ? "Journal updated!" : "Journal saved successfully!");
//         setImagesByWeek({});
//         setNote("");
//       }
//     } catch (err: any) {
//       Alert.alert("Network error", err.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };
// console.log("imagesByWeek[selectedWeek] =>", imagesByWeek[selectedWeek])
//   return (
//     <>
//       <Header title={editableTitle} />
//       <ScrollView style={{ flex: 1, padding: 20 }}>
//         {title?.toLowerCase() === "baby bump" && (
//           <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 20 }}>
//             <View style={styles.weekTabRow}>
//               {weeks.map((week) => (
//                 <TouchableOpacity
//                   key={week}
//                   style={[styles.weekTab, selectedWeek === week && styles.weekTabSelected]}
//                   onPress={() => setSelectedWeek(week)}
//                 >
//                   <Text style={selectedWeek === week ? styles.weekTabTextSelected : styles.weekTabText}>
//                     {week}
//                   </Text>
//                 </TouchableOpacity>
//               ))}
//             </View>
//           </ScrollView>
//         )}

//         {allowCustomTitle && (
//           <TextInput
//             style={{
//               fontSize: 15,
//               fontWeight: "600",
//               marginBottom: 10,
//               borderBottomWidth: 1,
//               borderBottomColor: "#ccc",
//               paddingBottom: 4,
//             }}
//             placeholder="Enter your journal title"
//             value={editableTitle}
//             onChangeText={setEditableTitle}
//           />
//         )}

//         <Text style={styles.subHeading}>{description}</Text>

//         <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 16 }}>
//           <View style={styles.previewRow}>
//             {/* {(imagesByWeek[selectedWeek] || []).map((img, index) => (
//               <View key={index} style={styles.imageWithCaption}>
//                 <View style={styles.imageContainer}>
//                   <Image source={{ uri: img.uri }} style={styles.imagePreview} />
//                   <TouchableOpacity style={styles.deleteIcon} onPress={() => deleteImage(index)}>
//                     <Ionicons name="close-circle" size={20} color="#fff" />
//                   </TouchableOpacity>
//                 </View>
//                 <TextInput
//                   value={img.description}
//                   placeholder="Description..."
//                   style={styles.imageDescription}
//                   onChangeText={(text) => updateDescription(index, text)}
//                 />
//               </View>
//             ))} */}
//             {(imagesByWeek[selectedWeek] || []).map((img, index) => (
//   <View key={index} style={styles.imageBlock}>
//     <View style={styles.imageContainerLarge}>
//       <Image source={{ uri: img.uri }} style={styles.imagePreview} />
//       <TouchableOpacity style={styles.deleteIcon} onPress={() => deleteImage(index)}>
//         <Ionicons name="close-circle" size={24} color="#fff" />
//       </TouchableOpacity>
//     </View>
//     <TextInput
//       value={img.description}
//       onChangeText={(text) => updateDescription(index, text)}
//       placeholder="Write a detailed memory or emotion..."
//       style={styles.imageDescriptionLarge}
//       multiline
//       textAlignVertical="top"
//     />
//   </View>
// ))}

//             <TouchableOpacity onPress={pickImages} style={styles.imageAdd}>
//               <Ionicons name="add" size={32} color="#aaa" />
//             </TouchableOpacity>
//           </View>
//         </ScrollView>

//         <View style={styles.buttonRow}>
//           <TouchableOpacity style={styles.cameraButton}>
//             <Ionicons name="camera" size={16} color="#fff" />
//             <Text style={styles.buttonText}>Take Photo</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.galleryButton} onPress={pickImages}>
//             <Ionicons name="image" size={16} color="#fff" />
//             <Text style={styles.buttonText}>Gallery</Text>
//           </TouchableOpacity>
//         </View>

//         <Text style={styles.label}>How are you feeling today?</Text>
//         <TextInput
//           style={styles.noteInput}
//           multiline
//           maxLength={200}
//           placeholder="Share your thoughts and emotions..."
//           value={note}
//           onChangeText={setNote}
//         />

//         <View style={{ flexDirection: "row", alignItems: "center", marginTop: 15 }}>
//           <Text>Keep it Private</Text>
//           <Switch value={isPrivate} onValueChange={setIsPrivate} style={{ marginLeft: 10 }} />
//         </View>

//         {isEdit && Object.values(imagesByWeek).flat().length > 0 && (
//   <View style={{ marginTop: 10 }}>
//     <TouchableOpacity
//       style={styles.galleryButton}
//       onPress={() => {
//         const allImages = Object.values(imagesByWeek).flat();
//         navigation.navigate("JournalPreview", {
//           images: allImages,
//           title,
//         });
//       }}
//     >
//       <Text style={styles.buttonText}>🎞️ Preview Journal Video</Text>
//     </TouchableOpacity>
//   </View>
// )}
// <TouchableOpacity
//   style={styles.galleryButton}
//   onPress={() =>
//     navigation.navigate("JournalPhotoViewer", {
//       imagesByWeek,
//       title,
//       selectedWeek,
//     })
//   }
// >
//   <Text style={styles.buttonText}>📷 View Photos</Text>
// </TouchableOpacity>

//         <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
//           <Text style={styles.saveButtonText}>
//             {loading ? "Saving..." : isEdit ? "Update Journal" : "Save Journal"}
//           </Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   subHeading: {
//     color: "#666",
//     marginBottom: 10,
//   },
//   weekTabRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 4,
//   },
//   weekTab: {
//     paddingVertical: 6,
//     paddingHorizontal: 16,
//     backgroundColor: "#eee",
//     borderRadius: 20,
//     marginRight: 8,
//   },
//   weekTabSelected: {
//     backgroundColor: "#B89CFC",
//   },
//   weekTabText: {
//     color: "#666",
//   },
//   weekTabTextSelected: {
//     color: "#fff",
//     fontWeight: "bold",
//   },
//   previewRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 12,
//   },
//   imageContainer: {
//     width: 90,
//     height: 90,
//     borderRadius: 12,
//     overflow: "hidden",
//     backgroundColor: "#eee",
//     position: "relative",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   imagePreview: {
//     width: "100%",
//     height: "100%",
//     resizeMode: "cover",
//     borderRadius: 12,
//   },
//   deleteIcon: {
//     position: "absolute",
//     top: 4,
//     right: 4,
//     backgroundColor: "rgba(0,0,0,0.5)",
//     borderRadius: 10,
//     padding: 2,
//     zIndex: 2,
//   },
//   imageAdd: {
//     width: 90,
//     height: 90,
//     borderRadius: 12,
//     backgroundColor: "#f2f2f2",
//     justifyContent: "center",
//     alignItems: "center",
//     borderStyle: "dashed",
//     borderWidth: 1.5,
//     borderColor: "#ccc",
//   },
//   buttonRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 16,
//   },
//   cameraButton: {
//     flexDirection: "row",
//     backgroundColor: "#A88BFA",
//     padding: 10,
//     borderRadius: 8,
//     alignItems: "center",
//   },
//   galleryButton: {
//     flexDirection: "row",
//     backgroundColor: "#A88BFA",
//     padding: 10,
//     borderRadius: 8,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   buttonText: {
//     color: "#fff",
//     marginLeft: 6,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: "500",
//     marginBottom: 8,
//   },
//   noteInput: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 10,
//     padding: 10,
//     minHeight: 100,
//     textAlignVertical: "top",
//     backgroundColor: "#fff",
//   },
//   saveButton: {
//     backgroundColor: "#A88BFA",
//     padding: 14,
//     borderRadius: 12,
//     alignItems: "center",
//     marginTop: 20,
//   },
//   saveButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   imageWithCaption: {
//     alignItems: "center",
//     marginRight: 12,
//     width: 90,
//   },
//   imageDescription: {
//     fontSize: 12,
//     color: "#555",
//     marginTop: 4,
//     paddingHorizontal: 4,
//     textAlign: "center",
//     width: "100%",
//   },
//   imageBlock: {
//     width: "100%",
//     marginBottom: 24,
//   },

//   imageContainerLarge: {
//     width: "100%",
//     height: 240,
//     borderRadius: 14,
//     overflow: "hidden",
//     backgroundColor: "#f2f2f2",
//     marginBottom: 10,
//   },

//   imageDescriptionLarge: {
//     minHeight: 60,
//     maxHeight: 140,
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     padding: 10,
//     fontSize: 14,
//     color: "#333",
//   },
// });

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
import { SPACING } from "../styles/globalStyles";

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
          style={{ flexDirection: "row", alignItems: "center", marginTop: 15 }}
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
            label="🎞️ Preview Journal Video"
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
          label="📷 View Photos"
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
    color: "#666",
    fontSize: 14,
    marginBottom: 12,
  },
  weekTabRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  weekTab: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    backgroundColor: "#f0f0f0",
    borderRadius: 18,
    marginRight: 10,
  },
  weekTabSelected: {
    backgroundColor: "#B89CFC",
  },
  weekTabText: {
    color: "#666",
    fontSize: 14,
  },
  weekTabTextSelected: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  imageBlock: {
    width: "100%",
    marginBottom: 24,
  },
  imageContainerLarge: {
    width: "100%",
    height: 250,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#f8f8f8",
    marginBottom: 10,
  },
  imagePreview: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 16,
  },
  deleteIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 14,
    padding: 6,
    zIndex: 2,
  },
  imageDescriptionLarge: {
    minHeight: 70,
    maxHeight: 160,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 14,
    fontSize: 15,
    color: "#333",
  },
  imageAdd: {
    width: 90,
    height: 90,
    borderRadius: 14,
    backgroundColor: "#f3f3f3",
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "dashed",
    borderWidth: 1.5,
    borderColor: "#bbb",
    marginBottom: 24,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  cameraButton: {
    flexDirection: "row",
    backgroundColor: "#A88BFA",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  galleryButton: {
    flexDirection: "row",
    backgroundColor: "#A88BFA",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "500",
    marginLeft: 6,
  },
  label: {
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 10,
    marginTop: 16,
    color: "#333",
  },
  noteInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 12,
    minHeight: 110,
    textAlignVertical: "top",
    backgroundColor: "#fff",
    fontSize: 15,
  },
  saveButton: {
    backgroundColor: "#A88BFA",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 24,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  buttons: {
    gap: SPACING.spacing16,
    width: "100%",
    marginTop:SPACING.spacing4,
  },
});

// const styles = StyleSheet.create({
//   subHeading: {
//     color: "#666",
//     marginBottom: 10,
//   },
//   weekTabRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 4,
//   },
//   weekTab: {
//     paddingVertical: 6,
//     paddingHorizontal: 16,
//     backgroundColor: "#eee",
//     borderRadius: 20,
//     marginRight: 8,
//   },
//   weekTabSelected: {
//     backgroundColor: "#B89CFC",
//   },
//   weekTabText: {
//     color: "#666",
//   },
//   weekTabTextSelected: {
//     color: "#fff",
//     fontWeight: "bold",
//   },
//   imageBlock: {
//     width: "100%",
//     marginBottom: 24,
//   },
//   imageContainerLarge: {
//     width: "100%",
//     height: 240,
//     borderRadius: 14,
//     overflow: "hidden",
//     backgroundColor: "#f2f2f2",
//     marginBottom: 10,
//   },
//   imagePreview: {
//     width: "100%",
//     height: "100%",
//     resizeMode: "cover",
//     borderRadius: 14,
//   },
//   deleteIcon: {
//     position: "absolute",
//     top: 8,
//     right: 8,
//     backgroundColor: "rgba(0,0,0,0.5)",
//     borderRadius: 12,
//     padding: 4,
//     zIndex: 2,
//   },
//   imageDescriptionLarge: {
//     minHeight: 60,
//     maxHeight: 140,
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     padding: 10,
//     fontSize: 14,
//     color: "#333",
//   },
//   imageAdd: {
//     width: 90,
//     height: 90,
//     borderRadius: 12,
//     backgroundColor: "#f2f2f2",
//     justifyContent: "center",
//     alignItems: "center",
//     borderStyle: "dashed",
//     borderWidth: 1.5,
//     borderColor: "#ccc",
//     marginBottom: 20,
//   },
//   buttonRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 16,
//   },
//   cameraButton: {
//     flexDirection: "row",
//     backgroundColor: "#A88BFA",
//     padding: 10,
//     borderRadius: 8,
//     alignItems: "center",
//   },
//   galleryButton: {
//     flexDirection: "row",
//     backgroundColor: "#A88BFA",
//     padding: 10,
//     borderRadius: 8,
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 10,
//   },
//   buttonText: {
//     color: "#fff",
//     marginLeft: 6,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: "500",
//     marginBottom: 8,
//   },
//   noteInput: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 10,
//     padding: 10,
//     minHeight: 100,
//     textAlignVertical: "top",
//     backgroundColor: "#fff",
//   },
//   saveButton: {
//     backgroundColor: "#A88BFA",
//     padding: 14,
//     borderRadius: 12,
//     alignItems: "center",
//     marginTop: 20,
//   },
//   saveButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
// });
