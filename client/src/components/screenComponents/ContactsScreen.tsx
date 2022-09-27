import { ReactElement, useState } from "react";
import { UserType } from "../../customTypes";
import { useAppSelector } from "../../redux/hooks";
import Contact from "../contactComponents/Contact";
import UserList from "../contactComponents/UserList";

function ContactsScreen() : ReactElement {

  const userList: UserType[] = useAppSelector(state => state.contactsReducer);
  const myContacts: string[] = userList.find(user => user._id.toString() === process.env.REACT_APP_USER)?.contacts ?? [];
  
  // Local state management for the search bar
  const [searchState, setSearchState] = useState("");
  const searchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchState(event.target.value);
  }

  return (
    <div className="h-full w-full overflow-y-auto flex flex-col justify-start items-center bg-customBlue  sm:bg-customPurple sm:max-w-2xl sm:mt-4 sm:mb-10 sm:rounded-lg">
      <div className="w-full text-xl py-4 flex flex-col items-center sm:px-10">
          <input
            className="peer w-10/12 py-2 pl-4 rounded-full"
            id="outlined-basic"
            value={searchState}
            onChange={searchHandler}
            placeholder="Search Contacts..."
          />
        <div className="w-full flex peer-placeholder-shown:hidden justify-center sm:rounded-lg">
          <UserList { ...{ input: searchState } } />
        </div>
      </div>
      <div className="bg-customTeal w-full pl-6 py-1 text-xl font-semibold sm:rounded-md">
        <h3>My Contacts</h3>
      </div>
      <div className="h-full w-full pt-4 overflow-y-auto flex flex-col justify-start items-center bg-customBlue sm:bg-customPurple">
        {userList
          .filter(user => myContacts.includes(user._id.toString()))
          .map(contact => <Contact key={contact._id.toString()} contact={contact} text={'Unfollow'} />)}
      </div>
    </div>
  )
}

export default ContactsScreen;