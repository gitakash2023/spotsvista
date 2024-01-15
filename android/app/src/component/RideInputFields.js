// RideInputFields.js
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Modal, Alert, FlatList } from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import Geolocation from '@react-native-community/geolocation';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import RideOptions from './RideOptions';


// Separate component for NearbyPlacesList
const NearbyPlacesList = ({ nearbyPlaces, handleSelectLocation }) => (
  <FlatList
    data={nearbyPlaces}
    keyExtractor={(item) => item.place_id}
    renderItem={({ item }) => (
      <Text onPress={() => handleSelectLocation(item)}>{item.name}</Text>
    )}
  />
);

const RideInputFields = () => {
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [selectedRide, setSelectedRide] = useState(null);
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    locationName: '',
  });

 
  const requestLocationPermission = () => {
    return new Promise((resolve, reject) => {
      Geolocation.requestAuthorization(
        () => {
          Geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;

              setLocation({ latitude, longitude, locationName: '' });

              await getLocationName(latitude, longitude);

              resolve({ latitude, longitude });
            },
            (error) => {
              console.error('Error getting current location:', error);
              reject(error);
            }
          );
        },
        (error) => {
          console.error('Error requesting location permission:', error);
          reject(error);
        }
      );
    });
  };

  const handleSelectLocation = (place) => {
    setToLocation(place.description);
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
        setFromLocation(address);
      } else {
        console.warn('Location not found');
      }
    } catch (error) {
      console.error('Error fetching location name:', error.message);
    }
  };

  const fetchNearbyPlaces = async (latitude, longitude) => {
    try {
      const apiKey = 'AIzaSyB7r1hAiBtvcqXYL4HWhW4WcXEBb58erVI';
      const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=500&type=restaurant&key=${apiKey}`;

      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data)
      setNearbyPlaces(data.results);
    } catch (error) {
      console.error('Error fetching nearby places:', error.message);
    }
  };

  useEffect(() => {
    const loadCurrentLocation = async () => {
      try {
        // Request location permission and get current location
        const currentLocation = await requestLocationPermission();

        // Fetch nearby places using obtained location
        fetchNearbyPlaces(currentLocation.latitude, currentLocation.longitude);
      } catch (error) {
        console.error('Error getting current location:', error.message);
      }
    };

    // Load current location on component mount
    loadCurrentLocation();
  }, []);

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
              currency: 'INR',
              key: 'rzp_test_P9GGaAXRTQMmea',
              name: 'SpotsVista',
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
        <TextInput
          placeholder="Type to set location"
          value={toLocation}
          onChangeText={(text) => setToLocation(text)}
        />

        {/* Display a list of nearby places */}
        <NearbyPlacesList nearbyPlaces={nearbyPlaces} handleSelectLocation={handleSelectLocation} />

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
      <GooglePlacesAutocomplete
        placeholder="Search"
        onPress={(data, details = null) => {
          handleSelectLocation(data);
        }}
        query={{
          key: 'AIzaSyB7r1hAiBtvcqXYL4HWhW4WcXEBb58erVI',
          language: 'en',
        }}
        nearbyPlacesAPI="GooglePlacesSearch"
        enablePoweredByContainer={false}
        debounce={300}
      />

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
