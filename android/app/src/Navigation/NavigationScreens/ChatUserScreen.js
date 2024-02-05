import React, { useState, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { useFirestore } from '@react-native-firebase/firestore';
import { useAuth } from '@react-native-firebase/auth';

const UserChatScreen = ({ route }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const firestore = useFirestore();
  const driverId = 'ycUH0GuWi6eolL9MiEtWN1yV9Yv1';
  console.log(user.uid);

  useEffect(() => {
    const chatId = getChatId(user.uid, driverId);

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
  }, [firestore, user.uid, driverId]);

  const onSend = async (newMessages = []) => {
    const chatId = getChatId(user.uid, driverId);

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

export default UserChatScreen;
