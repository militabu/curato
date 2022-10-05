import { ObjectId } from "mongodb";
import { IAlbum } from "./AlbumType";

export interface IUser {
  _id: ObjectId;
  userName: string;
  userImg: string;
  contacts: string[];
  friendsAlbums: [{ userId: String, albumId: String }],
  albums: IAlbum[], 
}