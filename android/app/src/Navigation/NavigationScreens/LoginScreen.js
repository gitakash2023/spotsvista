import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
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
      <View style={styles.main}>
        <Text style={styles.text}>Condidate</Text>
        <Text style={styles.text}> Sign-In</Text>
      </View>
      <View>
        <Image
          source={require('../../Image/contactnew.png')}
          style={styles.avatar}
        />
      </View>
      <View style={styles.regTextMain}>
        <Text style={styles.regText}>
          You will log in after verification if you are not registered
        </Text>
      </View>
      <View style={styles.inputFieldContainer}>
        <View>
          <TextInput
            placeholder="Enter Your email"
            value={email}
            onChangeText={text => setEmail(text)}
            placeholderTextColor="black"
            style={styles.textInput}></TextInput>
        </View>
        {email.length > 0 && (
          <View>
            <TouchableOpacity onPress={handleCancelIconPressEmail}>
              <Image
                source={require('../../Image/cancelIcon.png')}
                style={[styles.cancelicon, {marginLeft: 30}]}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={[styles.inputFieldContainer, {marginTop: 10}]}>
        <View>
          <TextInput
            placeholder="Enter Your password"
            value={password}
            onChangeText={text => setPassword(text)}
            placeholderTextColor="black"
            style={styles.textInput}></TextInput>
        </View>
        {password.length > 0 && (
          <View>
            <TouchableOpacity onPress={handleCancelIconPressPassword}>
              <Image
                source={require('../../Image/cancelIcon.png')}
                style={styles.cancelicon}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.LoginView}>
        {isLodingLogin ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <TouchableOpacity style={styles.LoginButton} onPress={handleLogin}>
            <Text style={styles.LoginText}>Log in</Text>
          </TouchableOpacity>
        )}
      </View>
      <View>
        <TouchableOpacity onPress={navigateToSignup}>
          <Text style={styles.RegisterText}>
            Don't have a clarity account ? Register now
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  text: {
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  },
  main: {
    marginTop: 50,
    marginLeft: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    marginTop: 15,
  },
  regTextMain: {
    marginLeft: 10,
    marginTop: 10,
  },
  indiaIcon: {
    width: 40,
    height: 40,
  },

  inputFieldContainer: {
    flexDirection: 'row',
    marginTop: 50,
    justifyContent: 'space-between',
    marginLeft: 30,
  },
  textInput: {
   color:"black"
  },
  cancelicon: {
    width: 20,
    height: 20,
    marginRight: 20,
    marginTop: 15,
  },
  LoginButton: {
    margin: 10,
    marginTop: 20,
    backgroundColor: 'black',
    borderRadius: 5,
  },
  LoginText: {
    padding: 15,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'normal',
    fontFamily: 'Roboto',
  },
  RegisterText: {
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold',
    color:"black"
  },
});

export default LoginScreen;
