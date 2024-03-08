import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { Dialog, Paragraph, Button } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

const Activity = () => {
  const [futureRides, setFutureRides] = useState([]);
  const [selectedRideId, setSelectedRideId] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('futureRides')
      .onSnapshot(querySnapshot => {
        const rides = [];
        querySnapshot.forEach(documentSnapshot => {
          rides.push({
            id: documentSnapshot.id,
            ...documentSnapshot.data(),
          });
        });
        setFutureRides(rides);
      });

    // Unsubscribe from snapshot listener when component is unmounted
    return () => unsubscribe();
  }, []);

  const cancelRide = async (id) => {
    try {
      await firestore().collection('futureRides').doc(id).delete();
    } catch (error) {
      console.error("Error cancelling ride:", error);
    }
    setDialogVisible(false);
  };

  const showDialog = (id) => {
    setSelectedRideId(id);
    setDialogVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Activity</Text>
      <Text style={styles.upcomingText}>Upcoming</Text>

      <FlatList
        data={futureRides}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.detailsContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.detailsText}>Source: {item.source}</Text>
              <Text style={styles.detailsText}>Destination: {item.destination}</Text>
              <Text style={styles.detailsText}>Date: {new Date(item.rideDate).toLocaleDateString()}</Text>
              <Text style={styles.detailsText}>Time: {new Date(item.rideTime).toLocaleTimeString()}</Text>
              <TouchableOpacity onPress={() => showDialog(item.id)} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancel ride</Text>
            </TouchableOpacity>
            </View>
            <Image source={require('../Image/car3d.jpg')} style={styles.image} />
            
          </View>
        )}
      />

      <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
        <Dialog.Title>Cancel Ride</Dialog.Title>
        <Dialog.Content>
          <Paragraph>Are you sure you want to cancel this ride?</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => cancelRide(selectedRideId)}>Yes</Button>
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
  upcomingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 16,
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
});

export default Activity;
