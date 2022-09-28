import { UserType } from "../../customTypes";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getUser } from "../../utils/api-client";
import Contact from "./Contact";
import * as actions from '../../redux/actions';

function UserList(props: { input: string }) {

  const userList: UserType[] = useAppSelector(state => state.contactsReducer);


  const dispatch = useAppDispatch();

  const handleFollowClick = async (contact: UserType) => {
    console.log('IS this running??')
    dispatch(actions.toggleFollowed(contact._id.toString()));
    const contactData = await getUser(contact._id.toString());
    console.log('Dispatching contact albums: ', contactData.albums);
    dispatch(actions.addContactAlbums(contactData.albums));
  }

  return (
    <div className="bg-white mt-4 w-full px-4 py-4 sm:rounded-lg">
      <ul>
        {userList
          .filter((item) => item._id.toString() !== process.env.REACT_APP_USER)
          .filter((item) => item.userName.toLowerCase().includes(props.input.toLowerCase()))
          .map((item) => {
          return (
            // <li key={item._id.toString()}>{item.userName}</li> 
            <Contact key={item._id.toString()} contact={item} text={'Follow'} callback={() => handleFollowClick(item)} />
          )
        })
        }
      </ul>
    </div>
  );
}

export default UserList;