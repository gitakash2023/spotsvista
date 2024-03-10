import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { Dialog, Paragraph, Button } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';


const Activity = ({navigation}) => {
  const [upcomingRide, setUpcomingRide] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(false);

  useEffect(() => {
    const currentUser = auth().currentUser;
    console.log("Current User:", currentUser); // Log currentUser object
  
    const unsubscribe = firestore()
      .collection('futureRides')
      .where('userId', '==', currentUser.uid)
      .onSnapshot(querySnapshot => {
        console.log("Query Snapshot:", querySnapshot); // Log querySnapshot
        let ride = null;
        querySnapshot.forEach(documentSnapshot => {
          ride = {
            id: documentSnapshot.id,
            ...documentSnapshot.data(),
          };
        });
        console.log("Upcoming Ride:", ride); // Log upcomingRide
        setUpcomingRide(ride);
      });
  
    // Unsubscribe from snapshot listener when component is unmounted
    return () => unsubscribe();
  }, []);
  
  console.log(upcomingRide)

  const cancelRide = async () => {
    try {
      await firestore().collection('futureRides').doc(upcomingRide.id).delete();
    } catch (error) {
      console.error('Error cancelling ride:', error);
      Alert.alert('Error', 'Failed to cancel the ride. Please try again later.');
    }
    setDialogVisible(false);
  };

  const bookRide = () => {
    
    navigation.navigate("Home")
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Activity</Text>
      {upcomingRide ? (
        <View style={styles.detailsContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.detailsText}>Source: {upcomingRide.source}</Text>
            <Text style={styles.detailsText}>Destination: {upcomingRide.destination}</Text>
            <Text style={styles.detailsText}>Date: {new Date(upcomingRide.rideDate).toLocaleDateString()}</Text>
            <Text style={styles.detailsText}>Time: {new Date(upcomingRide.rideTime).toLocaleTimeString()}</Text>
            <TouchableOpacity onPress={() => setDialogVisible(true)} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancel Ride</Text>
            </TouchableOpacity>
          </View>
          <Image source={require('../Image/car3d.jpg')} style={styles.image} />
        </View>
      ) : (
        <View style={styles.noRideContainer}>
          <Text style={styles.noRideText}>No upcoming ride</Text>
          <TouchableOpacity onPress={bookRide} style={styles.bookRideButton}>
            <Text style={styles.bookRideButtonText}>Book a Ride</Text>
          </TouchableOpacity>
        </View>
      )}

      <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
        <Dialog.Title>Cancel Ride</Dialog.Title>
        <Dialog.Content>
          <Paragraph>Are you sure you want to cancel this ride?</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={cancelRide}>Yes</Button>
          <Button onPress={() => setDialogVisible(false)}>No</Button>
        </Dialog.Actions>
      </Dialog>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
  },
  heading: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'black',
  },
  detailsContainer: {
    flexDirection: 'row',
    marginTop: 16,
    padding: 10,
    backgroundColor: 'rgba(211, 211, 211, 0.3)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(128, 128, 128, 0.5)',
  },
  textContainer: {
    flex: 1,
    margin: 10,
  },
  detailsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    margin: 5,
  },
  image: {
    width: 100,
    height: 100,
    marginLeft: 16,
    borderRadius: 8,
  },
  cancelButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  noRideContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noRideText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
  },
  bookRideButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  bookRideButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Activity;
