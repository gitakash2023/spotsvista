import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const Activity = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Activity</Text>
      <Text style={styles.upcomingText}>Upcoming</Text>

      <View style={styles.detailsContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.detailsText}>You have no upcoming trips</Text>
          <View style={styles.reserveContainer}>
            <Text style={styles.detailsText}>Reserve your trip</Text>
            <Image source={require('../Image/right-arrow.png')} style={styles.arrowIcon} />
          </View>
        </View>
        <Image source={require('../Image/graycar.jpg')} style={styles.image} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
  },
  heading: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'black',
  },
  upcomingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 16,
  },
  detailsContainer: {
    flexDirection: 'row',
    marginTop: 16,
    padding: 10,
    backgroundColor: 'rgba(211, 211, 211, 0.3)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(128, 128, 128, 0.5)',
  },
  textContainer: {
    flex: 1,
    margin: 10,
  },
  detailsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    margin: 10,
  },
  reserveContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowIcon: {
    width: 20,
    height: 20,
  
    marginTop:5
  },
  image: {
    width: 150,
    height: 100,
    marginLeft: 16,
    borderRadius: 8,
    marginTop: 13,
  },
});

export default Activity;
