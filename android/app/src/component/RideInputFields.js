// RideInputFields.js
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Modal, Alert } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import RideOptions from './RideOptions';
import RazorpayCheckout from 'react-native-razorpay';

const RideInputFields = () => {
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [selectedRide, setSelectedRide] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const destinationOptions = ['National Gallery of Modern Art', 'Tipu Sultans Palace and Fort', 'Krishna Rajendra (KR) Market', 'Lalbagh Botanical Garden', 'Cubbon Park', 'Vidhana Soudha', 'Attara Kacheri (High Court) and Surroundings', 'Spiritual and Religious Places', 'Ulsoor Lake, Halasuru', "Sivanchetti Gardens", "Ulsoor Lake", "Halasuru", "Sivanchetti Gardens","Devanahalli Fort", "Nrityagram,Big Banyan Tree","Jakkur Aerodrome",
    "Wrestling Pit-cum-Restaurant","Mayo Hall,Blossom Book House","Malleswaram And Basavanagudi","Freedom Park","Pyramid Valley","Turahalli Forest","Gandikota Fort"];

  const handleFromChange = (text) => {
    setFromLocation(text);
  };

  const handleToChange = (index, value) => {
    setToLocation(value);
  };

  const handleClearToLocation = () => {
    setToLocation('');
  };

  const handleTakeRide = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedRide(null);
  };

  const handleRideSelection = (selectedRide) => {
    setSelectedRide(selectedRide);
    setIsModalVisible(true);
  };

  const handlePayment = async () => {
    Alert.alert(
      'Payment',
      `Do you want to book a ride from ${fromLocation} to ${toLocation} with ${selectedRide.title} for ${selectedRide.price}?`,
      [
        { text: 'Cancel', onPress: handleCloseModal, style: 'cancel' },
        {
          text: 'OK',
          onPress: async () => {
            const options = {
              description: `Payment for ${selectedRide.title}`,
              currency: 'INR',
              key: 'rzp_test_P9GGaAXRTQMmea',
              amount: parseFloat(selectedRide.price) * 100, // Convert price to a number
              name: 'SpotsVista',
              prefill: {
                email: 'user@gmail.com',
                contact: '9876543210',
                name: 'user',
              },
              theme: { color: '#53a20e' },
            };

            try {
              const data = await RazorpayCheckout.open(options);

              console.log('Payment Response:', data);

              if (data.razorpay_payment_id) {
                Alert.alert('Payment Successful', 'Thank you for riding with us!');
                handleCloseModal();
              } else {
                Alert.alert('Payment Failed', 'Please try again.');
              }
            } catch (error) {
              console.error('Payment Error:', error);
              Alert.alert('Payment Error', 'An error occurred during payment. Please try again.');
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>From:</Text>
      <TextInput
        style={styles.input}
        value={fromLocation}
        onChangeText={handleFromChange}
      />

      <Text style={styles.label}>To:</Text>
      <View style={styles.dropdownContainer}>
        <ModalDropdown
          options={destinationOptions}
          onSelect={(index, value) => handleToChange(index, value)}
          defaultValue="Select destination..."
          style={styles.dropdown}
          textStyle={styles.dropdownText}
          dropdownStyle={styles.dropdownStyle}
          dropdownTextStyle={styles.dropdownOptionText}
          dropdownTextHighlightStyle={styles.dropdownOptionTextHighlight}
        />
        {toLocation !== '' && (
          <TouchableOpacity style={styles.clearIcon} onPress={handleClearToLocation}>
            <Image source={require('../Image/cancelIcon.png')} style={styles.cancelIcon} />
          </TouchableOpacity>
        )}
      </View>

      {toLocation !== '' && (
        <TouchableOpacity style={styles.button} onPress={handleTakeRide}>
          <Text style={styles.buttonText}>Take a Ride</Text>
        </TouchableOpacity>
      )}

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseModal}
      >
        {selectedRide ? (
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Selected Ride</Text>
            <Image source={selectedRide.image} style={styles.selectedRideImage} />
            <Text style={styles.selectedRideText}>{selectedRide.title}</Text>
            <Text style={styles.selectedRideText}>Price: {selectedRide.price}</Text>
            <Text style={styles.selectedRideText}>From: {fromLocation}</Text>
            <Text style={styles.selectedRideText}>To: {toLocation}</Text>
            <TouchableOpacity style={styles.button} onPress={handlePayment}>
              <Text style={styles.buttonText}>Proceed to Payment</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleCloseModal}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <RideOptions onSelectRide={handleRideSelection} />
        )}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  label: {
    fontSize: 20,
    marginBottom: 8,
    color: 'black',
  },
  input: {
    height: 40,
    borderColor: 'blue',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 16,
    borderRadius: 8,
    padding: 10,
  },
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderColor: 'blue',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  dropdown: {
    flex: 1,
  },
  dropdownText: {
    fontSize: 16,
    color: 'black',
    padding: 5,
  },
  dropdownStyle: {
    height: 'auto',
    maxHeight: 200,
    borderColor: 'blue',
    borderWidth: 1,
    borderRadius: 8,
  },
  dropdownOptionText: {
    fontSize: 16,
    color: 'black',
  },
  dropdownOptionTextHighlight: {
    color: 'white',
    backgroundColor: 'blue',
  },
  clearIcon: {
    padding: 10,
    marginLeft: 5,
  },
  cancelIcon: {
    width: 20,
    height: 20,
  },
  button: {
    marginTop: 20,
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  selectedRideImage: {
    width: 100,
    height: 60,
    marginBottom: 10,
  },
  selectedRideText: {
    fontSize: 18,
    color: 'white',
    marginBottom: 5,
  },
});

export default RideInputFields;
