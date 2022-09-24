import { AlbumType } from "../customTypes";

const baseUrl = 'http://localhost:3210';

const getUser = async (userID: string) => {
  try {
    const response = await fetch(`${baseUrl}/user`, {
      method: 'GET', 
      body: JSON.stringify({ "id": userID })
    });
    const output = await response.json()
    console.log('Fetched the user: ', output);
    return output;
  } catch (err) {
    console.log('Error in the api client getAlbums: ', err);
  }
}

const postAlbum = async (userID:string, album: AlbumType) => {
  try {
    const response = await fetch(`${baseUrl}/user`, 
    {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(album),
    });
    const output = await response.json()
    return output;
  } catch (err) {
    console.log('Error in the api client postAlbum: ', err);
  }
}

export { getUser, postAlbum }