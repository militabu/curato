import { useEffect } from 'react';
import './App.css';
import FooterMenu from './components/FooterMenu';
import MainScreen from './components/MainScreen';
import Navbar from './components/Navbar';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { ScreenState } from "./customTypes";
import { getUser } from './utils/api-client';
import { getAlbums } from './redux/actions';


function App() {
  
  const screenState: ScreenState = useAppSelector(state => state.screenReducer)

  const dispatch = useAppDispatch();

  useEffect(() => {
    const userId = process.env.REACT_APP_USER
    console.log('App level user ID is: ', userId);
    getUser(userId)
      .then((res) => {
        // A bit awkward, but we need to replace the '_id' property from Mongo 
        // with the 'id' property expected by the AlbumType
        for (let album of res.albums) {
          album.id = album._id;
          delete album._id; 
        }
        console.log('Result of fetching user is: ', res);
        dispatch(getAlbums(res.albums));
      })
  }, []);

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
