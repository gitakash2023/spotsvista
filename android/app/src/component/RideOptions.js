// RideOptions.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';

const RideOptions = ({ onSelectRide }) => {
  const rideOptions = [
    { id: 1, title: 'Option 1', price: '$20', driver: 'John Doe', mobile: '123-456-7890', image: require('../Image/car.jpg') },
    { id: 2, title: 'Option 2', price: '$25', driver: 'Jane Smith', mobile: '987-654-3210', image: require('../Image/car1.jpg') },
    { id: 3, title: 'Option 3', price: '$18', driver: 'Bob Johnson', mobile: '111-222-3333', image: require('../Image/car3.jpg') },
    { id: 4, title: 'Option 4', price: '$22', driver: 'Alice Brown', mobile: '444-555-6666', image: require('../Image/car3d.jpg') },
    { id: 5, title: 'Option 1', price: '$20', driver: 'John Doe', mobile: '123-456-7890', image: require('../Image/car.jpg') },
    { id: 6, title: 'Option 2', price: '$25', driver: 'Jane Smith', mobile: '987-654-3210', image: require('../Image/car1.jpg') },
    { id: 7, title: 'Option 3', price: '$18', driver: 'Bob Johnson', mobile: '111-222-3333', image: require('../Image/car3.jpg') },
    { id: 8, title: 'Option 4', price: '$22', driver: 'Alice Brown', mobile: '444-555-6666', image: require('../Image/car3d.jpg') },
  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Select a ride option</Text>
        {rideOptions.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={styles.optionButton}
            onPress={() => onSelectRide(option)}
          >
            <Image source={option.image} style={styles.carImage} />
            <Text style={styles.optionText}>{option.title}</Text>
            <Text style={styles.optionText}>Price: {option.price}</Text>
            <Text style={styles.optionText}>Driver: {option.driver}</Text>
            <Text style={styles.optionText}>Mobile: {option.mobile}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
    marginTop:20
  },
  optionButton: {
    backgroundColor: "gray",
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
    minWidth: 200,
    alignItems: 'center',
  },
  carImage: {
    width: 100,
    height: 60,
    marginBottom: 10,
  },
  optionText: {
    fontSize: 18,
    color: 'lightblue',
  },
});

export default RideOptions;
