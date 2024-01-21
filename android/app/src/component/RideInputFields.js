// RideInputFields.js
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Modal, Alert } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import RideOptions from './RideOptions';
import RazorpayCheckout from 'react-native-razorpay';
import Geolocation from '@react-native-community/geolocation';

const RideInputFields = () => {
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [selectedRide, setSelectedRide] = useState(null);
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
    const [location, setLocation] = useState({
      latitude: null,
      longitude: null,
      locationName: '',
    });
  
    const requestLocationPermission = () => {
      Geolocation.requestAuthorization(
        () => {
          Geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              setLocation({ latitude, longitude, locationName: '' });
              await getLocationName(latitude, longitude);
              await fetchNearbyPlaces(latitude, longitude)
              console.log(latitude, longitude)
            },
            (error) => {
              console.error('Error getting current location:', error);
            }
          );
        },
        (error) => {
          console.error('Error requesting location permission:', error);
        }
      );
    };
    const getLocationName = async (latitude, longitude) => {
      try {
        const apiKey = '4a92e86c6073444a93c20b73f2f58285';
        const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        if (data.results.length > 0) {
          const address = data.results[0].formatted;
          setLocation((prevLocation) => ({ ...prevLocation, locationName: address }));
          console.log(address);
          setFromLocation(address); // Set fromLocation directly using the updated address
        } else {
          console.warn('Location not found');
        }
      } catch (error) {
        console.error('Error fetching location name:', error.message);
      }
    };
    
 
  
    const fetchNearbyPlaces = async (latitude, longitude) => {
      try {
        const apiKey = 'AIzaSyAp__xlkv0-fU0iXT_SCReglaAzQQu2R04';
        const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=100000&type=point_of_interest&key=${apiKey}`;
    
        const response = await fetch(apiUrl);
    
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
    
        const data = await response.json();
        const placeNames = data.results.map(place => place.name);
        setNearbyPlaces(placeNames);
        console.log(placeNames);
        console.log("Names fetched successfully");
      } catch (error) {
        console.error('Error fetching nearby places:', error.message);
      }
    };
    
  
  const handleFromChange = (text) => {
    setFromLocation(text);
  };
  useEffect(() => {
    // Call the function to request location permission
    requestLocationPermission();
   
  }, []);

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
              amount: selectedRide.price *100,
              name: 'SpotsVista',
              // prefill: {
              //   email: 'user@gmail.com',
              //   contact: '9876543210',
              //   name: 'user',
              // },
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
   
      {/* <Text style={styles.label}>From:</Text> */}
      <View style={styles.inputContainer}>
      <Image
        source={{ uri: 'data:image/jpeg;base64,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' }}
        style={styles.image}
      />
      <TextInput
        style={styles.input}
        value={fromLocation}
        onChangeText={handleFromChange}
      />
    </View>

      <Text style={styles.label}>To:</Text>
      <View style={styles.dropdownContainer}>
        <ModalDropdown
          options={nearbyPlaces}
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
 
 
  inputContainer: {
    flexDirection: 'row', 
    justifyContent:"space-between", 
    alignItems: 'center',  
    borderWidth: 1,       
    borderRadius: 8,       
    borderColor: '#ccc',  
    margin: 10,            
    paddingHorizontal: 10, 
  },
  image: {
    width: 20,  
    height: 30, 
    marginRight: 10, 
  },
  input: {
    flex: 1,     
    height: 40,  
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
