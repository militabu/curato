import React, { ReactElement } from "react";
import { AlbumType } from "../../customTypes";
import AddIcon from "@mui/icons-material/Add";

function ImagePickerSquare ({ index, album, callback } : { index: number, album: AlbumType, callback: (event: React.FormEvent<HTMLInputElement>) => void }) : ReactElement {

  return (
    <div key={index} data-testid={`image-upload-${index}`}>
      <label
        id={`image-box-${index}`}
        htmlFor={`image${index}`}
        className="aspect-square flex items-center justify-center bg-white shadow-md"
      >
        {/* The fallback value for activeAlbum is an empty object, so we have to check for any keys before trying to access the images */}
        {
          Object.keys(album).length > 0 && album.images[index]
          ? <img className="h-full w-full object-cover" src={album.images[index]}></img> 
          : <AddIcon style={{ fontSize: "3rem" }} /> 
        }
      </label>
      <input
        id={`image${index}`}
        className="hidden"
        type="file"
        name="image1"
        accept="image/x-png,image/jpeg,image/gif"
        onChange={callback}
      ></input>
    </div>
  );
}

export default ImagePickerSquare;