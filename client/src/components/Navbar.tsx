import React, { ReactElement } from "react";
import SettingsIcon from '@mui/icons-material/Settings';
import EditIcon from '@mui/icons-material/Edit';
import ShareIcon from '@mui/icons-material/Share';
import IconButton from '@mui/material/IconButton';
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { ScreenState } from "../customTypes";
import { editAlbum } from "../redux/actions";

function Navbar() : ReactElement {

  const screen: ScreenState = useAppSelector(state => state.screenReducer);
  const dispatch = useAppDispatch();

  return (
    <nav className="flex items-center justify-between pl-6 pr-3 py-3 z-50 bg-white sm:bg-customPurple sm:text-white sticky top-0 left-0 right-0">
      <h1 className="text-4xl sm:text-5xl font-header">Curato</h1>
      <div className="hidden sm:flex w-7/12 items-center justify-between text-2xl">
        <a href="#">Albums</a>
        <a href="#">Contacts</a>
        <a href="#">Favorites</a>
        <a href="#">Settings</a>
      </div>
      <div className="sm:hidden flex space-x-4">
        { screen.viewAlbum ? 
          <IconButton color='inherit'>
            <ShareIcon fontSize="large"/> 
          </IconButton> : <></>}

        <IconButton onClick={screen.viewAlbum ? () => dispatch(editAlbum(screen.activeAlbum)) : () => {}}color='inherit'>
          { screen.viewAlbum 
            ? <EditIcon fontSize="large"/> 
            : <SettingsIcon fontSize="large"/> 
          }
        </IconButton>

      </div>
    </nav>
  )
}

export default Navbar;