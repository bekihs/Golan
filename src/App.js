import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import UserBoxs from './UserBoxs.js'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import SearchOrAdd from './SearchOrAdd'

class App extends Component {
 
  render() {
    return (
      <div className="App">
      <SearchOrAdd/>
      <UserBoxs/>
      </div>
    );
  }
}

export default App;
