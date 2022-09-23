import { ReactElement } from "react";
import { AlbumType } from "../../customTypes";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { formatDate } from '../../utils/utils';
import IconButton from '@mui/material/IconButton'; 
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EventIcon from '@mui/icons-material/Event';
import { toggleAlbumEdit } from "../../redux/actions";

function AlbumEditScreen() : ReactElement {

  const dispatch = useAppDispatch();

  return (
    <>
    <nav className="w-full flex items-center justify-between pl-3 pr-3 py-3 z-50 bg-white sticky top-0 left-0 right-0">
      <div className="flex justify-start items-center">
        <IconButton color='inherit' onClick={() => dispatch(toggleAlbumEdit())}>
          <ArrowBackIcon fontSize="large"/>
        </IconButton>
        <h1 className="text-2xl">Add Album</h1>
      </div>
      <button className="text-xl mr-3 px-8 py-2 border-2 rounded-md bg-customTeal">
        Save
      </button>
    </nav>
    <div className="h-full w-full px-4 pt-4 overflow-y-auto flex flex-col justify-start items-center bg-customPink">
      <div className="bg-white w-full p-4 space-y-1 rounded-md flex flex-col justify-between">
        <h3 className="font-bold text-2xl">TBC</h3>
        <h6>TBC</h6>
        <h6>TBC</h6>
      </div>
      <div className="w-full my-4"> 
        <div className="grid grid-cols-2 gap-4">
          <div className="border-2 border-solid aspect-square flex items-center justify-center">
            <AddIcon fontSize="large" />
          </div>
          <div className="border-2 border-solid aspect-square flex items-center justify-center">
            <AddIcon fontSize="large" />
          </div>
          <div className="border-2 border-solid aspect-square flex items-center justify-center">
            <AddIcon fontSize="large" />
          </div>
          <div className="border-2 border-solid aspect-square flex items-center justify-center">
            <AddIcon fontSize="large" />
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default AlbumEditScreen;