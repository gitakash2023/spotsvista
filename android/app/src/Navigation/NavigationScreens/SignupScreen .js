import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { TextInput, Text, Button, ActivityIndicator } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'; 

const SignupScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLodingSignUp, setIsLodingSignUp] = useState(false);

  const handleCancelIconPressEmail = () => {
    setEmail('');
  };

  const handleCancelIconPressPassword = () => {
    setPassword('');
  };

  const navigateToLoginScreen = () => {
    navigation.navigate('LoginScreen');
  };

  const handleSignup = () => {
    setIsLodingSignUp(true);
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async (userCredential) => {
        const additionalUserInfo = {
          email: userCredential.user.email,
          role: 'user',
        };
        await firestore().collection('users').doc(userCredential.user.uid).set(additionalUserInfo);

        Alert.alert('User account created & signed in!');
        setIsLodingSignUp(false);
        setEmail('');
        setPassword('');
        navigation.navigate('ProfileForm');
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          Alert.alert('That email address is invalid!');
        }

        setIsLodingSignUp(false);
      });
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
          label="Enter Your E-mail"
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

      <View style={styles.signupButtonContainer}>
        {isLodingSignUp ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <Button
            mode="contained"
            onPress={handleSignup}
            style={styles.signupButton}>
            Sign up
          </Button>
        )}
      </View>
      <View>
        <TouchableOpacity onPress={navigateToLoginScreen}>
          <Text style={styles.loginText}>
            Already have an account? Login here!
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
    // backgroundColor:"white"
  },
  cancelIcon: {
    width: 20,
    height: 20,
    marginRight: 20,
    marginTop: 15,
  },
  signupButtonContainer: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  signupButton: {
    borderRadius: 5,
  },
  loginText: {
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default SignupScreen;
