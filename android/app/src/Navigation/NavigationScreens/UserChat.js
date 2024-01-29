import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const UserChat = () => {
  const navigation = useNavigation();

  const startChatWithDriver = () => {
   
    navigation.navigate('ChatScreen', { userId: auth().currentUser.uid, driverId: 'Driver123' });
    
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>User Chat Component</Text>
      <Button title="Chat with Driver" onPress={startChatWithDriver} />
    </View>
  );
};

export default UserChat;
