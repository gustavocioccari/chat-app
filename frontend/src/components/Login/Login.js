import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  
  return (
    <div className="loginOuterContainer">
      <div className="loginInnerContainer">
        <h1 className="heading">Formare Chat</h1>
        <div>
          <input placeholder="Name" className="loginInput" type="text" onChange={(event) => {setUsername(event.target.value)}} />
        </div>
        <div>
          <input placeholder="Room" className="loginInput" type="text" onChange={(event) => {setRoom(event.target.value)}} />
        </div>
        <Link onClick={e => (!username || !room) ? e.preventDefault() : null} to={`/chat?username=${username}&room=${room}`}>
          <button className="button" type="submit">Sign In</button>
        </Link>
      </div>
    </div>
  );
}
