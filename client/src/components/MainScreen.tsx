import { ReactElement } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import AlbumListScreen from "./screenComponents/AlbumListScreen";
import ContactsScreen from "./screenComponents/ContactsScreen";
import FavoritesScreen from "./screenComponents/FavoritesScreen";
import AlbumViewScreen from "./screenComponents/AlbumViewScreen";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { toggleAlbumEdit } from "./actions";
import { ScreenState } from "../customTypes";
import AlbumEditScreen from "./screenComponents/AlbumEditScreen";

function MainScreen(): ReactElement {
  const dispatch = useAppDispatch();

  const screenState: ScreenState = useAppSelector(
    (state) => state.screenReducer
  );
  const screensList: ReactElement[] = [
    <AlbumListScreen />,
    <ContactsScreen />,
    <FavoritesScreen />,
  ];

  const screen = screenState.editAlbum ? (
    <AlbumEditScreen />
  ) : screenState.viewAlbum ? (
    <AlbumViewScreen />
  ) : (
    screensList[screenState.screen]
  );

  // Note: Only show the floating action button (Fab) on the Albums screen (screen 0), and not if editing or viewing an album.
  return (
    <div data-testid='mainscreen-1' className={`h-full flex flex-col justify-center items-center ${screenState.editAlbum ? '' : 'pb-20'} sm:bg-customPurple`}>
      {screen}
      {!screenState.viewAlbum && !screenState.editAlbum && screenState.screen === 0 ? (
        <Fab
          onClick={() => dispatch(toggleAlbumEdit())}
          className="right-8 sm:right-32"
          style={{
            position: "fixed",
            bottom: "7rem",
            backgroundColor: "#09e0c6",
            border: "none",
            height: '4rem',
            width: '4rem',
          }}
        >
          <AddIcon />
        </Fab>
      ) : (
        <></>
      )}
    </div>
  );
}

export default MainScreen;
