// Actions to update the screen / view

import { AlbumType, UserType } from "../customTypes"

export const changeScreen = (value: number) => {
  return {
    type: 'CHANGE_SCREEN',
    payload: value
  }
}

export const viewAlbum = (album: AlbumType) => {
  // console.log('Trying to view album:', album);
  return {
    type: 'VIEW_ALBUM', 
    payload: album,
  }
}

export const toggleAlbumEdit = () => {
  return {
    type: 'TOGGLE_EDIT',
  }
}

export const editAlbum = (album: AlbumType) => {
  // console.log('Trying to edit album:', album);
  return {
    type: 'EDIT_ALBUM',
    payload: album,
  }
}

export const toggleFavorite = (id: string) => {
  return {
    type: 'TOGGLE_FAVE',
    payload: id
  }
}

// export const toggleFavorite = (payload: string) => {
//   return {
//     type: 'TOGGLE_FAVE',
//     payload
//   }
// }


export const toggleActiveFavorite = () => {
  return {
    type: 'TOGGLE_ACTIVE_FAVE'
  }
}

export const updateActive= (album: AlbumType) => {
  return {
    type: 'UPDATE_ACTIVE',
    payload: album
  }
}

export const setUploading = (uploading: boolean) => {
  return {
    type: 'SET_UPLOADING',
    payload: uploading,
  }
}

export const toggleOffline = () => {
  return {
    type: 'TOGGLE_OFFLINE',
  }
}

// CRUD actions for the album database

export const getAlbums = (albumList : AlbumType[]) => {
  return {
    type: 'GET_ALBUMS',
    payload: albumList
  }
}

export const addAlbum = (albumData: AlbumType) => {
  console.log('Trying to add an album: ', albumData);
  return {
    type: 'ADD_ALBUM',
    payload: albumData
  }
}

export const updateAlbum = (updatedAlbum: AlbumType) => {
  console.log('Trying to update existing album');
  return {
    type: 'UPDATE_ALBUM',
    payload: updatedAlbum
  }
}

export const addContactAlbums = (albums: AlbumType[]) => {
  return {
    type: 'ADD_CONTACT_ALBUMS',
    payload: albums
  }
}

export const removeContactAlbums = (contactId: string) => {
  return {
    type: 'REMOVE_CONTACT_ALBUMS',
    payload: contactId
  }
}

export const getUsers = (userList: UserType[]) => {
  return {
    type: 'GET_ALL_USERS',
    payload: userList
  }
}

export const getContacts = () => {
  return {
    type: 'GET_CONTACTS'
  }
}

export const toggleFollowed = (userId: string) => {
  return {
    type: 'TOGGLE_FOLLOWED',
    payload: userId
  }
}