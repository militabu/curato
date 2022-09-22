import React, { ReactElement } from "react";
import SettingsIcon from '@mui/icons-material/Settings';
import IconButton from '@mui/material/IconButton';

function Navbar() : ReactElement {
  return (
    <nav className="flex items-center justify-between pl-6 pr-3 py-3 bg-white sm:bg-customPurple sm:text-white sticky top-0 left-0 right-0">
      <h1 className="text-4xl sm:text-5xl font-header">Curato</h1>
      <div className="hidden sm:flex w-7/12 items-center justify-between text-2xl">
        <a href="#">Albums</a>
        <a href="#">Contacts</a>
        <a href="#">Favorites</a>
        <a href="#">Settings</a>
      </div>
      <div className="sm:hidden">
        <IconButton color='inherit'>
          <SettingsIcon fontSize="large"/>
        </IconButton>
      </div>
    </nav>
  )
}

export default Navbar;