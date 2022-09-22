// Actions to update the screen / view

import { AlbumType } from "../customTypes"

export const changeScreen = (value: number) => {
  return {
    type: 'CHANGE_SCREEN',
    payload: value
  }
}

export const viewAlbum = (album: AlbumType) => {
  console.log('Trying to view album:', album);
  return {
    type: 'VIEW_ALBUM', 
    payload: album,
  }
}

export const toggleFavorite = (id: string) => {
  return {
    type: 'TOGGLE_FAVE',
    payload: id
  }
}

// CRUD actions for the album database

export const createAlbum = () => {
  return {
    type: 'CREATE_ALBUM',
  }
}

export const fetchAlbums = () => {
  return {
    type: 'FETCH_ALBUMS',
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