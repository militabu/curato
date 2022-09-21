import React, { ReactElement } from "react";
import SettingsIcon from '@mui/icons-material/Settings';

function Navbar() : ReactElement {
  return (
    <nav className="flex items-center justify-between h-10 py-6 bg-white">
      <h1 className="text-4xl font-header">Curato</h1>
      <div className="hidden sm:flex w-7/12 items-center justify-between text-2xl">
        <a href="#">Albums</a>
        <a href="#">Contacts</a>
        <a href="#">Favorites</a>
        <a href="#">Settings</a>
      </div>
      <div className="sm:hidden">
        <SettingsIcon />
      </div>
    </nav>
  )
}

export default Navbar;