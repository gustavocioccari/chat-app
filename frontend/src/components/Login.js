import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  
  return (
    <div className="loginContainer">
      <h1 className="heading">Login</h1>
      <div>
        <input placeholder="Username" className="loginInput" type="text"/>
      </div>
      <div>
        <select className="loginInput" type="text">
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='3'>3</option>
          <option value='4'>4</option>
        </select>
      </div>
      <Link>
        <button className="button" type="submit">Let's chat</button>
      </Link>
    </div>
  )
}

export default Login; 