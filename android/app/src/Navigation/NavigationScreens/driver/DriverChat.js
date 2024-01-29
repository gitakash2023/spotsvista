import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const DriverChat = () => {
  const navigation = useNavigation();

  const startChatWithUser = () => {
    // Replace 'User123' with the actual user ID or a unique identifier
    navigation.navigate('ChatScreen', { driverId: auth().currentUser.uid, userId: 'User123' });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Driver Chat Component</Text>
      <Button title="Chat with User" onPress={startChatWithUser} />
    </View>
  );
};

export default DriverChat;
