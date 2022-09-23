import { type } from "os";
import { combineReducers } from 'redux';
import { AlbumType } from "../customTypes";
import { albumList } from './mocks';

const screenReducer = (
    state = {screen: 0, viewAlbum: false, editAlbum: false, activeAlbum: {} as AlbumType}, 
    action: { type: string, payload?: number | AlbumType}
  ) => {
  switch(action.type) {
    case 'CHANGE_SCREEN':
      return {
        screen: action.payload,
        viewAlbum: false,
        editAlbum: false,
        activeAlbum: {} as AlbumType
      }
    case 'VIEW_ALBUM':
      return {
        ...state,
        viewAlbum: true,
        activeAlbum: action.payload
      }
      case 'EDIT_ALBUM':
        return {
          ...state,
          editAlbum: true,
          activeAlbum: action.payload
        }
      case 'TOGGLE_EDIT':
        return {
          ...state,
          editAlbum: !state.editAlbum,
        }
    default : return state;
  }
}

const initialAlbumState = [] as AlbumType[];

const albumsReducer = (state = albumList, action: { type: string, payload?: number | string}) => {
  switch(action.type) {
    case 'FETCH_ALBUMS':
      return state;
    case 'TOGGLE_FAVE':
      return state.map(album => (
        {
          ...album,
          favorite: album.id === action.payload ? !album.favorite : album.favorite
        }
      ));
    default: return state;
  }
}

const reducer = combineReducers({
  screenReducer,
  albumsReducer,
});

export default reducer;
