import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import Header from '../component/Header';

import NearBySpots from '../component/NearBySpots';
import ChatScreen from '../Navigation/NavigationScreens/ChatScreen';
import DriverProfileForm from '../Navigation/NavigationScreens/driver/DriverProfileForm';
import SignupScreen from '../Navigation/NavigationScreens/SignupScreen ';
import ProfileForm from '../component/ProfileForm';




const Home = () => {
  return (
    <>

   
      <Header />
      
      <NearBySpots />
    </>
  );
};


  

export default Home;
