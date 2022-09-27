import { ReactElement } from "react";
import { UserType } from '../../customTypes';
import { useAppDispatch } from "../../redux/hooks";
import * as actions from '../../redux/actions';
import { getUser } from "../../utils/api-client";

function SearchContact(contact: UserType): ReactElement {

  const dispatch = useAppDispatch();

  const handleFollowClick = async (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    console.log('IS this running??')
    dispatch(actions.toggleFollowed(contact._id.toString()));
    const contactData = await getUser(contact._id.toString());
    console.log('Dispatching contact albums: ', contactData.albums);
    dispatch(actions.addContactAlbums(contactData.albums));
  }

  return (
    <div 
      className="bg-white h-20 py-1 px-2 rounded-md flex items-center justify-between z-0 first:mt-0 mt-4"
    >
      <div className="h-full flex justify-start items-center">
        <img className="rounded-full h-full aspect-square object-cover" src={contact.userImg} alt="User profile pic" />
        <h3 className="font-semibold text-2xl pl-4">{contact.userName}</h3>
      </div>
      <div className="w-1/4 mr-2 flex justify-end items-center">
          <button onClick={handleFollowClick} className="rounded-md bg-blue-600 text-white px-4 py-2 font-semibold">
            Follow
          </button>
      </div>
    </div>
  );
}

export default SearchContact;