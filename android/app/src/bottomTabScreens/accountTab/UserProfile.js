import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const UserProfile = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  const retrieveProfile = () => {
    const user = auth().currentUser;
    // console.log(user.email)
  
    if (user) {
      firestore()
        .collection('userProfile')
        // .where('userId', '==', user.email)  
        .get()
        .then(querySnapshot => {
          const data = [];
          querySnapshot.forEach(documentSnapshot => {
            const documentData = documentSnapshot.data();
            documentData.id = documentSnapshot.id;
            data.push(documentData);
          });
          // console.log(data)
          setUserData(data);
          setLoading(false);
        })
        .catch(error => {
          Alert.alert(error.message);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    retrieveProfile();
  }, []);

  return (
    <View>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <View>
          {userData.map(user => (
            <View key={user.id}>
              <Text>Name: {user.firstName}</Text>
            
              
            </View>
          ))}
          
        </View>
      )}
    </View>
  );
};

export default UserProfile;
