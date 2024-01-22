import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';



const UserProfile = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const retrieveProfile = () => {
    firestore()
      .collection('users')
     
      .where('userId', '==', auth().currentUser.email)
      .get()
      .then(querySnapshot => {
        const data = [];
        querySnapshot.forEach(documentSnapshot => {
          const documentData = documentSnapshot.data();
          documentData.id = documentSnapshot.id;
          data.push(documentData);
        });
        console.log(data)
        setUserData(data);
      })
      .catch(error => {
        Alert.alert(error);
      });
  };

  useEffect(() => {
    retrieveProfile();
  }, []);

  

  return (
    <View>
      {/* {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <View>
        {userData}
        </View>
      )} */}
      
    </View>
  );
};

export default UserProfile;
