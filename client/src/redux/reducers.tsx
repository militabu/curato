import { combineReducers } from 'redux';
import { AlbumInputData, AlbumType } from "../customTypes";
import { albumList } from './mocks';

const screenReducer = (
    state = {screen: 0, viewAlbum: false, editAlbum: false, uploading: false, offline: false, activeAlbum: {} as AlbumType}, 
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
      case 'TOGGLE_OFFLINE':
        return {...state, offline: !state.offline};
      case 'SET_UPLOADING':
        return {...state, uploading: action.payload};
    default : return state;
  }
}

// const initialAlbumState = [] as AlbumType[];

const albumsReducer = (state = albumList, action: { type: string, payload?: number | string | AlbumInputData}) => {
  switch(action.type) {
    case 'FETCH_ALBUMS':
      return state;
    case 'ADD_ALBUM':
      return [
        ...state,
        {
          ...action.payload as AlbumInputData,
          id:'10',
          favorite: false,
        }
      ];
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
