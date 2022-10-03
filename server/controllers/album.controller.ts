import { User, Album } from "../models/schema";
import { Context } from "koa";
import { IAlbumType } from '../types/AlbumType';

export const postAlbum = async (ctx: Context) => {
  // should receive userId and album
  try {
    const userId = ctx.request.body?.userId;
    const album = <IAlbumType>ctx.request.body?.album;
    if (!userId || !album) {
      throw new Error('Missing user input.')
    }
    // console.log("The album received is: ", album);

    // Either create the album on the user or update it if it already exists.
    // Existing albums will have a populated MongoDB ID.
    if (!album.id || Object.keys(album.id).length === 0) {
      // if album id is not available
      const user = await User.findOne({ _id: userId });
      const newAlbum = new Album(album);
      if(!user || Object.keys(user).length === 0) throw new Error('No user found')
      
      user.albums.push(newAlbum as IAlbumType);
      // add this to synchronise id and _id (generated by MongoDB)
      // to test if this works
      newAlbum.id = newAlbum._id
      user.save();
      // return value is not used in frontend ?
      ctx.body = newAlbum._id;
      ctx.status=201;
    } else {     
      // if album id is already available 
      const user = await User.findOne({ "_id": userId });
      if(!user || Object.keys(user).length === 0) throw new Error('No user found')
    
      user.albums.forEach((el, index) => {
        if (album!.id = el._id) {
            user!.albums[index] = { ...album, _id: album.id}
          }
          console.log("Searching for existing album, found: ", user!.albums[index]);
        })
        user.save();
        ctx.status = 200;
      }
    
  } catch (err) {
    console.log("Error in server postAlbum: ", err);
    ctx.status = 400;
  }
};



export const deleteAlbums = async (ctx:Context) => {
  try {
    const userId = ctx.request.body?.userId;
    const user = await User.findOne({ _id: userId });
    if(user) {
      user.albums = [];
      user.save();
    }
   
    ctx.status = 204;
    console.log(`User ${userId} albums removed`);
  } catch (err) {
    console.log("Error in the server deleteAlbum: ", err);
    ctx.status = 500;
  }
}

// not implemented by author
export const getSharedAlbums = (ctx:Context) => {
  // logic to get shared albums 
}
