import { ReactElement, useEffect } from "react";
import { AlbumType } from "../../customTypes";
import { getAlbums } from "../../redux/actions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getUser } from "../../utils/api-client";
import Album from "../albumComponents/Album";


function AlbumListScreen() : ReactElement {

  const albumList : AlbumType[] = useAppSelector(state => state.albumsReducer);

  return (
    <div className="h-full w-full overflow-y-auto flex flex-col justify-start items-center bg-customPurple">
      {albumList.map(album => <Album key={album.id} {...album} />)}
    </div>
  )
}

export default AlbumListScreen;