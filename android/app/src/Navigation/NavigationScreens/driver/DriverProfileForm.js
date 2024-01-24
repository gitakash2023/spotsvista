// DriverProfileForm.js
import React, { useState, useRef } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { TextInput, Button, RadioButton, ActivityIndicator } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const DriverProfileForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const handleSaveProfile = async () => {
    try {
      setLoading(true);

      // Add your Firestore collection and document structure as needed
      await firestore().collection('driverProfile').add({
        firstName,
        lastName,
        gender,
        age,
        phoneNumber,
      });

      console.log('Driver profile saved successfully!');
      
      // After successful save, navigate to the DriverWelcome screen
      navigation.navigate('DriverWelcome');

    } catch (error) {
      console.error('Error saving driver profile:', error.message);
     
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
     
      <Image
        source={require('../../../Image/account.png')}
        style={styles.image}
      />

      <TextInput
        label="First Name"
        value={firstName}
        onChangeText={setFirstName}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Last Name"
        value={lastName}
        onChangeText={setLastName}
        mode="outlined"
        style={styles.input}
      />
      <RadioButton.Group onValueChange={(value) => setGender(value)} value={gender}>
        <View style={styles.radioButtonContainer}>
          <RadioButton.Item label="Male" value="male" />
          <RadioButton.Item label="Female" value="female" />
       
        </View>
      </RadioButton.Group>
      <TextInput
        label="Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        mode="outlined"
        style={styles.input}
      />
      <Button mode="contained" onPress={handleSaveProfile} style={styles.button} disabled={loading}>
        {loading ? <ActivityIndicator animating={true} color="white" /> : 'Save Profile'}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  image: {
    width: 100, 
    height: 100, 
    alignSelf: 'center',
    marginBottom: 16,
  },
  input: {
    marginVertical: 8,
  },
  button: {
    marginTop: 16,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 8,
  },
});

export default DriverProfileForm;
