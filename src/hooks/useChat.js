import { useEffect, useRef, useState } from 'react';
import socketIOClient from 'socket.io-client';

const serverAddress = 'http://localhost:4000';

const useChat = () => {
  const [messages, setMessages] = useState([]);
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socketIOClient(serverAddress);

    // When we get a message get the newest messages and append the incoming one to it
    socketRef.current.on('new message', message => {
      setMessages(messages => [...messages, message]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const sendMessage = message => {
    socketRef.current.emit('new message', message);
  };

  return { messages, sendMessage };
};

export default useChat;
