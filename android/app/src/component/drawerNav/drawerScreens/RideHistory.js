import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, Alert, StyleSheet, ScrollView } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const RideHistory = () => {
  const [rideHistory, setRideHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const retrieveRideHistory = () => {
    firestore()
      .collection('ridehistory')
      .get()
      .then(querySnapshot => {
        const data = [];
        querySnapshot.forEach(documentSnapshot => {
          const documentData = documentSnapshot.data();
          documentData.id = documentSnapshot.id;
          data.push(documentData);
        });
        setRideHistory(data);
        setLoading(false);
      })
      .catch(error => {
        Alert.alert(error.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    retrieveRideHistory();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView>
          {rideHistory.map((ride, index) => (
            <View key={index} style={styles.rideCard}>
              <Text style={[styles.rideDetail, styles.carName]}>Car Name: {ride.carName}</Text>
              <Text style={[styles.rideDetail, styles.origin]}>Origin: {ride.origin}</Text>
              <Text style={[styles.rideDetail, styles.destination]}>Destination: {ride.destination}</Text>
              <Text style={[styles.rideDetail, styles.ridePrice]}>Ride Price: {ride.ridePrice}</Text>

            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f0f0f0', // Background color
  },
  rideCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    elevation: 3,
  },
  rideDetail: {
    fontSize: 16,
    marginBottom: 5,
  },
  carName: {
    color: '#3498db', 
  },
  ridePrice: {
    color: '#27ae60', 
  },
  origin: {
    color: '#e74c3c', 
  },
  destination: {
    color: '#9b59b6', 
  },
});

export default RideHistory;
