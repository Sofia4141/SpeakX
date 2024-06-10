import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Timeline from './components/Tweets/Timeline';
import Profile from './components/Profile/Profile';
import PrivateRoute from './utils/PrivateRoute';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/timeline" component={Timeline} />
        <PrivateRoute exact path="/profile" component={Profile} />
      </Switch>
    </Router>
  );
};

export default App;
