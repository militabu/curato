import { ReactElement } from "react";
import { AlbumType } from "../../customTypes";
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useAppDispatch } from "../../redux/hooks";
import * as actions from '../../redux/actions';
import { useAppSelector } from "../../redux/hooks";
import { formatDate } from '../../utils/utils';
import AddIcon from '@mui/icons-material/Add';

function AlbumViewScreen(album: AlbumType) : ReactElement {

  const dispatch = useAppDispatch();

  const handleFaveClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    return dispatch(actions.toggleFavorite(album.id))
  }

  return (
    <>
    <div className="h-full w-full px-4 pt-4 overflow-y-auto flex flex-col justify-start items-center bg-customPink">
      <div className="bg-white w-full p-4 space-y-1 rounded-md flex flex-col justify-between">
         <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-2xl">{album.title}</h3>
            <h6>{formatDate(new Date(album.date))}</h6>
          </div>
          <IconButton
            onClick={handleFaveClick}
            color={album.favorite ? "primary" : "inherit"}
          >
            {album.favorite ? <FavoriteIcon fontSize="large"/> : <FavoriteBorderIcon fontSize="large"/>}
          </IconButton>
        </div>
        <h6>{album.description}</h6>
      </div>
      <div className="w-full my-4"> 
        <div className="grid grid-cols-2 gap-4">
          { album.images.map(image => {
              return (
              <div className="border-2 border-solid aspect-square flex items-center justify-center">
                <img className="object-cover w-full h-full" src={image}/>
              </div>
              );
            })
          }
        </div>
      </div>
    </div>
    </>
  );
}

export default AlbumViewScreen;