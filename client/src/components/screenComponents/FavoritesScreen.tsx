import { ReactElement } from "react";
import { AlbumType } from "../../customTypes";
import { useAppSelector } from "../../redux/hooks";
import Album from "../albumComponents/Album";


function AlbumListScreen() : ReactElement {

  const albumList : AlbumType[] = useAppSelector(state => state.albumsReducer);

  return (
    <div className="h-full w-full overflow-y-auto flex flex-col justify-start items-center bg-customOrange sm:bg-customPurple sm:max-w-2xl sm:mt-4 sm:mb-10 sm:rounded-lg">
      {albumList.filter(album => album.favorite).map(album => <Album key={album.id} {...album} />)}
    </div>
  )
}

export default AlbumListScreen;