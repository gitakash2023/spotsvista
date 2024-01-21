import React from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';


const NearBySpots = () => {
  const { locationName, latitude, longitude, markers, nearbyPlaces } = useSelector((state) => state.location);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.row}>
        {item.image && <Image source={{ uri: item.image }} style={styles.image} />}
        <View style={styles.details}>
          <Text style={styles.name}>{item.name}</Text>
          {/* <Text style={styles.description}>{item.description}</Text> */}
          <Text style={styles.rating}>Rating: {item.rating}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <>
    <View>
      <Text style={styles.name}>
Top NearBySpots 
      </Text>
    </View>
    <FlatList
      data={nearbyPlaces}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
    />
    </>
  );
};

const styles = StyleSheet.create({
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
  description: {
    fontSize: 16,
    marginBottom: 5,
  },
  rating: {
    fontSize: 14,
    color: 'black',
  },
});

export default NearBySpots;
