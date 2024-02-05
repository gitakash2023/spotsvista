import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const ChatDriverScreen = () => {
  const [messages, setMessages] = useState([]);
  const driver = auth().currentUser; // Replace with your driver authentication logic
  console.log(driver.uid);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot((snapshot) => {
        const messages = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            _id: doc.id,
            text: data.text,
            createdAt: data.createdAt ? data.createdAt.toDate() : null,
            user: data.user,
          };
        });
        setMessages(messages);
      });

    return () => unsubscribe();
  }, []);

  const onSend = useCallback(async (newMessages = []) => {
    const message = newMessages[0];

    // Save the message to Firestore
    await firestore().collection('messages').add({
      text: message.text,
      createdAt: firestore.FieldValue.serverTimestamp(),
      user: {
        _id: driver.uid,
        // Add any additional driver information here (name, avatar, etc.)
      },
    });
  }, [driver]);

  return (
    <GiftedChat
      messages={messages}
      onSend={(newMessages) => onSend(newMessages)}
      user={{
        _id: driver.uid,
        name: driver.displayName,
        avatar: driver.photoURL,
      }}
    />
  );
};

export default ChatDriverScreen;
