import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet, Alert } from 'react-native';
import { TextInput, useTheme, Button } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { setDestinationPlace } from '../redux/destinationSlice';
import { useNavigation } from '@react-navigation/native';

const NearBySpots = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  const { nearbyPlaces } = useSelector((state) => state.location);
  const destinationPlace = useSelector((state) => state.destination.destinationPlace);
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPlaces, setFilteredPlaces] = useState([]);

  useEffect(() => {
    const filteredResults = nearbyPlaces.filter((place) =>
      place.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredPlaces(filteredResults);
  }, [searchQuery, nearbyPlaces]);

  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      Alert.alert('Please enter a destination place.');
    } else {
      dispatch(setDestinationPlace(searchQuery));
      navigation.navigate('RideBook');
    }
  };

  const handleSelectDestination = (selectedPlace) => {
    setSearchQuery(selectedPlace);
    dispatch(setDestinationPlace(selectedPlace));
    navigation.navigate('RideBook');
  };

  const renderItem = ({ item }) => (
    <View style={styles.card} onTouchEnd={() => handleSelectDestination(item.name)}>
      <View style={styles.row}>
        {item.image && <Image source={{ uri: item.image }} style={styles.image} />}
        <View style={styles.details}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.rating}>* {item.rating}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <>
      <View style={styles.searchContainer}>
        <TextInput
          label="Search Destination"
          value={searchQuery}
          onChangeText={setSearchQuery}
          theme={{ colors: { primary: theme.colors.primary } }}
        />
       {searchQuery && <Button mode="contained" onPress={handleSearch} style={styles.searchButton}>
          Search
        </Button>} 
      </View>

      <View>
        <Text style={styles.name}>Top NearBySpots</Text>
      </View>

      <FlatList
        data={searchQuery ? filteredPlaces : nearbyPlaces}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    margin: 10,
  },
  searchButton: {
    marginTop: 10,
  },
  card: {
    margin: 10,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  row: {
    flexDirection: 'row',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  rating: {
    fontSize: 14,
    color: 'black',
  },
});

export default NearBySpots;
