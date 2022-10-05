import { AlbumType, UserType } from "../customTypes";

const baseUrl = process.env.REACT_APP_BASE_URL;


const getUser = async (userId: string) => {
  if (!userId) return
  try {
    const response = await fetch(`${baseUrl}/user`, {
      method: 'POST', 
      headers: { 'Content-Type':'application/json'},
      body: JSON.stringify({ id : userId })
    });
    if(!response || Object.keys(response).length === 0) return
    const output = await response.json();
    console.log('Fetched the user: ', output);
    return output;
  } catch (err) {
    console.log('Error in the api client getAlbums: ', err);
  }
}

const updateUser = async (user: UserType) => {
  try {
    await fetch(`${baseUrl}/update-user`,
    {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(user),
    });
    // const output = await response.json();
    // console.log('Updating user to ', output);
    // return output;
  } catch (err) {
    console.log('Error in the api client updateUser: ', err);
  }
}

const postAlbum = async (userId:string, album: AlbumType) => {
  try {
    const response = await fetch(`${baseUrl}/albums`, 
    {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ userId: userId, album: album }),
    });
    // const output = await response.json();
    const output = await response.text();
    console.log('Api post album query returns: ', output);
    return output;
  } catch (err) {
    console.log('Error in the api client postAlbum: ', err);
  }
}

const getAllUsers = async () => {
  try {
    const response = await fetch(`${baseUrl}/userlist`);
    if(!response || Object.keys(response).length === 0) return
    const output = await response.json();
    console.log('Fetched the userlist: ', output);
    return output;
  } catch (err) {
    console.log('Error in the api client getAllUsers: ', err);
  }
}

export { getUser, postAlbum, getAllUsers, updateUser }