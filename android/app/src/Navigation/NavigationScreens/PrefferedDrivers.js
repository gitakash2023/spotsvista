import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { ScrollView } from 'react-native-gesture-handler';

const PreferredDrivers = () => {
  const [driverData, setDriverData] = useState([]);
  const [loading, setLoading] = useState(true);

  const retrieveDrivers = () => {
    const user = auth().currentUser;

    if (user) {
      firestore()
        .collection('driverProfile')
        .get()
        .then(querySnapshot => {
          const data = [];
          querySnapshot.forEach(documentSnapshot => {
            const documentData = documentSnapshot.data();
            documentData.id = documentSnapshot.id;
            data.push(documentData);
          });
          console.log(data);
          setDriverData(data);
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
    retrieveDrivers();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView>
        <View>
          {driverData.map(driver => (
            <View key={driver.id} style={styles.driverCard}>
              <Text style={[styles.driverName, styles.textColorBlack]}>{`${driver.firstName} ${driver.lastName}`}</Text>
              <Text style={[styles.driverDetail, styles.textColorBlack]}>Gender: {driver.gender}</Text>
              <Text style={[styles.driverDetail, styles.textColorBlack]}>Age: {driver.age}</Text>
              <Text style={[styles.driverDetail, styles.textColorBlack]}>Phone Number: {driver.phoneNumber}</Text>
              {/* Add other driver details as needed */}
            </View>
          ))}
        </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  driverCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    elevation: 3,
  },
  driverName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  driverDetail: {
    fontSize: 16,
    marginBottom: 5,
  },
  textColorBlack: {
    color: 'black',
  },
});

export default PreferredDrivers;
