import React from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';

import Message from './Message/Message';

const Messages = ({ messages, username }) => (
  <ScrollToBottom className="messages">
    {messages.map((message, i) => 
      <div key={i}>
        <Message message={message} name={username}/>
      </div>
    )}
  </ScrollToBottom>
);

export default Messages;