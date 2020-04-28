import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
import io from "socket.io-client";

import Messages from '../Messages/Messages';

import './styles.css';

let socket;

const Chat = ({ location }) => {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ENDPOINT = 'localhost:3333';

  const history = useHistory();

  useEffect(() => {
    const { username, room } = queryString.parse(location.search);
    
    socket = io(ENDPOINT);

    setRoom(room);
    setUsername(username);

    socket.emit('login', { username, room }, (error) => {
      if(error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message ]);
    });

    socket.on('roomData', ({ users }) => {
      setUsers(users);
    })

    return () => {
      socket.emit('disconnect');

      socket.off();
    }
  }, [messages])

  const sendMessage = (event) => {
    event.preventDefault();

    socket.emit('sendMessage', message, () => setMessage(''));
  }

  function handleLogout(e){
    history.push('/');
  }

  return (
    <div className="outerContainer">
      <div className="container">
          <Messages messages={messages} username={username} />
          <form className="form">
            <input
              className="input"
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={({ target: { value } }) => setMessage(value)}
              onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
            />
            <button className="buttonSend" onClick={e => sendMessage(e)}>Send</button>
            <button className="buttonLogout" onClick={e => handleLogout(e)} type="button">Logout</button>
          </form>
          <p className="usernameContainer">You're logged as {username}</p>
      </div>
    </div>
  );
}

export default Chat;
