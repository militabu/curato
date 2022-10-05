import { useEffect } from 'react';
import './App.css';
import FooterMenu from './components/FooterMenu';
import MainScreen from './components/MainScreen';
import Navbar from './components/Navbar';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { ScreenState, AlbumType } from "./customTypes";
import { getUser, getAllUsers } from './utils/api-client';
import { getAlbums, getUsers } from './components/actions';


function App() {
  
  const screenState: ScreenState = useAppSelector(state => state.screenReducer)

  const dispatch = useAppDispatch();

  useEffect(() => {
    const userId = process.env.REACT_APP_USER
    // console.log('App level user ID is: ', userId);

    // On app loading, create the list of albums to show by getting the Mongo DB document for the current user.
    getUser(userId)
      .then((res) => {
        // Create a local list of contacts for sourcing shared albums
        // const myContacts = res.contacts;
        // A bit awkward, but we need to replace the '_id' property from Mongo 
        // with the 'id' property expected by the AlbumType
        for (let album of res.albums) {
          album.id = album._id;
          delete album._id;
        }
        // console.log('Result of fetching user is: ', res);
        dispatch(getAlbums(res.albums));
      })
      .catch(error => console.log(error))

      // NOTE: Abandoning this method. Originally the plan was to show my albums and shared albums on the same screen,
      // but functionality such as favorite toggling requires positional information from the state, which is messed up by 
      // showing other people's albums. The solution seems to be adding them to my album list when shared.
      // .then(async (_) => {
      //   console.log('Initially, fullAlbumsList is: ', fullAlbumList);
      //   const sharedAlbums = await getSharedAlbums(myContacts);  
      //   fullAlbumList.push(...sharedAlbums);
      //   console.log('Adding shared albums, fullAlbumsList is: ', fullAlbumList);
      //   dispatch(getAlbums(fullAlbumList));
      // })

    // To populate the full list of contacts for searching, save it to the redux state here:
    getAllUsers().then(res => dispatch(getUsers(res))).catch(error => console.log(error));
  }, []);

  // To get any albums shared with us by our contacts, we can cycle through contacts and pull the user information for each.
  async function getSharedAlbums(contactList: string[]) {
    let sharedAlbums: AlbumType[] = []
    console.log('Searching through contact list: ', contactList);
    for (const contact of contactList) {
      console.log('searching for user:', contact);
      await getUser(contact)
      .then((res) => {
        for (let album of res.albums) {
          album.id = album._id;
          delete album._id;
          sharedAlbums.push(album);
        }
      });
    }
    return sharedAlbums;
  }


  // TODO: Currently the navbar hides when editing an album, to instead show a custom navbar in the edit screen.
  // This works great on the mobile interface, but I'll need to keep the main navbar AND the editing navbar on desktop.
  return (
    <div className="flex flex-col" style={{height: "100vh"}}>
      { screenState.editAlbum ? <></> : <Navbar /> }
      <MainScreen />
      { screenState.editAlbum ? <></> : <FooterMenu /> }
    </div>
  )
}

export default App;
function e(e: any, TypeError: TypeErrorConstructor) {
  throw new Error('Function not implemented.');
}

