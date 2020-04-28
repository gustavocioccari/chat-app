import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './components/Login/Login';
import Chat from './components/Chat/Chat';

const App = () =>(
  <Router>
    <Switch>
      <Route path='/' exact component={Login}/>
      <Route path='/chat' component={Chat}/>
    </Switch>
  </Router>
);

export default App;
