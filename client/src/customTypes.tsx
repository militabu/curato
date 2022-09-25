import { ObjectId } from 'mongodb';

export type AlbumType = {
  id: string;
  title: string;
  date: number;
  description: string;
  favorite: boolean;
  coverImg: string;
  sharedWith: string[];
  images: string[];
};

export type ScreenState = {
  screen: number;
  viewAlbum: boolean;
  editAlbum: boolean;
  uploading: boolean;
  offline: boolean;
  activeAlbum: AlbumType;
};

export type AlbumInputData = {
  _id: ObjectId;
  title: string;
  date: number;
  description: string;
  favorite: boolean;
  coverImg: string;
  sharedWith: string[];
  images: string[];
};
