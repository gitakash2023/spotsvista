import React, { useState, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { Text } from 'react-native';

// Custom component to render server timestamp
const TimeComponent = ({ time }) => {
  const formattedTime = time ? time.toDate().toLocaleTimeString() : '';
  return <Text>{formattedTime}</Text>;
};

const ChatScreen = ({ route }) => {
  const { userId, driverId } = route.params;
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const chatRef = firestore()
      .collection('chats')
      .doc(`${userId}_${driverId}`)
      .collection('messages')
      .orderBy('createdAt', 'desc');

    const unsubscribe = chatRef.onSnapshot((querySnapshot) => {
      const newMessages = querySnapshot.docs.map((doc) => doc.data());
      setMessages(newMessages);
    });

    return () => unsubscribe();
  }, [userId, driverId]);

  const onSend = async (newMessages) => {
    const { _id, text, user } = newMessages[0];

    await firestore()
      .collection('chats')
      .doc(`${userId}_${driverId}`)
      .collection('messages')
      .add({
        _id,
        text,
        user,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={(newMessages) => onSend(newMessages)}
      user={{
        _id: auth().currentUser.uid,
      }}
      renderTime={(props) => (
        <TimeComponent time={props.currentMessage.createdAt} />
      )}
    />
  );
};

export default ChatScreen;
