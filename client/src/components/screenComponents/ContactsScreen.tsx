import { ObjectId } from "mongodb";
import { ReactElement, useEffect, useState } from "react";
import { UserType } from "../../customTypes";
import { useAppSelector } from "../../redux/hooks";
import Contact from "../contactComponents/Contact";
import TextField from '@mui/material/TextField';
import UserList from "../contactComponents/UserList";

function ContactsScreen() : ReactElement {

  const userList: UserType[] = useAppSelector(state => state.contactsReducer);
  const myContacts: string[] = userList.find(user => user._id.toString() === process.env.REACT_APP_USER)?.contacts ?? [];

  // console.log('Contacts in the contacts screen: ', myContacts);
  
  // Local state management for the search bar
  const [searchState, setSearchState] = useState("");
  const searchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchState(event.target.value.toLowerCase());
  }

  return (
    <>
      <div className="group border-t w-full py-4 text-xl bg-customBlue flex flex-col items-center">
          <input
            className="peer w-10/12 py-2 pl-4 rounded-full"
            id="outlined-basic"
            value={searchState}
            onChange={searchHandler}
            placeholder="Search Contacts..."
          />
        <div className="w-full flex peer-placeholder-shown:hidden justify-center">
          <UserList { ...{ input: searchState } } />
        </div>
      </div>
      <div className="bg-customTeal w-full pl-6 py-1 text-xl font-semibold">
        <h3>My Contacts</h3>
      </div>
      <div className="h-full w-full pt-4 overflow-y-auto flex flex-col justify-start items-center bg-customBlue">
        {userList
          .filter(user => myContacts.includes(user._id.toString()))
          .map(contact => <Contact key={contact._id.toString()} {...contact} />)}
      </div>
    </>
  )
}

export default ContactsScreen;