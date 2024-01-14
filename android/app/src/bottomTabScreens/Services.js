import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

const Services = () => {
  const servicesData1 = [
    {
      id: 1,
      title: 'Trip',
      image: require('../Image/car3.jpg'),
    },
    {
      id: 2,
      title: 'Intercity',
      image: require('../Image/carcar.webp'),
    },
  ];

  const servicesData2 = [
    {
      id: 3,
      title: 'Packages',
      image: require('../Image/packages.jpg'),
    },
    {
      id: 4,
      title: 'Rentals',
      image: require('../Image/rentals.jpg'),
    },
  ];
  const servicesData3 = [
    {
      id: 5,
      title: 'Shuttle',
      image: require('../Image/shuttle.jpg'),
    },
    {
      id: 6,
      title: 'Reserve',
      image: require('../Image/time.jpg'),
    },
  ];

  const renderServiceCard = service => (
    <TouchableOpacity key={service.id} style={styles.serviceCard}>
      <Image source={service.image} style={styles.serviceImage} />
      <Text style={styles.serviceTitle}>{service.title}</Text>
    </TouchableOpacity>
  );

  return (
    <>
      <View></View>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Services</Text>
        <Text style={styles.slogan}> Go any where, get everything</Text>
        <View style={styles.row}>{servicesData1.map(renderServiceCard)}</View>
        <View style={styles.row}>{servicesData2.map(renderServiceCard)}</View>
        <View style={styles.row}>{servicesData3.map(renderServiceCard)}</View>
      </ScrollView>
    </>
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  serviceCard: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 8,
  },
  slogan: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 5,
    marginTop: 16,
  },
  serviceImage: {
    width: 140,
    height: 100,
    marginBottom: 8,
  },
  serviceTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default Services;
