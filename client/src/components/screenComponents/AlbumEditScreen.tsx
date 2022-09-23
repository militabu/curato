import React, { ReactElement, useState } from "react";
import { AlbumType } from "../../customTypes";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { formatDate } from "../../utils/utils";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { toggleAlbumEdit } from "../../redux/actions";

function AlbumEditScreen(): ReactElement {
  
  const initialState = {
    title: "",
    date: Date.now(),
    description: "",
    coverImg: "",
    images: [],
  };
  
  const [formState, setFormState] = useState(initialState);
  const dispatch = useAppDispatch();
  
  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    // TODO: could we use event.currentTarget to avoid this casting,
    // or would this break as the handler is registered to multiple inputs?
    const { name, value } = event.currentTarget;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleImage = (event: React.FormEvent<HTMLInputElement>) => {
    console.log(event.currentTarget.value);

    const imageId = event.currentTarget.id;
    console.log(`Target label: ${imageId}Label`);
    const preview = document.querySelector(`#${imageId}Label`);

    while (preview?.firstChild) {
      preview.removeChild(preview.firstChild);
    }

    const currFiles = event.currentTarget.files;
    console.log('Files found: ', currFiles);

    if (currFiles && currFiles?.length > 0) {
      const imgFile = currFiles![0];
      const image = document.createElement('img');
      image.classList.add("object-cover", "h-full", "w-full");
      image.src = URL.createObjectURL(imgFile);
      preview?.appendChild(image);
    } else {
      const errPara = document.createElement('p');
      errPara.textContent = 'No file found';
      preview?.appendChild(errPara);
    }
  }

  return (
    <>
      <nav className="w-full flex items-center justify-between pl-3 pr-3 py-3 z-50 bg-white sticky top-0 left-0 right-0">
        <div className="flex justify-start items-center">
          <IconButton
            color="inherit"
            onClick={() => dispatch(toggleAlbumEdit())}
          >
            <ArrowBackIcon fontSize="large" />
          </IconButton>
          <h1 className="text-2xl">New Album</h1>
        </div>
        <button className="text-xl mr-3 px-8 py-2 rounded-md bg-customTeal font-semibold">
          Save
        </button>
      </nav>
      <form className="w-full text-xl">
        <input className="w-full pl-4 py-2 border-t" type="text" name="title" value={formState.title} placeholder="Add album name..." onChange={handleChange}></input>
        <input className="w-full px-4 py-2 border-t" type="date" name="date" value={new Date(formState.date).toISOString().split('T')[0]} onChange={handleChange}></input>
        <input className="w-full pl-4 py-2 border-t" type="text" name="description" value={formState.description} placeholder="Add album description..." onChange={handleChange}></input>
      </form>
      <div className="h-full w-full px-4 pt-4 overflow-y-auto flex flex-col justify-start items-center bg-customGreen">
        <div className="w-full">
          <div className="grid grid-cols-2 gap-4">
            {[0, 1, 2, 3].map((num) => (
              <div key={num}>
                <label
                  id={`image${num}Label`}
                  htmlFor={`image${num}`}
                  className="aspect-square flex items-center justify-center bg-white shadow-md"
                >
                  <AddIcon style={{ fontSize: "3rem" }} />
                </label>
                <input
                  id={`image${num}`}
                  className="hidden"
                  type="file"
                  name="image1"
                  accept="image/x-png,image/jpeg,image/gif"
                  onChange={handleImage}
                ></input>
            </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default AlbumEditScreen;
