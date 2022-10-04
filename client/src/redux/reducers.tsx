import { Album } from '@mui/icons-material';
import { combineReducers } from 'redux';
import { addAlbum } from '../components/actions';
import { AlbumType, UserType } from "../customTypes";
import { postAlbum, updateUser } from '../utils/api-client';

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
      case 'UPDATE_ACTIVE':
        return {...state, activeAlbum: action.payload};
      case 'TOGGLE_ACTIVE_FAVE':
        return {...state, activeAlbum: { ...state.activeAlbum, favorite: !state.activeAlbum.favorite }};
      case 'TOGGLE_OFFLINE':
        return {...state, offline: !state.offline};
      case 'SET_UPLOADING':
        return {...state, uploading: action.payload};
    default : return state;
  }
}

const initialAlbumState = [] as AlbumType[];

const albumsReducer = (state = initialAlbumState, action: { type: string, payload?: number | string | AlbumType | AlbumType[]}) => {
  switch(action.type) {
    case 'GET_ALBUMS':
      return action.payload;
    case 'ADD_ALBUM':
      return [
        ...state,
        action.payload
      ];
    case 'UPDATE_ALBUM':
      const updatedAlbum = action.payload as AlbumType;
      const updatedAlbumList = [...state.map(album => {
        // Update the album with matching ID
        const newAlbum = album.id === updatedAlbum.id
          ? {
            ...updatedAlbum,
          }
          : album;
          return newAlbum;
        })
      ];
      console.log('Updated state list is : ', updatedAlbumList);
      return updatedAlbumList;

    case 'TOGGLE_FAVE':
      const newAlbumList = [...state.map(album => {
        // Update the album with matching ID
        const updatedAlbum = album.id === action.payload 
        ? {
          ...album,
          favorite: !album.favorite
        }
        : album;
        // Update the album on the DB
        // console.log(updatedAlbum)
        if (album.id === action.payload) postAlbum(process.env.REACT_APP_USER, updatedAlbum);
          return updatedAlbum;
        })
      ];
      return newAlbumList;


    


    case 'ADD_CONTACT_ALBUMS':
      console.log('Reducer trying to add contact albums: ', action.payload);
      return [...state, ...action.payload as AlbumType[]]
    case 'REMOVE_CONTACT_ALBUMS':
      return [...state.filter(album => {
        return (album.sharedWith.length === 0) || (album.sharedWith[0] !== action.payload);
      })];
    default: return state;
  }
}

const initialContactsState: UserType[] = [];

const contactsReducer = (state = initialContactsState, action: { type: string, payload: string | UserType }) => {
  switch(action.type) {
    case 'GET_ALL_USERS':
      return action.payload;
    case 'TOGGLE_FOLLOWED':
      const contactId = action.payload as string;
      const newContactsList = [...state.map(user => {
        // Find the current user, and add or delete the contact from the payload to their contact list.
        let newContacts: string[] = [];
        if (user._id.toString() === process.env.REACT_APP_USER) {
          newContacts = [...user.contacts];
          const index = user.contacts.indexOf(contactId);
          if (index < 0) {
            newContacts.push(contactId);
          } else {
            newContacts.splice(index, 1);
          }
        }

        const updatedUser = user._id.toString() === process.env.REACT_APP_USER
          ? {
            ...user,
            contacts: newContacts
          }
          : {...user};
          // Update the user on the DB
          if (user._id.toString() === process.env.REACT_APP_USER) {
            updateUser(updatedUser);
          }
          return updatedUser;
        })
      ];
      console.log('After reducer the updated contacts list is: ', newContactsList);
      return newContactsList;
    default: return state;
  }
}

const reducer = combineReducers({
  screenReducer,
  albumsReducer,
  contactsReducer
});

export default reducer;
