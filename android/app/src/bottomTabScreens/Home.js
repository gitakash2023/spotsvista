import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Header from '../component/Header';
import Cards from '../component/Cards';
import NearBySpots from '../component/NearBySpots';





const Home = () => {
  return (
  <>
  <Header/>
     {/* <Cards/> */}
    
    <NearBySpots/>
    
    </>
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
