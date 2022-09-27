import { ReactElement, useState } from "react";
import { ScreenState } from "../../customTypes";
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useAppDispatch } from "../../redux/hooks";
import * as actions from '../../redux/actions';
import { useAppSelector } from "../../redux/hooks";
import { formatDate } from '../../utils/utils';
import Modal from "../albumComponents/ImageModal";

function AlbumViewScreen() : ReactElement {

  const screenState: ScreenState = useAppSelector(state => state.screenReducer);
  const dispatch = useAppDispatch();

  const [modalData, setModalData] = useState({ imgSrc:"", modal:false });
  const toggleModal = (imgSrc: string) => {
    setModalData( { imgSrc, modal: !modalData.modal });
  }

  const handleFaveClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    dispatch(actions.toggleFavorite(screenState.activeAlbum.id));
    dispatch(actions.toggleActiveFavorite());
  }

  return (
    <>
    {modalData.modal && <Modal imgSrc={modalData.imgSrc} callback={() => toggleModal(modalData.imgSrc)} />}
    <div className="h-full w-full px-4 pt-4 overflow-y-auto flex flex-col justify-start items-center bg-customPink">
      <div className="bg-white w-full p-4 space-y-1 rounded-md flex flex-col justify-between">
         <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-2xl">{screenState.activeAlbum.title}</h3>
            <h6>{formatDate(new Date(screenState.activeAlbum.date))}</h6>
          </div>
          <IconButton
            onClick={handleFaveClick}
            color={screenState.activeAlbum.favorite ? "primary" : "inherit"}
          >
            {screenState.activeAlbum.favorite ? <FavoriteIcon fontSize="large"/> : <FavoriteBorderIcon fontSize="large"/>}
          </IconButton>
        </div>
        <h6>{screenState.activeAlbum.description}</h6>
      </div>
      <div className="w-full my-4"> 
        <div className="grid grid-cols-2 gap-4">
          { screenState.activeAlbum.images.map((image, index) => {
              return (
              <div key={index} onClick={() => toggleModal(image)} className="border-2 border-solid aspect-square flex items-center justify-center">
                <img className="object-cover w-full h-full" src={image} alt='Modal popup'/>
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