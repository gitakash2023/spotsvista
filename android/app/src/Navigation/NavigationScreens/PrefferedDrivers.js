import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, Alert, StyleSheet, ScrollView, Pressable } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Modal from 'react-native-modal';

const PreferredDrivers = ({ onSelectDriver }) => {
  const [driverData, setDriverData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDriver, setSelectedDriver] = useState(null);

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
      <Modal
        isVisible={selectedDriver !== null}
        onBackdropPress={() => setSelectedDriver(null)}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        style={styles.modal}
      >
        <ScrollView>
          <View>
            {driverData.map(driver => (
              <Pressable
                key={driver.id}
                style={styles.driverCard}
                onPress={() => {
                  setSelectedDriver(driver);
                  onSelectDriver(driver);
                }}
              >
                <Text style={[styles.driverName, styles.textColorBlack]}>{`${driver.firstName} ${driver.lastName}`}</Text>
                <Text style={[styles.driverDetail, styles.textColorBlack]}>Gender: {driver.gender}</Text>
                <Text style={[styles.driverDetail, styles.textColorBlack]}>Age: {driver.age}</Text>
                <Text style={[styles.driverDetail, styles.textColorBlack]}>Phone Number: {driver.phoneNumber}</Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </Modal>

      <View style={styles.buttonContainer}>
        <Pressable onPress={() => setSelectedDriver(true)}>
          <Text style={styles.buttonText}>Select Preferred Driver</Text>
        </Pressable>
      </View>
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
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'blue',
    textDecorationLine: 'underline',
    marginTop: 20,
  },
});

export default PreferredDrivers;
