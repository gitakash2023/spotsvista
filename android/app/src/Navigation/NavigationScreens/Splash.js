import {View, Text, Image, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const Splash = () => {
  const navigation = useNavigation();
  useEffect(() => {
    // Check if the user is already authenticated (registered)
    const user = auth().currentUser;
    // Simulate a delay (3 seconds) before navigating to the appropriate screen
    setTimeout(() => {
      if (user) {
        // User is already registered, navigate to Home screen
        navigation.navigate('HomeScreen');
      } else {
        // User is not registered, navigate to Signup screen
        navigation.navigate('SignupScreen');
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
    width: '100%', // Set the image width
    height: ' 100%', // Set the image height
    resizeMode: 'contain', // Adjust the resizeMode as needed
  },
  splashImageContainer: {
    marginTop: 50,
    alignItems: 'center', // Center horizontally
  },
});
export default Splash;
