import {View, Text, Image} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../../bottomTabScreens/Home';
import Services from '../../bottomTabScreens/Services';
import Activity from '../../bottomTabScreens/Activity';
import Account from '../../bottomTabScreens/Account';
import Chat from '../../bottomTabScreens/Chat';

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconSource;

          if (route.name === 'Home') {
            iconSource = !focused
              ? require('../../Image/home.png')
              : require('../../Image/home_filled.png');
          } else if (route.name === 'Services') {
            iconSource = !focused
              ? require('../../Image/category.png')
              : require('../../Image/category_filled.png');
          } else if (route.name === 'Activity') {
            iconSource = !focused
              ? require('../../Image/notification.png')
              : require('../../Image/notification_filled.png');
          } else if (route.name === 'Account') {
            iconSource = !focused
              ? require('../../Image/account.png')
              : require('../../Image/account_filled.png');
          } else if (route.name === 'Chat') {
            iconSource = !focused
              ? require('../../Image/chat.png')
              : require('../../Image/chat_filled.png');
          }

          return (
            <Image
              source={iconSource}
              style={{
                width: size,
                height: size,
                tintColor: color,
              }}
            />
          );
        },
        tabBarLabel: ({focused, color}) => {
          let label;
          if (route.name === 'Home') {
            label = 'Home';
          } else if (route.name === 'Services') {
            label = 'Services';
          } else if (route.name === 'Activity') {
            label = 'Activity';
          } else if (route.name === 'Account') {
            label = 'Account';
          } else if (route.name === 'Chat') {
            label = 'Chat';
          }

          return (
            <Text
              style={{
                color: color,
                textAlign: 'center',
                fontSize: 11,
              }}>
              {label}
            </Text>
          );
        },
      })}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Services"
        component={Services}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Activity"
        component={Activity}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeScreen;
