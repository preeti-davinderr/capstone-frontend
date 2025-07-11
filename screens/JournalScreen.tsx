// import React, { useState, useCallback } from 'react';
// import { View, ScrollView, TouchableOpacity, StyleSheet, Text } from 'react-native';
// import { Ionicons, Entypo } from '@expo/vector-icons';
// import { LinearGradient } from 'expo-linear-gradient';
// import { useFocusEffect } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// type ImageEntry = {
//   url: string;
//   description: string;
//   addedAt: string;
// };

// type Journal = {
//   _id: string;
//   title: string;
//   designTemplate: string;
//   createdAt: string;
//   images: ImageEntry[];
// };

// export default function JournalScreen({ navigation }: any) {
//   const [journals, setJournals] = useState<Journal[]>([]);
//   const [loading, setLoading] = useState(true);

//   useFocusEffect(
//     useCallback(() => {
//       const fetchJournals = async () => {
//         try {
//           setLoading(true);
//           const user = await AsyncStorage.getItem("user");
//           const parsed = user ? JSON.parse(user) : null;
//           const userId = parsed?.id;

//           if (!userId) {
//             console.error("User ID not found in AsyncStorage.");
//             setLoading(false);
//             return;
//           }

//           const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/journal?id=${userId}`);
//           const data = await res.json();
//           setJournals(data.data as Journal[]);
//         } catch (err) {
//           console.error("Error fetching journals:", err);
//         } finally {
//           setLoading(false);
//         }
//       };

//       fetchJournals();
//     }, [])
//   );

//   return (
//     <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
//       {/* Header */}
//       <View style={styles.header}>
//         <View>
//           <Text style={styles.headerTitle}>My Journal</Text>
//           <Text style={styles.headerSubtitle}>How are you feeling today?</Text>
//         </View>
//         <View style={styles.notificationIcon}>
//           <Ionicons name="notifications-outline" size={24} color="#6A5ACD" />
//           <View style={styles.notificationDot} />
//         </View>
//       </View>

//       {/* Get Started Card */}
//       <View style={styles.solidCard}>
//   <Ionicons name="book" size={32} color="#fff" style={{ marginBottom: 10 }} />
//   <Text style={styles.gradientTitle}>Start Your Pregnancy Journey</Text>
//   <Text style={styles.gradientSubtitle}>Capture precious moments and memories</Text>
//   <TouchableOpacity
//     onPress={() => {
//       navigation.navigate('journalEntery', {
//         title: '',
//         allowCustomTitle: true,
//         description: 'Track your growing belly week by week',
//         meta: '40 weeks',
//       });
//     }}
//     style={styles.getStartedButton}
//   >
//     <Text style={styles.getStartedText}>Get Started</Text>
//   </TouchableOpacity>
// </View>

//       {/* Active Journals */}
//       {journals.length > 0 ? (
//         <>
//           <Text style={styles.sectionTitle}>My Active Journals</Text>
//           {journals.map((journal) => (
//             <View key={journal._id} style={styles.card}>
//               <Ionicons name="book-outline" size={28} color="#6A5ACD" style={styles.cardIcon} />
//               <View style={styles.cardContent}>
//                 <Text style={styles.cardTitle}>{journal.title}</Text>
//                 <Text style={styles.cardSubtitle}>{journal.designTemplate}</Text>
//               </View>
//               <TouchableOpacity
//                 onPress={() => {
//                   navigation.navigate('journalEntery', {
//                     journalId: journal._id,
//                     title: journal.title,
//                     description: journal.designTemplate,
//                     meta: journal.designTemplate,
//                     isEdit: true,
//                   });
//                 }}
//                 style={styles.cardButton}
//               >
//                 <Text style={styles.cardButtonText}>Open</Text>
//               </TouchableOpacity>
//             </View>
//           ))}
//         </>
//       )
//     :
//     <View style={{ marginTop: 20, alignItems: 'center' }}>
//         <Text style={{ fontSize: 16, color: '#666' }}>No active journals found. Start a new one!</Text>
//       </View>
//     }

//       {/* Pre-Designed */}
//       <Text style={styles.sectionTitle}>Pre-Designed Journals</Text>
//       {journalData.map((item, index) => (
//         <View key={index} style={styles.card}>
//           {item.icon}
//           <View style={styles.cardContent}>
//             <Text style={styles.cardTitle}>{item.title}</Text>
//             <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
//           </View>
//           <TouchableOpacity
//             onPress={() => {
//               navigation.navigate('journalEntery', {
//                 title: item.title,
//                 description: item.subtitle,
//                 meta: item.meta,
//               });
//             }}
//             style={styles.cardButton}
//           >
//             <Text style={styles.cardButtonText}>Start</Text>
//           </TouchableOpacity>
//         </View>
//       ))}
//     </ScrollView>
//   );
// }

// const journalData = [
//   {
//     title: "Baby Bump",
//     subtitle: "Weekly photo diary",
//     meta: "40 weeks",
//     icon: <Ionicons name="camera-outline" size={28} color="#6A5ACD" style={{ marginRight: 12 }} />,
//   },
//   {
//     title: "Dear Baby",
//     subtitle: "Letters to your little ones",
//     meta: "Letters",
//     icon: <Entypo name="heart-outlined" size={28} color="#6A5ACD" style={{ marginRight: 12 }} />,
//   },
//   {
//     title: "My Feelings",
//     subtitle: "Write heartfelt letters to your baby.",
//     meta: "Feelings",
//     icon: <Entypo name="emoji-happy" size={28} color="#6A5ACD" style={{ marginRight: 12 }} />,
//   },
//   {
//     title: "First Movements",
//     subtitle: "Record those magical first kicks.",
//     meta: "Kicks",
//     icon: <Entypo name="hand" size={28} color="#6A5ACD" style={{ marginRight: 12 }} />,
//   },
// ];

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#fff',
//     padding: 16,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 24,
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: '700',
//     color: '#6A5ACD',
//   },
//   headerSubtitle: {
//     fontSize: 14,
//     color: '#999',
//     marginTop: 2,
//   },
//   notificationIcon: {
//     position: 'relative',
//   },
//   notificationDot: {
//     position: 'absolute',
//     top: -2,
//     right: -2,
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: 'red',
//   },
//   gradientCard: {
//     borderRadius: 16,
//     padding: 24,
//     marginBottom: 28,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   gradientTitle: {
//     fontSize: 16,
//     fontWeight: '700',
//     color: '#fff',
//     textAlign: 'center',
//     marginBottom: 6,
//   },
//   gradientSubtitle: {
//     fontSize: 13,
//     color: '#f0f0f0',
//     textAlign: 'center',
//     marginBottom: 16,
//   },
//   getStartedButton: {
//     backgroundColor: '#fff',
//     borderRadius: 24,
//     paddingHorizontal: 24,
//     paddingVertical: 10,
//   },
//   getStartedText: {
//     color: '#6A5ACD',
//     fontWeight: '600',
//     fontSize: 14,
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     marginBottom: 12,
//     color: '#333',
//   },
//   card: {
//     flexDirection: 'row',
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 14,
//     alignItems: 'center',
//     marginBottom: 12,
//     shadowColor: '#000',
//     shadowOpacity: 0.04,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 4,
//     elevation: 1,
//   },
//   cardIcon: {
//     marginRight: 12,
//   },
//   cardContent: {
//     flex: 1,
//   },
//   cardTitle: {
//     fontSize: 15,
//     fontWeight: '600',
//     marginBottom: 2,
//     color: '#333',
//   },
//   cardSubtitle: {
//     fontSize: 13,
//     color: '#666',
//     marginBottom: 4,
//   },
//   cardButton: {
//     backgroundColor: '#6A5ACD',
//     borderRadius: 20,
//     paddingHorizontal: 16,
//     paddingVertical: 6,
//   },
//   cardButtonText: {
//     color: '#fff',
//     fontWeight: '600',
//     fontSize: 13,
//   },
//   solidCard: {
//     backgroundColor: '#A18CD1',
//     borderRadius: 16,
//     padding: 24,
//     marginBottom: 28,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
import React, { useState, useCallback } from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';

import MainHeader from '../components/MainHeader';
import CommonButton from '../components/CommonButton';

    type ImageEntry = {
      url: string;
      description: string;
      addedAt: string;
    };

    type Journal = {
      _id: string;
      title: string;
      designTemplate: string;
      createdAt: string;
      images: ImageEntry[];
    };

    

export default function JournalScreen({navigation}: any) {
  const [journals, setJournals] = useState<Journal[]>([]);

     const journalData = [
        {
          title: 'Baby Bump',
          subtitle: 'Weekly photo diary',
          description: "Document your growing bump with weekly photos and notes about how you're feeling.",
          meta: '40 weeks',
          icon: () => <Ionicons name="camera-outline" size={24} color="#fff" />,
          bgColor: '#8C63C7',
        },
        {
          title: 'Dear Baby',
          subtitle: 'Letters to your little one',
          description: 'Write heartfelt letters to your baby throughout your pregnancy journey.',
          meta: 'Letters',
          icon: () => <Ionicons name="heart" size={24} color="#fff" />,
          bgColor: '#EC4899',
        },
        {
          title: 'My Body My Feelings',
          subtitle: 'Physical & emotional changes',
          description: 'Track how your body and emotions change throughout pregnancy.',
          meta: 'Feelings',
          icon: () => <Entypo name="emoji-happy" size={24} color="#fff" />,
          bgColor: '#F97316',
        },
        {
          title: 'First Movements',
          subtitle: 'Baby’s kicks & movements',
          description: 'Record those magical first kicks and movements you feel from your baby.',
          meta: 'Kicks',
          icon: () => <Entypo name="hand" size={24} color="#fff" />,
          bgColor: '#22C55E',
        },
      ];




  useFocusEffect(
    useCallback(() => {
      const fetchJournals = async () => {
        const user = await AsyncStorage.getItem('user');
        const parsed = user ? JSON.parse(user) : null;
        const userId = parsed?.id;

        if (!userId) return;

        const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/journal?id=${userId}`);
        const data = await res.json();
        setJournals(data.data);
      };
      fetchJournals();
    }, [])
  );

   const getJournalIcon = (type?: string) => {
  const key = type?.toLowerCase() || '';
  switch (key) {
    case 'Baby Bump':
      return <Ionicons name="happy" size={20} color="#fff" />;
    case 'dear baby':
      return <Ionicons name="heart-outline" size={20} color="#fff" />;
    case 'my body my feelings':
      return <Ionicons name="happy" size={20} color="#fff" />;
    case 'first movements':
      return <Ionicons name="hand-left" size={20} color="#fff" />;
    default:
      return <Ionicons name="book-outline" size={20} color="#fff" />;
  }
};

const getJournalBgColor = (type?: string) => {
  const key = type?.toLowerCase() || '';
  switch (key) {
    case 'baby bump':
      return '#8C63C7';
    case 'dear baby':
      return '#EC4899';
    case 'my body my feelings':
      return '#F97316';
    case 'first movements':
      return '#22C55E';
    default:
      return '#F3E8FF';
  }
};



  return (

    <>
      <MainHeader title="My Journal" subtitle="Track your journals." />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* Get Started Card */}
      <View style={styles.getStartedCard}>
        <LinearGradient
          colors={['#E6D6F2', '#FAD9E6']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.getStartedGradient}
        />
        <Ionicons name="book" size={32} color="#8C63C7" style={styles.getStartedIcon} />
        <Text style={styles.getStartedTitle}>Start Your Pregnancy Journey</Text>
        <Text style={styles.getStartedSubtitle}>
            Capture precious moments and{'\n'} memories
          </Text>
        <TouchableOpacity
          style={styles.getStartedButton}
          onPress={() => navigation.navigate('journalEntery', { allowCustomTitle: true })}
        >
          <Text style={styles.getStartedButtonText}>Get Started</Text>
        </TouchableOpacity>
      </View>

      {/* Active Journals */}
      {journals.map((journal) => (
        <TouchableOpacity
          key={journal._id}
          style={styles.activeCard}
          onPress={() => {
            navigation.navigate('journalEntery', {
              journalId: journal._id,
              title: journal.title,
              description: journal.designTemplate,
              meta: journal.designTemplate,
              isEdit: true,
            });
          }}
        >
          <View
            style={[
              styles.activeIconWrapper,
              { backgroundColor: getJournalBgColor(journal.title) },
            ]}
          >
            {getJournalIcon(journal.title)}
          </View>
          <View style={styles.activeTextGroup}>
            <Text style={styles.activeTitle}>{journal.title}</Text>
            <Text style={styles.activeMeta}>Week 24 • Last updated 2 days ago</Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={20}
            color="#6B7280"
            style={styles.chevron}
          />
        </TouchableOpacity>
      ))}



      {/* Pre-Designed Journals */}
      <Text style={styles.sectionTitle}>Pre-Designed Journals</Text>
      {journalData.map((item, index) => (
        <View key={index} style={styles.journalCard}>
          <View style={[styles.journalIconContainer, { backgroundColor: item.bgColor }]}>
            {item.icon()}
          </View>
          <View style={styles.journalTextGroup}>
            <Text style={styles.journalTitle}>{item.title}</Text>
            <Text style={styles.journalMeta}>{item.subtitle}</Text>
            <Text style={styles.journalDescription}>{item.description}</Text>
          </View>
          <CommonButton
            label="Start"
            size="small"
            style={{ width: 70 }}
            onPress={() => {
              navigation.navigate('journalEntery', {
                title: item.title,
                description: item.subtitle,
                meta: item.meta,
              });
            }}
          />
        </View>
      ))}
    </ScrollView>
  </>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F8F8',
    padding: 16,
  },
  notificationIcon: {
    position: 'absolute',
    top: 16,
    right: 16,
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  notificationDot: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'red',
  },
  getStartedCard: {
    borderRadius: 12,
    padding: 24,
    marginBottom: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  getStartedGradient: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 12,
  },
  getStartedIcon: {
    marginBottom: 12,
  },
  getStartedTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#8C63C7',
    textAlign: 'center',
    marginBottom: 8,
  },
  getStartedSubtitle: {
    fontSize: 15,
    color: '#333',
    textAlign: 'center',
    marginBottom: 16,
  },
  getStartedButton: {
    backgroundColor: '#fff',
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 28,
  },
  getStartedButtonText: {
    color: '#8C63C7',
    fontSize: 16,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 24,
    marginBottom: 12,
    color: '#333',
  },
  journalCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  journalIconContainer: {
    width: 52,
    height: 52,
    top: 0,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  journalTextGroup: {
    flex: 1,
  },
  journalTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1F2937',
  },
  journalMeta: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  journalDescription: {
    fontSize: 12,
    color: '#4B5563',
    marginTop: 4,
  },
  activeCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  activeIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F3E8FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  activeTextGroup: {
    flex: 1,
  },
  activeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  activeMeta: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  chevron: {
    marginLeft: 10,
  },
});
