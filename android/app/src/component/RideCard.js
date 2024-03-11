import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import RazorpayCheckout from 'react-native-razorpay';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// CustomPopup Component
const CustomPopup = ({ visible, onClose, onSelectDriver, driversList }) => {
  if (!visible) return null;

  return (
    <View style={styles.popupContainer}>
      <View style={styles.popup}>
        <Text style={styles.popupTitle}>Select Driver</Text>
        <ScrollView style={styles.driverList}>
          {driversList.map((driver) => (
            <TouchableOpacity key={driver.id} onPress={() => onSelectDriver(driver)}>
              <Text style={styles.driverName}>{driver.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// RideCard Component
const RideCard = () => {
  const navigation = useNavigation();
  const [selectedCar, setSelectedCar] = useState(null);
  const [driversList, setDriversList] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);

  const cars = [
    { id: 1, name: 'UrbanRideExpress', imageUri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJbpcOjELFQj6z383VZEmnzz-1zxpx-tFo7FeAPOs9r5CSwXFqJoQ2HdFpSMze4kd3x6M&usqp=CAU' },
    { id: 2, name: 'CityNavigator', imageUri: 'https://www.picng.com/upload/taxi/png_taxi_23235.png' },
    { id: 3, name: 'MetroCruise', imageUri: 'https://www.picng.com/upload/taxi/png_taxi_23235.png' },
  ];

  const origin = useSelector((state) => state.location);
  const destination = useSelector((state) => state.destination.destinationPlace);
  const distance = useSelector((state) => state.distance.distance);

  const calculateRidePrice = () => {
    const pricePerKilometer = 10;
    return distance ? distance * pricePerKilometer : 10;
  };

  const fetchDriversList = async () => {
    const drivers = await firestore().collection('allUsers').where('role', '==', 'driver').get();
    const driversData = drivers.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setDriversList(driversData);
  };

  useEffect(() => {
    fetchDriversList();
  }, []);

  const handleCardPress = async (car) => {
    setSelectedCar(car);
    setPopupVisible(true);
  };

  const handleDriverSelection = (driver) => {
    const ridePrice = calculateRidePrice().toFixed(2);
    const message = `Do you want to ride with ${selectedCar.name} from ${origin.locationName} to ${destination} with a ride price of ${ridePrice}?`;

    Alert.alert(
      'Ride Confirmation',
      message,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => {
            initiateRazorpayPayment(selectedCar.name, ridePrice, driver.name, driver.id);
          },
        },
      ],
      { cancelable: false }
    );
  };

  const initiateRazorpayPayment = (carName, ridePrice, driverName, driverId) => {
    const options = {
      description: `Payment for your ride with ${carName}`,
      currency: 'INR',
      key: 'rzp_test_P9GGaAXRTQMmea',
      amount: (ridePrice * 100).toFixed(0),
      name: 'SpotsVista',
      theme: { color: '#F37254' },
    };

    RazorpayCheckout.open(options)
      .then((data) => {
        console.log(`Payment Successful: ${JSON.stringify(data)}`);
        updateRideHistory(carName, ridePrice, driverName, driverId);
      })
      .catch((error) => {
        console.error('Razorpay Error:', error.description);
      });
  };

  const updateRideHistory = async (carName, ridePrice, driverName, driverId) => {
    const user = auth().currentUser;

    if (user) {
      try {
        await firestore().collection('ridehistory').add({
          userId: user.uid,
          carName,
          ridePrice,
          driverName,
          driverId, // Add driverId to ride history
          origin: origin.locationName,
          destination: destination,
          timestamp: firestore.FieldValue.serverTimestamp(),
        });
        navigation.navigate("HomeScreen");
      } catch (error) {
        console.error('Error updating ride history:', error.message);
      }
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        {cars.map((car) => (
          <TouchableOpacity key={car.id} onPress={() => handleCardPress(car)}>
            <View style={styles.card}>
              <Image source={{ uri: car.imageUri }} style={styles.cardImage} />
              <Text style={styles.cardTitle}>{car.name}</Text>
              <Text style={styles.cardPrice}>{`Ride Price: ${calculateRidePrice().toFixed(2)}`}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <CustomPopup
        visible={popupVisible}
        onClose={() => setPopupVisible(false)}
        onSelectDriver={handleDriverSelection}
        driversList={driversList}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  card: {
    width: 370,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 3,
    margin: 10,
    alignItems: 'center',
  },
  cardImage: {
    height: 170,
    width: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 10,
  },
  cardPrice: {
    fontSize: 14,
    color: 'green',
    marginBottom: 10,
  },
  popupContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: windowWidth,
    height: windowHeight,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
  },
  popup: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  popupTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color:"black"
  },
  driverList: {
    maxHeight: 200,
    marginBottom: 10,
  },
  driverName: {
    fontSize: 16,
    marginBottom: 20,
    color:"black"
  },
  closeButton: {
    backgroundColor: 'red',
    borderRadius: 5,
    padding: 10,
  },
  closeButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default RideCard;
