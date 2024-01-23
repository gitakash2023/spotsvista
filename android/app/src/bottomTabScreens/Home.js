import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import Header from '../component/Header';

import NearBySpots from '../component/NearBySpots';
import ChatScreen from '../Navigation/NavigationScreens/ChatScreen';



const Home = () => {
  return (
    <>
   
   <ChatScreen/>
      {/* <Header />
      
      <NearBySpots /> */}
    </>
  );
};


  

export default Home;
