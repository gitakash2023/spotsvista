import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput, Text, Button, ActivityIndicator } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const LoginScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLodingLogin, setIsLodingLogin] = useState(false);

  const handleCancelIconPressEmail = () => {
    setEmail('');
  };

  const handleCancelIconPressPassword = () => {
    setPassword('');
  };

  const handleLogin = () => {
    setIsLodingLogin(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('Welcome ');
        setIsLodingLogin(false);
        navigation.navigate('HomeScreen');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      })
      .finally(() => {
        setIsLodingLogin(false);
      });
  };

  const navigateToSignup = () => {
    navigation.navigate('SignupScreen');
  };

  return (
    <View style={styles.container}>
      
      <View>
        <Image
          source={require('../../Image/contactnew.png')}
          style={styles.avatar}
        />
      </View>
      <View style={styles.regTextContainer}>
        <Text style={styles.regText}>
          You will log in after verification if you are not registered
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          label="Enter Your Email"
          value={email}
          placeholderTextColor="black"
          onChangeText={text => setEmail(text)}
          style={styles.textInput}
        />
        {email.length > 0 && (
          <TouchableOpacity onPress={handleCancelIconPressEmail}>
            <Image
              source={require('../../Image/cancelIcon.png')}
              style={styles.cancelIcon}
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={[styles.inputContainer, { marginTop: 10 }]}>
        <TextInput
          label="Enter Your Password"
          value={password}
          onChangeText={text => setPassword(text)}
          placeholderTextColor="black"
          style={styles.textInput}
          secureTextEntry
        />
        {password.length > 0 && (
          <TouchableOpacity onPress={handleCancelIconPressPassword}>
            <Image
              source={require('../../Image/cancelIcon.png')}
              style={styles.cancelIcon}
            />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.loginButtonContainer}>
        {isLodingLogin ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <Button
            mode="contained"
            onPress={handleLogin}
            style={styles.loginButton}>
            Log in
          </Button>
        )}
      </View>
      <View>
        <TouchableOpacity onPress={navigateToSignup}>
          <Text style={styles.registerText}>
            Don't have a clarity account? Register now
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    marginTop: 30,
    marginLeft: 10,
  },
  headerText: {
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontSize: 18,
    marginRight: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    marginTop: 15,
    alignSelf: 'center',
  },
  regTextContainer: {
    marginLeft: 10,
    marginTop: 10,
  },
  regText: {
    color: 'black',
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    marginLeft: 10,
  },
  textInput: {
    flex: 1,
  },
  cancelIcon: {
    width: 20,
    height: 20,
    marginRight: 20,
    marginTop: 15,
  },
  loginButtonContainer: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  loginButton: {
    borderRadius: 5,
  },
  registerText: {
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default LoginScreen;
