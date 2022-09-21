import React from 'react';
import './App.css';
import FooterMenu from './components/FooterMenu';
import MainScreen from './components/MainScreen';
import Navbar from './components/Navbar';

function App() {
  // TODO: let's add navbar links and a footer that are hidden below/above medium width.
  return (
    <div className='px-6'>
      <Navbar />
      <MainScreen />
      <FooterMenu />
    </div>
  )
}

export default App;
