import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './SearchForm.js'
import UserBoxs from './UserBoxs.js'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
 
  render() {
    return (
      <div className="App">
      <Login/>
      <UserBoxs/>
      </div>
    );
  }
}

export default App;
