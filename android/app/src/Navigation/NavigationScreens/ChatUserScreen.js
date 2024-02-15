import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const ChatUserScreen = () => {
  const [messages, setMessages] = useState([]);
  const user = auth().currentUser;
  console.log(user.uid)

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

    
    await firestore().collection('messages').add({
      text: message.text,
      createdAt: firestore.FieldValue.serverTimestamp(),
      user: {
        _id: user.uid,
        
      },
    });
  }, [user]);

  return (
    <GiftedChat
      messages={messages}
      onSend={(newMessages) => onSend(newMessages)}
      user={{
        _id: user.uid,
        name: user.displayName,
        avatar: user.photoURL,
      }}
    />
  );
};

export default ChatUserScreen;
