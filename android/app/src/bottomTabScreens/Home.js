import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Header from '../component/Header';
import NearBySpots from '../component/NearBySpots';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();

  const navigateToBookFutureRide = () => {
    navigation.navigate('BookFutureRide');
  };

  return (
    <>
      <Header />
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={navigateToBookFutureRide}>
          <Text style={styles.buttonText}>Book Future Ride</Text>
        </TouchableOpacity>
      </View>
      <NearBySpots />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#FF5722', // Orange color
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    elevation: 3, // Shadow effect
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Home;
