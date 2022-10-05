import mongoose from '../db';
import { IAlbum } from '../types/AlbumType';
import { IUser } from '../types/UserType';


const albumSchema = new mongoose.Schema<IAlbum>({
  id:String, // added this to the schema - needs to synchronise with MongoDB _id
  title: String, 
  date: Number,
  description: String,
  favorite: Boolean,
  coverImg: String,
  sharedWith: [String],
  images: {type: [String], default: []}
})
export const Album = mongoose.model('Album', albumSchema);

const userSchema = new mongoose.Schema<IUser>({
  userName: String,
  userImg: String,
  contacts: {type: [String], default: []},
  friendsAlbums: [{ userId: String, albumId: String }],
  albums: { type: [albumSchema], default: [] }
});

export const User = mongoose.model('User', userSchema);



