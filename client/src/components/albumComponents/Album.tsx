import { ReactElement } from "react";
import { AlbumType } from '../../customTypes';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useAppDispatch } from "../../redux/hooks";
import * as actions from '../../redux/actions';
import { formatDate } from '../../utils/utils'

function Album(album: AlbumType): ReactElement {

  const dispatch = useAppDispatch();

  const handleFaveClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    // Change the favorite property on the state of the album.
    // This action also writes to the DB to store the new favorite flag. 
    dispatch(actions.toggleFavorite(album.id));
  }

  return (
    <div 
      className="bg-white h-28 p-4 mx-4 mt-4 rounded-md flex justify-between z-0"
      onClick={() => dispatch(actions.viewAlbum(album))}
    >
      <div className="flex flex-col justify-center items-start" >
        <h3 className="font-bold text-2xl">{album.title}</h3>
        <h6>{formatDate(new Date(album.date))}</h6>
      </div>
      <div className="w-1/2 flex justify-end items-center">
        <div className="mr-3 z-10">
          <IconButton
            onClick={handleFaveClick}
            color={album.favorite ? "primary" : "inherit"}
          >
            {album.favorite ? <FavoriteIcon fontSize="large"/> : <FavoriteBorderIcon fontSize="large"/>}
          </IconButton>
        </div>
        <div className="h-full">
          <img className="h-full w-full object-cover" src={album.coverImg} alt="Album primary pic" />
        </div>
      </div>
    </div>
  );
}

export default Album;