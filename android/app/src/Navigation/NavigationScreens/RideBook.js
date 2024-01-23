import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { useSelector } from 'react-redux';

const RideBook = () => {
  const destinationPlace = useSelector((state) => state.destination.destinationPlace);
  const { locationName, latitude, longitude } = useSelector((state) => state.location);

  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [distance, setDistance] = useState(null);

  const OPEN_CAGE_API_KEY = '4a92e86c6073444a93c20b73f2f58285';

  const fetchDestinationCoordinates = async (placeName) => {
    try {
      const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
        placeName
      )}&key=${OPEN_CAGE_API_KEY}`;

      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.status.code === 200 && data.total_results > 0) {
        const location = data.results[0].geometry;
        return {
          latitude: location.lat,
          longitude: location.lng,
        };
      } else {
        console.error('OpenCage API request failed:', data);
        console.warn(`No results found for place: ${placeName}`);
        return null;
      }
    } catch (error) {
      console.error('Error fetching destination coordinates:', error);
      return null;
    }
  };

  useEffect(() => {
    const fetchDestination = async () => {
      const destinationCoords = await fetchDestinationCoordinates(destinationPlace);
      if (destinationCoords) {
        setDestination(destinationCoords);
      }
    };

    const originCoords = { latitude: latitude, longitude: longitude };
    setOrigin(originCoords);

    fetchDestination();
  }, [locationName, destinationPlace]);

  useEffect(() => {
    if (origin && destination) {
      const calculatedDistance = calculateDistance(origin, destination);
      setDistance(calculatedDistance);
    }
  }, [origin, destination]);

  const calculateDistance = (startCoords, endCoords) => {
    const R = 6371;
    const dLat = deg2rad(endCoords.latitude - startCoords.latitude);
    const dLon = deg2rad(endCoords.longitude - startCoords.longitude);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(startCoords.latitude)) *
        Math.cos(deg2rad(endCoords.latitude)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

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
          placeholderTextColor="black"
          value={locationName}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Destination Place"
          placeholderTextColor="black"
          value={destinationPlace}
          
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

          {distance !== null && (
            <Text style={styles.distanceText}>{`Distance: ${Number(distance.toFixed(2))} km`}</Text>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // margin: 10,
  },
  input: {
    // flex: 1,
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    paddingLeft: 10,
    color:"black"
  },
  map: {
    // flex: 1,
    height: 250,
  },
  distanceText: {
    fontSize: 16,
    marginTop: 10,
    color: "black",
  },
});

export default RideBook;
