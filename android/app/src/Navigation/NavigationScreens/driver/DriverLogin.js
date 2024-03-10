import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const DriverLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const isMounted = useRef(true);
  const navigation = useNavigation();

  const handleLogin = async () => {
    setLoading(true);

    try {
      await auth().signInWithEmailAndPassword(email, password);
      console.log('User logged in successfully!');
      navigation.navigate("DriverHome")
      // You can navigate to the home screen or any other screen upon successful login
    } catch (error) {
      console.error('Error logging in:', error.message);
      // Handle the error as needed
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  };

  // Cleanup the component to avoid state updates on an unmounted component
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleSignupPress = () => {
    navigation.navigate('DriverSignup');
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../../Image/contactnew.png")} style={styles.logo} />
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
      <Button mode="contained" onPress={handleLogin} style={styles.button} disabled={loading}>
        {loading ? <ActivityIndicator color="white" /> : 'Login'}
      </Button>
      <Text style={styles.signupText} onPress={handleSignupPress}>
        Don't have an account? Sign Up
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
    backgroundColor: '#0080ff', // Custom color for the button
  },
  signupText: {
    marginTop: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#0080ff', // Custom color for the text
  },
});

export default DriverLogin;
