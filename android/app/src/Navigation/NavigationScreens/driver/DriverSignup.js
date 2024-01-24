// DriverSignup.js
import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const DriverSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const isMounted = useRef(true);
  const navigation = useNavigation();

  const handleSignup = async () => {
    setLoading(true);

    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);

      navigation.navigate('DriverProfileForm');

      console.log('User signed up successfully!', userCredential.user.uid);
    } catch (error) {
      console.error('Error signing up:', error.message);
      // Handle the error as needed
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  };

  // Cleanup the component to avoid state updates on unmounted component
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleLoginPress = () => {
    navigation.navigate('DriverLogin');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../../Image/account.png')} style={styles.logo} />
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        mode="outlined"
        style={styles.input}
      />
      <Button mode="contained" onPress={handleSignup} style={styles.button} disabled={loading}>
        {loading ? <ActivityIndicator color="white" /> : 'Sign Up'}
      </Button>
      <Text style={styles.loginText} onPress={handleLoginPress}>
        Already have an account? Login
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  logo: {
    width: 150, 
    height: 150, 
    alignSelf: 'center',
    marginBottom: 16,
  },
  input: {
    marginVertical: 8,
  },
  button: {
    marginTop: 16,
  },
  loginText: {
    marginTop: 16,
    textAlign: 'center',
    color: 'blue',
  },
});

export default DriverSignup;
