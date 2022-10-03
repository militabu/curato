import { ObjectId } from "mongodb";
import { IAlbumType } from "./AlbumType";

export interface IUserType {
  _id: ObjectId;
  userName: string;
  userImg: string;
  contacts: string[];
  friendsAlbums: [{ userId: String, albumId: String }],
  albums: IAlbumType[], 
}