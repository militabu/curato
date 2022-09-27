import { UserType } from "../../customTypes";
import { useAppSelector } from "../../redux/hooks";
import Contact from "./Contact";
import SearchContact from "./SearchContact";

function UserList(props: { input: string }) {

  const userList: UserType[] = useAppSelector(state => state.contactsReducer);

  return (
    <div className="bg-white mt-4 w-full px-4 py-4">
      <ul>
        {userList
          .filter((item) => item._id.toString() !== process.env.REACT_APP_USER)
          .filter((item) => item.userName.toLowerCase().includes(props.input.toLowerCase()))
          .map((item) => {
          return (
            // <li key={item._id.toString()}>{item.userName}</li> 
            <SearchContact key={item._id.toString()} {...item} />
          )
        })
        }
      </ul>
    </div>
  );
}

export default UserList;