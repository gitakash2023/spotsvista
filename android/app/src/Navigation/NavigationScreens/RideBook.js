import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { useSelector } from 'react-redux';

const RideBook = () => {
  const locationName = useSelector((state) => state.location.locationName);
  const destinationPlace = useSelector((state) => state.destination.destinationPlace);

  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [distance, setDistance] = useState(null);

  useEffect(() => {
    
    const originCoords = { latitude: 37.78825, longitude: -122.4324 };
    const destinationCoords = { latitude: 37.7749, longitude: -122.4194 };

    setOrigin(originCoords);
    setDestination(destinationCoords);

    // Calculate distance using Haversine formula
    const calculatedDistance = calculateDistance(originCoords, destinationCoords);
    setDistance(calculatedDistance);
  }, [locationName, destinationPlace]);

  // Haversine formula to calculate distance between two coordinates in kilometers
  const calculateDistance = (startCoords, endCoords) => {
    const R = 6371; 
    const dLat = deg2rad(endCoords.latitude - startCoords.latitude);
    const dLon = deg2rad(endCoords.longitude - startCoords.longitude);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(startCoords.latitude)) * Math.cos(deg2rad(endCoords.latitude)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers

    return distance;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Location Name"
          value={locationName}
          onChangeText={(text) => {/* Implement logic to update locationName */}}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Destination Place"
          value={destinationPlace}
          onChangeText={(text) => {/* Implement logic to update destinationPlace */}}
        />
      </View>

      {origin && destination && (
        <>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={{
              ...origin,
              latitudeDelta: Math.abs(destination.latitude - origin.latitude) * 2,
              longitudeDelta: Math.abs(destination.longitude - origin.longitude) * 2,
            }}
          >
            <Marker coordinate={origin} title="Origin" />
            <Marker coordinate={destination} title="Destination" />

            <Polyline
              coordinates={[origin, destination]}
              strokeColor="#000"
              strokeWidth={2}
            />
          </MapView>

          <Text style={styles.distanceText}>{`Distance: ${distance.toFixed(2)} km`}</Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
    paddingLeft: 10,
  },
  map: {
    flex: 1,
  },
  distanceText: {
    fontSize: 16,
    margin: 10,
  },
});

export default RideBook;
