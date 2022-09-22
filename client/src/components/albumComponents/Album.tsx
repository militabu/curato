import { MouseEventHandler, ReactElement } from "react";
import { AlbumType } from '../../customTypes';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

function padTo2Digits(num: number) {
  return num.toString().padStart(2,'0');
}

function formatDate(date: Date) {
  return [
    padTo2Digits(date.getDate()),
    padTo2Digits(date.getMonth() + 1),
    date.getFullYear(),
  ].join('/');
}

function Album(album: AlbumType): ReactElement {

  const handleFaveClick = () => {
    album.favourite = !album.favourite;
  }

  return (
    <div className="bg-white w- h-1/6 p-4 mx-4 mt-4 rounded-md flex justify-between">
      <div className="flex flex-col justify-center items-start" >
        <h3 className="font-bold text-2xl">{album.title}</h3>
        <h6>{formatDate(album.date)}</h6>
      </div>
      <div className="w-1/2 flex justify-end items-center">
        <div className="mr-3">
          <IconButton
            onClick={handleFaveClick}
            color={album.favourite ? "primary" : "inherit"}
          >
            {album.favourite ? <FavoriteIcon fontSize="large"/> : <FavoriteBorderIcon fontSize="large"/>}
          </IconButton>
        </div>
        <div className="h-full object-cover">
          <img src={album.img} alt="Album primary pic" />
        </div>
      </div>
    </div>
  );
}

export default Album;