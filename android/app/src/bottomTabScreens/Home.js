import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CardList1 from '../component/CardList1';
import CardList2 from '../component/CardList2';
import CardList3 from '../component/CardList3';
import RideInputFields from '../component/RideInputFields';


const Home = () => {
  return (
    <ScrollView style={styles.container}>
    
      <Text style={styles.heading}>SpotsVista</Text>
      <RideInputFields/>
     
      <Text style={styles.heading1}>Commute smarter</Text>
      <CardList1 />
      <Text style={styles.heading1}>Save every day</Text>
      <CardList2 />
      <Text style={styles.heading1}>More ways to use SpotsVista</Text>
      <CardList3/>
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    fontStyle: 'italic',
    marginBottom: 8,
  },
  heading1: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 16,
    marginBottom: 8,
  },
});

export default Home;
