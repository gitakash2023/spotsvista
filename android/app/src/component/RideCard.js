import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import RazorpayCheckout from 'react-native-razorpay';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const RideCard = () => {
 const navigation = useNavigation();
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
    return distance ? distance * pricePerKilometer : 0;
  };

  const handleCardPress = (car) => {
    const ridePrice = calculateRidePrice().toFixed(2);
    const message = `Do you want to ride with ${car.name} from ${origin.locationName} to ${destination} with a ride price of ${ridePrice}?`;

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
            // Call the function to initiate Razorpay payment
            initiateRazorpayPayment(car.name, ridePrice);
          },
        },
      ],
      { cancelable: false }
    );
  };

  const initiateRazorpayPayment = (carName, ridePrice) => {
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
        // Update ride history in Firebase
        updateRideHistory(carName, ridePrice);
        console.log("added ride history")
      })
      .catch((error) => {
        console.error('Razorpay Error:', error.description);
      });
  };

  const updateRideHistory = async (carName, ridePrice) => {
    const user = auth().currentUser;

    if (user) {
      try {
       
        await firestore().collection('ridehistory').add({
          userId: user.uid,
          carName,
          ridePrice,
          origin: origin.locationName,
          destination: destination,
          timestamp: firestore.FieldValue.serverTimestamp(),
        });
        navigation.navigate("HomeScreen")

       
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
});

export default RideCard;
