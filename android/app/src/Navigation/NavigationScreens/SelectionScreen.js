import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

const SelectionScreen = () => {
  const navigation = useNavigation();

  const handleUserButtonClick = () => {
    navigation.navigate('SignupScreen');
  };

  const handleDriverButtonClick = () => {
    navigation.navigate('DriverSignup');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Role</Text>
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={handleUserButtonClick}
          style={styles.button}>
          User
        </Button>
        <Button
          mode="contained"
          onPress={handleDriverButtonClick}
          style={styles.button}>
          Driver
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  button: {
    width: '45%',
    marginTop: 10,
  },
});

export default SelectionScreen;
