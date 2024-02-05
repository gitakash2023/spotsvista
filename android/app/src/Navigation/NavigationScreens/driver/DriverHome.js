import React, { useState, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { useFirestore } from '@react-native-firebase/firestore';
import { useAuth } from '@react-native-firebase/auth';

const DriverHome = ({ route }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const firestore = useFirestore();
  const userId = 'uOc2hB5VMkaGQUZO7ojaSEyLE1z1'; 
  console.log(user.uid)

  useEffect(() => {
    const chatId = getChatId(userId, user.uid);

    const unsubscribe = firestore
      .collection('chats')
      .doc(chatId)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot((snapshot) => {
        const messages = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            ...data,
            createdAt: data.createdAt.toDate(),
          };
        });
        setMessages(messages);
      });

    return () => unsubscribe();
  }, [firestore, user.uid, userId]);

  const onSend = async (newMessages = []) => {
    const chatId = getChatId(userId, user.uid);

    await firestore
      .collection('chats')
      .doc(chatId)
      .collection('messages')
      .add({
        ...newMessages[0],
        createdAt: new Date(),
      });
  };

  return <GiftedChat messages={messages} onSend={(newMessages) => onSend(newMessages)} user={{ _id: user.uid }} />;
};

const getChatId = (userId1, userId2) => {
  const sortedIds = [userId1, userId2].sort();
  return sortedIds.join('_');
};

export default DriverHome;
