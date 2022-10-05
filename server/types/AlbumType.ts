import { ObjectId } from 'mongodb';

export interface IAlbum {
  _id:ObjectId;
  id: string | ObjectId; // this needs to synchronise with _id from MongoDB
  title: string;
  date: number;
  description: string;
  favorite: boolean;
  coverImg: string;
  sharedWith: string[];
  images: string[];
}
