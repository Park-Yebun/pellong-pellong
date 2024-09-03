import React from 'react';
import { Routes, Route } from 'react-router-dom'
import './App.css';
import Router from './Router';
import { Helmet } from 'react-helmet-async';

const App = () => {
  return (
    <div className="App">
      <Helmet>
        <title>펠롱펠롱</title>
      </Helmet>
      <Router />
    </div>
  );
}

export default App;