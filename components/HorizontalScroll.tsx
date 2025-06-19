// // components/WeekScroll.tsx

// import React, { useState } from 'react';
// import {
//     ScrollView,
//     StyleProp,
//     StyleSheet,
//     Text,
//     TouchableOpacity,
//     View,
//     ViewStyle,
// } from 'react-native';

// interface WeekInfo {
//   week: number;
//   title: string;
//   size: string;
//   weight: string;
//   visualText: string;
//   footer: string;
// }

// interface WeekScrollProps  {
//     weekData: WeekInfo[];
//     style?: StyleProp<ViewStyle>;
//     onWeekChange?: (week: number) => void;
//   }

// const HorizontalScroll: React.FC<WeekScrollProps> = ({ weekData, style, onWeekChange }) => {
//   const [selectedWeek, setSelectedWeek] = useState<number>(weekData[0].week);
//   const currentWeek = weekData.find(w => w.week === selectedWeek)!;

//   return (
//     <View style={[styles.container, style]}>
//       {/* Horizontal Week Selector */}
//       <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.weekScroll}>
//         {weekData.map(item => (
//           <TouchableOpacity
//             key={item.week}
//             onPress={() => {
//                 setSelectedWeek(item.week);
//                 onWeekChange?.(item.week);
//               }}
//             style={[
//               styles.weekButton,
//               selectedWeek === item.week && styles.activeWeekButton,
//             ]}
//           >
//             <Text
//               style={[
//                 styles.weekButtonText,
//                 selectedWeek === item.week && styles.activeWeekButtonText,
//               ]}
//             >
//               {`Week ${item.week}`}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>

//       {/* Week Content Card */}
//       <View style={styles.card}>
//         <Text style={styles.title}>{currentWeek.title}</Text>
//         <View style={styles.cardContent}>
//           <View>
//             <Text style={styles.sizeText}>Size: {currentWeek.size}</Text>
//             <Text style={styles.sizeText}>Weight: {currentWeek.weight}</Text>
//           </View>
//           <View style={styles.circle}>
//             <Text style={styles.circleText}>{currentWeek.visualText}</Text>
//           </View>
//         </View>
//         <Text style={styles.footer}>{currentWeek.footer}</Text>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//   },
//   weekScroll: {
//     flexDirection: 'row',
//     marginBottom: 16,
//   },
//   weekButton: {
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     borderRadius: 12,
//     backgroundColor: '#eee',
//     marginRight: 8,
//   },
//   activeWeekButton: {
//     backgroundColor: '#000',
//   },
//   weekButtonText: {
//     color: '#333',
//     fontWeight: '500',
//   },
//   activeWeekButtonText: {
//     color: '#fff',
//   },
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: 16,
//     padding: 16,
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     shadowOffset: { width: 0, height: 2 },
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: '600',
//     marginBottom: 16,
//   },
//   cardContent: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   sizeText: {
//     fontSize: 16,
//     marginBottom: 4,
//   },
//   circle: {
//     width: 100,
//     height: 100,
//     backgroundColor: '#888',
//     borderRadius: 50,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   circleText: {
//     color: '#fff',
//     textAlign: 'center',
//   },
//   footer: {
//     textAlign: 'center',
//     marginTop: 16,
//     color: '#777',
//   },
// });

// export default HorizontalScroll;

// components/WeekScroll.tsx

import React, { useState } from 'react';
import {
    ScrollView,
    StyleProp,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';

interface WeekInfo {
  week: number;
  title: string;
  size: string;
  weight: string;
  visualText: string;
  footer: string;
}

interface WeekScrollProps {
  weekData: WeekInfo[];
  style?: StyleProp<ViewStyle>;
  onWeekChange?: (week: number) => void;
}

const HorizontalScroll: React.FC<WeekScrollProps> = ({ weekData, style, onWeekChange }) => {
  const [selectedWeek, setSelectedWeek] = useState<number>(weekData[0].week);
  const currentWeek = weekData.find(w => w.week === selectedWeek)!;

  return (
    <View style={[styles.container, style]}>
      {/* Horizontal Week Selector */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.weekScroll}>
        {weekData.map(item => (
          <TouchableOpacity
            key={item.week}
            onPress={() => {
              setSelectedWeek(item.week);
              onWeekChange?.(item.week); // ✅ safe optional chaining
            }}
            style={[
              styles.weekButton,
              selectedWeek === item.week && styles.activeWeekButton,
            ]}
          >
            <Text
              style={[
                styles.weekButtonText,
                selectedWeek === item.week && styles.activeWeekButtonText,
              ]}
            >
              {`Week ${item.week}`}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Week Content Card */}
      <View style={styles.card}>
        <Text style={styles.title}>{currentWeek.title}</Text>
        <View style={styles.cardContent}>
          <View>
            <Text style={styles.sizeText}>Size: {currentWeek.size}</Text>
            <Text style={styles.sizeText}>Weight: {currentWeek.weight}</Text>
          </View>
          <View style={styles.circle}>
            <Text style={styles.circleText}>{currentWeek.visualText}</Text>
          </View>
        </View>
        <Text style={styles.footer}>{currentWeek.footer}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  weekScroll: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  weekButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#eee',
    marginRight: 8,
  },
  activeWeekButton: {
    backgroundColor: '#000',
  },
  weekButtonText: {
    color: '#333',
    fontWeight: '500',
  },
  activeWeekButtonText: {
    color: '#fff',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sizeText: {
    fontSize: 16,
    marginBottom: 4,
  },
  circle: {
    width: 100,
    height: 100,
    backgroundColor: '#888',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleText: {
    color: '#fff',
    textAlign: 'center',
  },
  footer: {
    textAlign: 'center',
    marginTop: 16,
    color: '#777',
  },
});

export default HorizontalScroll;
