import './App.css';

import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import MyPage from './components/views/MyPage/MyPage';
import NavBar from './components/views/NavBar/NavBar';
import Auth from './hoc/auth'

function App() {
  return (
    <Router>
    <div>
      <NavBar />
      {/*
        A <Switch> looks through all its children <Route>
        elements and renders the first one whose path
        matches the current URL. Use a <Switch> any time
        you have multiple routes, but you want only one
        of them to render at a time
      */}
      <Switch>
        <Route exact path="/" component={Auth(LandingPage, null )  } />
        <Route exact path="/login" component={Auth(LoginPage, false) } />
        <Route exact path="/register" component={Auth(RegisterPage, false)} />
        <Route exact path="/my" component={Auth(MyPage, true)} />
        
        
      </Switch>
    </div>
  </Router>
);
}

export default App;