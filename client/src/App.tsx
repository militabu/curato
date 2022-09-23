import React from 'react';
import './App.css';
import FooterMenu from './components/FooterMenu';
import MainScreen from './components/MainScreen';
import Navbar from './components/Navbar';
import { useAppSelector } from './redux/hooks';
import { ScreenState } from "./customTypes";


function App() {
  
  const screenState: ScreenState = useAppSelector(state => state.screenReducer)

  // TODO: Currently the navbar hides when editing an album, to instead show a custom navbar in the edit screen.
  // This works great on the mobile interface, but I'll need to keep the main navbar AND the editing navbar on desktop.
  return (
    <div className="flex flex-col" style={{height: "100vh"}}>
      { screenState.editAlbum ? <></> : <Navbar /> }
      <MainScreen />
      { screenState.editAlbum ? <></> : <FooterMenu /> }
    </div>
  )
}

export default App;
