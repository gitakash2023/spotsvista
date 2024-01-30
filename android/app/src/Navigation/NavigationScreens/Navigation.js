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
import DriverSignup from './driver/DriverSignup';
import DriverLogin from './driver/DriverLogin';
import DriverProfileForm from './driver/DriverProfileForm';
import SelectionScreen from './SelectionScreen';
import DriverWelcome from './driver/DriverWelcom';
import DriverHome from './driver/DriverHome';
import PreferredDrivers from './PrefferedDrivers';
import ChatScreen from './UserChat';

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
          options={{
            headerStyle: {
              height: 40,
            },
            headerTitleStyle: {
              fontSize: 16,
            },
          }}
        />
        <Stack.Screen
          name="SignupScreen"
          component={SignupScreen}
          options={{
            headerStyle: {
              height: 40,
            },
            headerTitleStyle: {
              fontSize: 16,
            },
          }}
        />
        <Stack.Screen
          name="ProfileForm"
          component={ProfileForm}
          options={{
            headerStyle: {
              height: 40,
            },
            headerTitleStyle: {
              fontSize: 16,
            },
          }}
        />
        <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={{
            headerStyle: {
              height: 40,
            },
            headerTitleStyle: {
              fontSize: 16,
            },
          }}
        />
        <Stack.Screen
          name="DriverWelcome"
          component={DriverWelcome}
          options={{
            headerStyle: {
              height: 40,
            },
            headerTitleStyle: {
              fontSize: 16,
            },
          }}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
           headerShown:false

          }}
        />
        <Stack.Screen
          name="RideBook"
          component={RideBook}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SelectionScreen"
          component={SelectionScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DriverSignup"
          component={DriverSignup}
          options={{
            headerStyle: {
              height: 40,
            },
            headerTitleStyle: {
              fontSize: 16,
            },
          }}
        />
        <Stack.Screen
          name="DriverLogin"
          component={DriverLogin}
          options={{
            headerStyle: {
              height: 40,
            },
            headerTitleStyle: {
              fontSize: 16,
            },
          }}
        />

        <Stack.Screen
          name="DriverProfileForm"
          component={DriverProfileForm}
          options={{
            headerStyle: {
              height: 40,
            },
            headerTitleStyle: {
              fontSize: 16,
            },
          }}
        />
         <Stack.Screen
          name="DriverHome"
          component={DriverHome}
          options={{
            headerStyle: {
              height: 40,
            },
            headerTitleStyle: {
              fontSize: 16,
            },
          }}
        />
        <Stack.Screen
          name="PreferredDrivers"
          component={PreferredDrivers}
          options={{
            headerStyle: {
              height: 40,
            },
            headerTitleStyle: {
              fontSize: 16,
            },
          }}
        />
         <Stack.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={{
            headerStyle: {
              height: 40,
            },
            headerTitleStyle: {
              fontSize: 16,
            },
          }}
        />
      </Stack.Navigator>
      
    </NavigationContainer>
  );
};
export default Navigation;
