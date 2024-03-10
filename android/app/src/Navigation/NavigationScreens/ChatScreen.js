import React, { useState, useEffect } from 'react';
import { View, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const ChatScreen = ({ route }) => {
  const [messages, setMessages] = useState([]);
  const currentUser = auth().currentUser;
  const { user } = route.params;

  useEffect(() => {
    console.log('Current User ID:', currentUser.uid);
    console.log('Chat User ID:', user.uid);

    const chatId = [currentUser.uid, user.uid].sort().join('_');

    const unsubscribe = firestore()
      .collection('chats')
      .doc(chatId)
      .collection('messages')
      .orderBy('timestamp', 'desc')
      .onSnapshot(querySnapshot => {
        const messagesData = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            _id: doc.id,
            text: data.message,
            createdAt: data.timestamp ? data.timestamp.toDate() : new Date(),
            user: {
              _id: data.senderId,
            },
          };
        });
        console.log('Messages:', messagesData);
        setMessages(messagesData);
      });
  
    return () => unsubscribe();
  }, []);

  const handleSendMessage = async (newMessages = []) => {
    const newMessage = newMessages[0];
    const chatId = [currentUser.uid, user.uid].sort().join('_');
    try {
      await firestore()
        .collection('chats')
        .doc(chatId)
        .collection('messages')
        .add({
          senderId: currentUser.uid,
          receiverId: user.uid,
          message: newMessage.text,
          timestamp: firestore.FieldValue.serverTimestamp()
        });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        messages={messages}
        onSend={newMessages => handleSendMessage(newMessages)}
        user={{
          _id: currentUser.uid,
        }}
      />
      {Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" />}
    </View>
  );
};

export default ChatScreen;
