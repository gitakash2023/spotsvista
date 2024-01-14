// Card.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Card = ({ data }) => {
  const { title, description, imageUrl } = data;

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>
          {title} <Image source={require('../Image/right-arrow.png')} style={styles.arrowIcon} />
        </Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'white',
    // elevation: 3,
    margin: 10,
    // overflow: 'hidden',
    height: 200,
    // borderRadius: 10, 
  },
  image: {
    flex: 1,
    width: '100%',
    height: 130,
    resizeMode: 'cover',
    borderRadius: 10, 
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    color: 'black',
  },
  arrowIcon: {
    width: 20,
    height: 20,
    alignSelf: 'flex-end',
  },
  description: {
    fontSize: 16,
    color: 'gray',
  },
});

export default Card;
