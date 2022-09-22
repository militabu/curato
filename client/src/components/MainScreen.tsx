import React, { ReactElement } from "react";
import { useAppSelector } from "../redux/hooks";
import AlbumListScreen from "./screenComponents/AlbumListScreen";
import ContactsScreen from "./screenComponents/ContactsScreen";
import FavouritesScreen from "./screenComponents/FavouritesScreen";
import { Fab, Zoom } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

function MainScreen(): ReactElement {

  const screenNum: number = useAppSelector(state => state.screen);
  const screensList: ReactElement[] = [<AlbumListScreen />, <ContactsScreen />, <FavouritesScreen />]
  const screen = screensList[screenNum];

  return (
    <div className="h-full flex justify-center items-center sm:bg-customPurple">
      {screen}
      <Fab size="large" color="primary" style={{position: 'fixed', bottom: '6rem', right: '3rem'}}>
        <AddIcon />
      </Fab>
    </div>
  );
}

export default MainScreen;
