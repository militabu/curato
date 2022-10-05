import { ReactElement, useState } from "react";
import SettingsIcon from '@mui/icons-material/Settings';
import EditIcon from '@mui/icons-material/Edit';
import ShareIcon from '@mui/icons-material/Share';
import IconButton from '@mui/material/IconButton';
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { ScreenState, UserType } from "../customTypes";
import { editAlbum, changeScreen } from "./actions";
import Contact from "./contactComponents/Contact";

function Navbar() : ReactElement {

  const screen: ScreenState = useAppSelector(state => state.screenReducer);
  const userList: UserType[] = useAppSelector(state => state.contactsReducer);
  const myContacts: string[] = userList.find(user => user._id.toString() === process.env.REACT_APP_USER)?.contacts ?? [];

  const [share, setShare] = useState(false);
  const [contactMenu, showContactMenu] = useState(false);
  const dispatch = useAppDispatch();

  const shareHandler = () => {
    showContactMenu(!contactMenu);
  }

  const buttonHandler = () => {
    shareHandler();
    setShare(!share);
  }

  return (
    <div data-testid='navbar-1'>
    <nav className="flex items-center justify-between pl-6 pr-3 py-3 z-50 bg-white sm:bg-customPurple sm:text-white sticky top-0 left-0 right-0">
      <h1 className="text-4xl sm:text-5xl font-header">Curato</h1>
      <div className="hidden sm:flex w-7/12 items-center justify-between text-2xl">
        <a href="#" onClick={() => dispatch(changeScreen(0))}>Albums</a>
        <a href="#" onClick={() => dispatch(changeScreen(1))}>Contacts</a>
        {/* <a href="#" onClick={() => dispatch(changeScreen(2))}>Favorites</a> */}
        <a href="#">Settings</a>
      </div>
      <div className="sm:hidden flex space-x-4">
        { screen.viewingAlbum ?
          <IconButton onClick={shareHandler} color='inherit'>
            <ShareIcon fontSize="large" style={{ color: share ? '#0d6efd' : '#000' }} /> 
          </IconButton> : <></>}

        <IconButton onClick={screen.viewingAlbum ? () => dispatch(editAlbum(screen.activeAlbum)) : () => {}} color='inherit'>
          { screen.viewingAlbum 
            ? <EditIcon fontSize="large" /> 
            : <SettingsIcon fontSize="large"/> 
          }
        </IconButton>
      </div>
    </nav>

    <div className={`${contactMenu ? 'flex' : 'hidden'} flex-col justify-center items-center`}>
        <button className="bg-customTeal font-semibold rounded-md w-40 px-4 py-1 my-2 float-right" onClick={shareHandler}>
            Public Share
        </button>
        {userList
          .filter(user => myContacts.includes(user._id.toString()))
          .map(contact => <Contact key={contact._id.toString()} callback={buttonHandler} contact={contact} text={'Share'} />)
        }
    </div>
    </div>
  )
}

export default Navbar;