import {View, Text, Image, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const Splash = () => {
  const navigation = useNavigation();
  useEffect(() => {
    const user = auth().currentUser;
    setTimeout(async () => {
      if (user) {
        const userDoc = await firestore()
          .collection('users')
          .doc(user.uid)
          .get();
        const userRole = userDoc.data()?.role;
        if (userRole === 'driver') {
          navigation.navigate('DriverHome');
        } else {
          navigation.navigate('HomeScreen');
        }
      } else {
        navigation.navigate('SelectionScreen');
      }
    }, 2000);
  }, []);

  return (
    <View>
      <View style={styles.splashImageContainer}>
        <Image
          source={require('../../Image/splashTaxi.jpg')}
          style={styles.splashIcon}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  splashIcon: {
    width: '100%',
    height: ' 100%',
    resizeMode: 'contain',
  },
  splashImageContainer: {
    marginTop: 50,
    alignItems: 'center',
  },
});

export default Splash;
