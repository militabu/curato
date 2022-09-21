import React, { ReactElement, useEffect, useState } from "react";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import MuiBottomNavigationAction from '@mui/material/BottomNavigationAction';
import CollectionsIcon from '@mui/icons-material/Collections';
import PeopleIcon from '@mui/icons-material/People';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import * as actions from '../redux/actions';
import { styled } from '@mui/material/styles';

function FooterMenu(): ReactElement {

  const screen = useAppSelector(state => state.screen);
  const dispatch = useAppDispatch();

  // Optional styling for the bottom navigation icons
  // const BottomNavigationAction = styled(MuiBottomNavigationAction)(`
  //   color: green;
  //   &.Mui-selected {
  //     color: red;
  //   }
  // `);

  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0">
      <BottomNavigation
        showLabels
        value={screen}
        onChange={(event, newValue) => {
          dispatch(actions.changeScreen(newValue));
        }}
      >
        <BottomNavigationAction label="Albums" icon={<CollectionsIcon />} />
        <BottomNavigationAction label="Friends" icon={<PeopleIcon />} />
        <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
      </BottomNavigation>
    </div>
  );
}

export default FooterMenu;
