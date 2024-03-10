import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, Alert, StyleSheet, ScrollView, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const RideHistory = () => {
  const [rideHistory, setRideHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = auth().currentUser;

  const retrieveRideHistory = async () => {
    try {
      const currentUser = auth().currentUser;
      const querySnapshot = await firestore()
        .collection('ridehistory')
        .where('userId', '==', currentUser.uid)
        .get();

      const data = querySnapshot.docs.map(documentSnapshot => {
        const documentData = documentSnapshot.data();
        documentData.id = documentSnapshot.id;
        return documentData;
      });

      setRideHistory(data);
      setLoading(false);
    } catch (error) {
      Alert.alert(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    retrieveRideHistory();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : rideHistory.length > 0 ? (
        <ScrollView>
          {rideHistory.map((ride, index) => (
            <View key={index} style={styles.rideCard}>
              <Image source={require('../../../Image/car.jpg')} style={styles.carImage} />
              <Text style={[styles.rideDetail, styles.carName]}>Car Name: {ride.carName}</Text>
              <Text style={[styles.rideDetail, styles.origin]}>Origin: {ride.origin}</Text>
              <Text style={[styles.rideDetail, styles.destination]}>Destination: {ride.destination}</Text>
              <Text style={[styles.rideDetail, styles.ridePrice]}>Ride Price: {ride.ridePrice}</Text>
            </View>
          ))}
        </ScrollView>
      ) : (
        <Text style={styles.noRideText}>No ride history available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0', // Background color
  },
  rideCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    elevation: 3,
  },
  carImage: {
    width: 100,
    height: 50,
    marginBottom: 10,
    alignSelf: 'center',
  },
  rideDetail: {
    fontSize: 16,
    marginBottom: 5,
  },
  carName: {
    color: '#3498db', // Blue color
  },
  ridePrice: {
    color: '#27ae60', 
  },
  origin: {
    color: 'blue', 
  },
  destination: {
    color: '#9b59b6', 
  },
  noRideText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default RideHistory;
