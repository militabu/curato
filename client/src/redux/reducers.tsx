import { type } from "os";
import { combineReducers } from 'redux';
import { AlbumType } from "../customTypes";

interface ScreenState {
  screen: number
}

const initialScreenState: ScreenState = {
  screen: 0
}

const reducer = (state = initialScreenState, action: { type: string, payload: number }) => {
  switch(action.type) {
    case 'CHANGE_SCREEN':
      return {
        screen: action.payload
      }
    default : return state;
  }
}

const initialAlbumState = {favourite: false} as AlbumType;

const albumReducer = (state = initialAlbumState, action: { type: string, payload: AlbumType}) => {
  switch(action.type) {
    case 'TOGGLE_FAVE':
      console.log('Empty album: ', initialAlbumState);
      return {
        ...state,
        favourite: !state.favourite
      }
    default: return state;
  }
}

export default reducer;
