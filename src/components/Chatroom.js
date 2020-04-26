import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import useChat from '../hooks/useChat';

const Chatroom = () => {
  const [outgoingMsg, setOutgoingMsg] = useState();
  const { messages, sendMessage } = useChat();

  const handleSubmit = e => {
    e.preventDefault();
    sendMessage({ id: uuid(), content: outgoingMsg });
    setOutgoingMsg('');
  };

  return (
    <>
      <ul id='messages'>
        {messages && messages.map(msg => <li key={msg.id}>{msg.content}</li>)}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          className='messageInput'
          value={outgoingMsg || ''}
          onChange={e => setOutgoingMsg(e.target.value)}
        />
        <input className='messageSubmit' type='submit' value='Send' />
      </form>
    </>
  );
};

export default Chatroom;
