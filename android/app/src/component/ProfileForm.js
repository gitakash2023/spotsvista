import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { TextInput, Button, RadioButton } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const ProfileForm = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegistration = async () => {
    try {
      setLoading(true);
      await firestore().collection('userProfile').add({
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        age: age,
        phoneNumber: phoneNumber,
      });
      setLoading(false);
      navigation.navigate('WelcomeScreen');
      console.log('Data added to Firestore successfully!');
    } catch (error) {
      console.error('Error adding data to Firestore:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Setup your SpotsVista account</Text>
      <Text style={styles.description}>Your name helps drivers identify you.</Text>
      <Text style={styles.description2}>An email address lets us share trip receipts</Text>

      <TextInput
        label="First Name"
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
        style={styles.input}
        // theme={{ colors: { primary: 'blue', background: 'lightgrey' } }}
      />

      <TextInput
        label="Last Name"
        value={lastName}
        onChangeText={(text) => setLastName(text)}
        style={styles.input}
        // theme={{ colors: { primary: 'blue', background: 'lightgrey' } }}
      />

      <RadioButton.Group onValueChange={(value) => setGender(value)} value={gender}>
        <View style={styles.radioButtonContainer}>
          <RadioButton.Item label="Male" value="male" />
          <RadioButton.Item label="Female" value="female" />
          {/* Add more gender options as needed */}
        </View>
      </RadioButton.Group>

      <TextInput
        label="Age"
        value={age}
        onChangeText={(text) => setAge(text)}
        keyboardType="numeric"
        style={styles.input}
        // theme={{ colors: { primary: 'blue', background: 'lightgrey' } }}
      />

      <TextInput
        label="Phone Number"
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
        keyboardType="numeric"
        maxLength={10}
        style={styles.input}
        // theme={{ colors: { primary: 'blue', background: 'lightgrey' } }}
      />

      {loading ? (
        <ActivityIndicator style={styles.activityIndicator} size="large" color="blue" />
      ) : (
        <Button
          mode="contained"
          onPress={handleRegistration}
          style={styles.button}
          // style={{ ...styles.button, backgroundColor: 'black', color: 'black' }}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Save profile</Text>
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  input: {
    marginBottom: 10,
    backgroundColor: 'white',
  },
  button: {
    marginTop: 20,
    // backgroundColor: '',
  },
  description: {
    fontSize: 14,
    fontWeight: 'normal',
    color: 'black',
  },
  description2: {
    fontSize: 14,
    fontWeight: 'normal',
    marginBottom: 20,
    color: 'black',
  },
  radioButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 8,
  },
  activityIndicator: {
    marginTop: 20,
  },
});

export default ProfileForm;
