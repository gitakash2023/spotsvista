import React, { useState } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);

  const onSend = (newMessages = []) => {
    setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={(newMessages) => onSend(newMessages)}
      user={{
        _id: 1,
      }}
    />
  );
};

export default ChatScreen;
