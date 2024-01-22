import React, { useState } from 'react';
import { View, Text, StyleSheet ,ActivityIndicator} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';



const ProfileForm = () => {
    const navigation = useNavigation();
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const handleRegistration = async () => {
   
    try {
        setLoading(true)
      await firestore().collection('users').add({
        fullName: fullName,
        phoneNumber: phoneNumber,
      });
      setLoading(false)
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
        label="Full Name"
        value={fullName}
        onChangeText={(text) => setFullName(text)}
        style={styles.input}
        theme={{ colors: { primary: 'blue', background: 'lightgrey' } }}
      />

<TextInput
  label="Phone Number"
  value={phoneNumber}
  onChangeText={(text) => setPhoneNumber(text)}
  keyboardType="numeric"
  style={styles.input}
  maxLength={10} 
  theme={{ colors: { primary: 'blue', background: 'lightgrey' } }}
/>
 
      {loading ?(<ActivityIndicator style={styles.activityIndicator} size="large" color="blue" />):(<Button
        mode="contained"
        onPress={handleRegistration}
        style={{ ...styles.button, backgroundColor: 'black', color: 'black' }}
      >
       <Text style={{color:"white",fontWeight:"bold"}}> Register</Text>
      </Button>)}
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
    backgroundColor: 'blue', 
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
});

export default ProfileForm;
