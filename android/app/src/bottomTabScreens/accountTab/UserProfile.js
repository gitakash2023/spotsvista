import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const retrieveProfile = () => {
    const user = auth().currentUser;

    if (user) {
      const userUID = user.uid;

      firestore()
        .collection('userProfile')
        .where('userId', '==', userUID)
        .get()
        .then(querySnapshot => {
          if (!querySnapshot.empty) {
            const documentData = querySnapshot.docs[0].data();
            setUserData(documentData);
          } else {
            Alert.alert("User profile not found.");
          }
          setLoading(false);
        })
        .catch(error => {
          Alert.alert(error.message);
          setLoading(false);
        });
    } else {
      setLoading(false);
      Alert.alert("User not logged in.");
    }
  };

  useEffect(() => {
    retrieveProfile();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  {loading ? (
    <ActivityIndicator size="large" />
  ) : (
    <View>
      {userData ? (
        <View>
          <Text style={{ textAlign: 'center',color:"black" }}>firstName: {userData.firstName}</Text>
          <Text style={{ textAlign: 'center',color:"black" }}>lastName: {userData.lastName}</Text>
      
        </View>
      ) : (
        <Text>User profile not found.</Text>
      )}
    </View>
  )}
</View>

  );
};

export default UserProfile;
