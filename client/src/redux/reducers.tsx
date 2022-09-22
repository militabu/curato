import { type } from "os";
import { combineReducers } from 'redux';
import { AlbumType } from "../customTypes";

const albumList : AlbumType[] = [
  {
    id:'1',
    title: 'Portugal',
    date: Date.now(),
    favorite: true,
    img: 'https://assets3.thrillist.com/v1/image/2418477/1536x864/crop;webp=auto;jpeg_quality=60;progressive.jpg'
  },
  {
    id:'2',
    title: 'Boston',
    date: Date.now(),
    favorite: false,
    img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/25/ae/da/ca/caption.jpg?w=2400&h=-1&s=1&cx=1920&cy=1079&chk=v1_9fb04f577ed31ea036b9'
  },
  {
    id:'3',
    title: 'Boston',
    date: Date.now(),
    favorite: false,
    img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/25/ae/da/ca/caption.jpg?w=2400&h=-1&s=1&cx=1920&cy=1079&chk=v1_9fb04f577ed31ea036b9'
  },
  {
    id:'4',
    title: 'Boston',
    date: Date.now(),
    favorite: false,
    img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/25/ae/da/ca/caption.jpg?w=2400&h=-1&s=1&cx=1920&cy=1079&chk=v1_9fb04f577ed31ea036b9'
  },
  {
    id:'5',
    title: 'Boston',
    date: Date.now(),
    favorite: false,
    img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/25/ae/da/ca/caption.jpg?w=2400&h=-1&s=1&cx=1920&cy=1079&chk=v1_9fb04f577ed31ea036b9'
  },
  {
    id:'6',
    title: 'Boston',
    date: Date.now(),
    favorite: false,
    img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/25/ae/da/ca/caption.jpg?w=2400&h=-1&s=1&cx=1920&cy=1079&chk=v1_9fb04f577ed31ea036b9'
  },
  {
    id:'7',
    title: 'Boston',
    date: Date.now(),
    favorite: false,
    img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/25/ae/da/ca/caption.jpg?w=2400&h=-1&s=1&cx=1920&cy=1079&chk=v1_9fb04f577ed31ea036b9'
  },
  {
    id:'8',
    title: 'Boston',
    date: Date.now(),
    favorite: false,
    img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/25/ae/da/ca/caption.jpg?w=2400&h=-1&s=1&cx=1920&cy=1079&chk=v1_9fb04f577ed31ea036b9'
  },
  {
    id:'9',
    title: 'Boston',
    date: Date.now(),
    favorite: false,
    img: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/25/ae/da/ca/caption.jpg?w=2400&h=-1&s=1&cx=1920&cy=1079&chk=v1_9fb04f577ed31ea036b9'
  },
]

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
