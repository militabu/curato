import { ObjectId } from 'mongodb';

export interface AlbumType {
  id: ObjectId;
  title: string;
  date: number;
  description: string;
  favorite: boolean;
  coverImg: string;
  sharedWith: string[];
  images: string[];
}