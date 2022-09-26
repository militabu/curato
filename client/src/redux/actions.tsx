// Actions to update the screen / view

import { AlbumInputData, AlbumType } from "../customTypes"

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

export const toggleActiveFavorite = () => {
  return {
    type: 'UPDATE_ACTIVE'
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

export const updateAlbum = () => {
  return {
    type: 'UPDATE_ALBUM',
  }
}

export const deleteAlbum = () => {
  return {
    type: 'UPDATE_ALBUM',
  }
}