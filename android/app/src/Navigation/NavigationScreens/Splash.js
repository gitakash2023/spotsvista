import React, {useEffect} from 'react';
import {View, ActivityIndicator} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function SplashScreen({navigation}) {
  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = auth().currentUser;
        if (currentUser) {
          const userSnapshot = await firestore()
            .collection('allUsers')
            .doc(currentUser.uid)
            .get();
          const userData = userSnapshot.data();
          if (userData.role === 'user') {
            navigation.navigate('HomeScreen');
          } else if (userData.role === 'driver') {
            navigation.navigate('DriverHome');
          }
        } else {
          navigation.navigate('SelectionScreen');
        }
      } catch (error) {
        console.error('Error checking user:', error);
      }
    };

    setTimeout(() => {
      checkUser();
    }, 2000);
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" color="#00ff00" />
    </View>
  );
}
