import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HealthScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Health</Text>
      <View style={styles.grid}>
        {/* Blood Pressure link */}
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('BPInputScreen')}>
          <Ionicons name="heart" size={32} color="#555" />
          <Text style={styles.cardLabel}>Blood Pressure</Text>
        </TouchableOpacity>
        {/* Weight input */}
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('WeightInputScreen')}>
          <Ionicons name="scale" size={32} color="#555" />
          <Text style={styles.cardLabel}>Weight</Text>
        </TouchableOpacity>
        {/* Kick Count links to movementcounter */}
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('MovementCounter')}>
          <MaterialCommunityIcons name="baby-face-outline" size={32} color="#555" />
          <Text style={styles.cardLabel}>Kick Count</Text>
        </TouchableOpacity>
        {/* Sync Device placeholder */}
        <TouchableOpacity style={styles.card} onPress={() => alert('Sync Device coming soon!')}>
          <FontAwesome5 name="link" size={32} color="#555" />
          <Text style={styles.cardLabel}>Sync Device</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginLeft: 4,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    width: '100%',
  },
  card: {
    width: '46%',
    aspectRatio: 1.5,
    backgroundColor: '#fff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    margin: '2%',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  cardLabel: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    textAlign: 'center',
  },
});
