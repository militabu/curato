import React, { ReactElement } from "react";
import { useAppSelector } from "../redux/hooks";
import AlbumListScreen from "./screenComponents/AlbumListScreen";
import ContactsScreen from "./screenComponents/ContactsScreen";
import FavoritesScreen from "./screenComponents/FavoritesScreen";
import AlbumViewScreen from "./screenComponents/AlbumViewScreen";
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { AlbumType } from "../customTypes";

function MainScreen(): ReactElement {

  // const selectScreen = (state: RootState) => state.screenReducer
  const screenState: { screen: number, viewAlbum: boolean, editAlbum: boolean, activeAlbum: AlbumType} = useAppSelector(state => state.screenReducer);
  // const activeAlbum: AlbumType = useAppSelector(state => state.screenReducer);
  const screensList: ReactElement[] = [<AlbumListScreen />, <ContactsScreen />, <FavoritesScreen />]

  const screen = screenState.viewAlbum ? <AlbumViewScreen {...screenState.activeAlbum} /> : screensList[screenState.screen]

  return (
    <div className="h-full flex justify-center items-center sm:bg-customPurple">
      {screen}
      { !screenState.viewAlbum
      ? <Fab size="large" color="primary" style={{position: 'fixed', bottom: '6rem', right: '3rem'}}>
        <AddIcon />
      </Fab> 
      : <></>
      }
    </div>
  );
}

export default MainScreen;
