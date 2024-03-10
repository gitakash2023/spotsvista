import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
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
        .collection('allUsers')
        .doc(userUID)
        .get()
        .then(documentSnapshot => {
          if (documentSnapshot.exists) {
            const documentData = documentSnapshot.data();
            setUserData(documentData);
          } else {
            setUserData(null);
          }
          setLoading(false);
        })
        .catch(error => {
          console.error('Error retrieving user profile:', error);
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
    <View style={styles.container}>
      <Text style={styles.title}>User Profile</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#00ff00" />
      ) : userData ? (
        <View style={styles.profileContainer}>
          <Image source={require('../../Image/contactnew.png')} style={styles.profileImage} />
          <View style={styles.userInfo}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{userData.name}</Text>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{userData.email}</Text>
          </View>
        </View>
      ) : (
        <Text style={styles.errorText}>User profile not found.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 20,
  },
  profileContainer: {
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  userInfo: {
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  value: {
    fontSize: 16,
    color: 'black',
    marginBottom: 10,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
});

export default UserProfile;
