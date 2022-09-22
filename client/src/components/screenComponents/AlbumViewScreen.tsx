import { ReactElement } from "react";
import { AlbumType } from "../../customTypes";
import { useAppSelector } from "../../redux/hooks";
import { formatDate } from '../../utils/utils';
import AddIcon from '@mui/icons-material/Add';

function AlbumViewScreen(album: AlbumType) : ReactElement {

  return (
    <>
    <div className="h-full w-full px-4 pt-4 overflow-y-scroll flex flex-col justify-start items-center bg-customPink">
      <div className="bg-white w-full p-4 space-y-1 rounded-md flex flex-col justify-between">
        <h3 className="font-bold text-2xl">{album.title}</h3>
        <h6>{formatDate(new Date(album.date))}</h6>
        <h6>Our trip to Portugal was in the winter, but everyone kept warm in the local bars, with sangria on tap, woop woop! 
#wingria #bestlife</h6>
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

export default AlbumViewScreen;