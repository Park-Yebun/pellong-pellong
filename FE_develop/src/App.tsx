import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom'
import './App.css';
import Router from './Router';
import { Helmet } from 'react-helmet-async';
import MainPage from './pages/MainPage';
import PlayMainPage from './pages/JejuPlay/PlayMainPage';

const App = () => {
  // throw new Error('Test error');
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