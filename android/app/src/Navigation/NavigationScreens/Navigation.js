import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {NavigationContainer} from '@react-navigation/native';
import Splash from './Splash';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen ';
import HomeScreen from './HomeScreen';
import ProfileForm from '../../component/ProfileForm';
import WelcomeScreen from './WelcomeScreen';
import RideBook from './RideBook';

const Stack = createStackNavigator();
const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignupScreen"
          component={SignupScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ProfileForm"
          component={ProfileForm}
          options={{headerShown: false}}
        />
         <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{headerShown: false}}
        />
         <Stack.Screen
          name="RideBook"
          component={RideBook}
          // options={{headerShown: false}}
        />
       
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Navigation;
