import React from 'react';

import './styles.css';

import ReactEmoji from 'react-emoji';

const Message = ({ message: { text, user }, username }) => {
  let isSentByCurrentUser = false;

  if(user === username) {
    isSentByCurrentUser = true;
  }

  return (
    isSentByCurrentUser
      ? (
        <div className="messageContainerTwo">
          <p className="sentByText pr-10 ">{username}</p>
          <div className="messageBoxTwo">
            <p className="messageTextTwo">{ReactEmoji.emojify(text)}</p>
          </div>
        </div>
        )
        : (
          <div className="messageContainerOne">
            <div className="messageBoxOne">
              <p className="messageTextOne">{ReactEmoji.emojify(text)}</p>
            </div>
            <p className="sentByText pl-10 ">{user}</p>
          </div>
        )
  );
}

export default Message;