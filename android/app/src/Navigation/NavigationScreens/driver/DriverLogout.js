import React, { useState } from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const DriverLogout = () => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      setLoading(true);
      await auth().signOut();
      
      navigation.navigate('DriverLogin');
    } catch (error) {
      console.error('Error logging out:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <Text>Account</Text>
      {loading && <ActivityIndicator size="large" />}
      <Button title="Logout" onPress={handleLogout} disabled={loading} />
    </View>
  );
};

export default DriverLogout;
