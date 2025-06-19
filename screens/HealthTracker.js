// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
// import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

// export default function HealthTrackerScreen() {
//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.header}>Health Tracker</Text>
//       <Text style={styles.week}>Week 24</Text>
//       <Text style={styles.trimester}>Second Trimester</Text>

//       {/* Log Health Data */}
//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Log Health Data</Text>
//         <View style={styles.cardRow}>
//           <TouchableOpacity style={styles.card}>
//             <Ionicons name="heart" size={24} color="#333" />
//             <Text>Blood Pressure</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.card}>
//             <Ionicons name="scale" size={24} color="#333" />
//             <Text>Weight</Text>
//           </TouchableOpacity>
//         </View>
//         <View style={styles.cardRow}>
//           <TouchableOpacity style={styles.card}>
//             <MaterialCommunityIcons name="baby-face-outline" size={24} color="#333" />
//             <Text>Kick Count</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.card}>
//             <FontAwesome5 name="link" size={20} color="#333" />
//             <Text>Sync Device</Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Today's Readings */}
//       <View style={styles.section}>
//         <View style={styles.rowBetween}>
//           <Text style={styles.sectionTitle}>Today's Readings</Text>
//           <TouchableOpacity><Text style={styles.link}>View All</Text></TouchableOpacity>
//         </View>
//         <View style={styles.dataBox}><Text>Blood Pressure: 120/80 mmHg <Text style={styles.label}>Normal</Text></Text></View>
//         <View style={styles.dataBox}><Text>Weight: 68.5 kg (+0.5kg) <Text style={styles.label}>Good</Text></Text></View>
//       </View>

//       {/* Connected Devices */}
//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Connected Devices</Text>
//         <View style={styles.deviceBox}>
//           <Text style={{ fontWeight: '500' }}>Fitbit Versa 3</Text>
//           <Text style={styles.deviceMeta}>Last sync: 2 hours ago</Text>
//           <TouchableOpacity style={styles.syncButton}><Text style={styles.syncText}>Sync Now</Text></TouchableOpacity>
//           <View style={styles.metricsRow}>
//             <Text>Steps: 8,432</Text>
//             <Text>Heart Rate: 78 bpm</Text>
//             <Text>Sleep: 7h 23m</Text>
//           </View>
//         </View>
//         <TouchableOpacity style={styles.removeBtn}><Text>Remove Device</Text></TouchableOpacity>
//         <TouchableOpacity style={styles.addBtn}><Text>+ Add Device</Text></TouchableOpacity>
//       </View>

//       {/* AI Recommendations */}
//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>AI Recommendations</Text>
//         <View style={styles.aiCard}>
//           <Text style={{ fontWeight: '600' }}>This Week's Focus</Text>
//           <Text>
//             '• Continue prenatal vitamins with iron'
//             '• Aim for 8-10 glasses of water daily'
//             '• Light exercise like walking for 30 minutes'
//           </Text>
//         </View>
//         <View style={styles.aiCard}>
//           <Text style={{ fontWeight: '600' }}>Avoid This Week</Text>
//           <Text>
//             '• High-mercury fish'
//             • Excessive caffeine (&gt;200mg/day)
//             '• Hot baths or saunas'
//           </Text>
//         </View>
//       </View>

//       {/* Doctor Report Button */}
//       <TouchableOpacity style={styles.generateBtn}>
//         <Text style={styles.generateBtnText}>Generate Doctor Report</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     paddingTop: 50,
//     backgroundColor: '#fff',
//   },
//   header: {
//     fontSize: 20,
//     fontWeight: '600',
//     marginBottom: 10,
//   },
//   week: {
//     fontSize: 24,
//     fontWeight: '700',
//   },
//   trimester: {
//     color: '#666',
//     marginBottom: 20,
//   },
//   section: {
//     marginTop: 25,
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     marginBottom: 10,
//   },
//   cardRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   card: {
//     width: '48%',
//     padding: 15,
//     backgroundColor: '#f5f5f5',
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   rowBetween: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   link: {
//     color: '#007AFF',
//   },
//   dataBox: {
//     backgroundColor: '#f9f9f9',
//     padding: 12,
//     borderRadius: 8,
//     marginTop: 8,
//   },
//   label: {
//     color: '#888',
//     fontWeight: '500',
//   },
//   deviceBox: {
//     backgroundColor: '#f1f1f1',
//     padding: 16,
//     borderRadius: 10,
//     marginBottom: 8,
//   },
//   deviceMeta: {
//     color: '#666',
//     fontSize: 12,
//     marginVertical: 4,
//   },
//   syncButton: {
//     alignSelf: 'flex-end',
//     backgroundColor: '#007AFF',
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 6,
//     marginBottom: 6,
//   },
//   syncText: {
//     color: '#fff',
//     fontSize: 12,
//   },
//   metricsRow: {
//     flexDirection: 'column',
//     gap: 4,
//   },
//   removeBtn: {
//     padding: 10,
//     alignItems: 'center',
//     marginBottom: 6,
//   },
//   addBtn: {
//     padding: 10,
//     alignItems: 'center',
//     backgroundColor: '#eee',
//     borderRadius: 8,
//   },
//   aiCard: {
//     backgroundColor: '#f7f7f7',
//     padding: 12,
//     borderRadius: 10,
//     marginBottom: 10,
//   },
//   generateBtn: {
//     marginTop: 30,
//     backgroundColor: '#000',
//     padding: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   generateBtnText: {
//     color: '#fff',
//     fontWeight: '600',
//   },
// });
