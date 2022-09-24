import React, { ReactElement, useEffect, useState } from "react";
import { AlbumInputData, AlbumType, ScreenState } from "../../customTypes";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { addAlbum, toggleAlbumEdit } from "../../redux/actions";

function AlbumEditScreen(): ReactElement {
  
  let initialState: AlbumInputData = {
    title: "",
    date: Date.now(),
    description: "",
    coverImg: "",
    images: [],
  };

  const sanitize = (album: AlbumType) => {
    return {
      title: album.title,
      date: album.date,
      description: album.description,
      coverImg: album.coverImg,
      images: album.images,
    } as AlbumInputData
  }
  
  const screenState: ScreenState = useAppSelector(state => state.screenReducer);
  // If there is an active album (ie. we selected 'edit' from inside an album) then update the initial state with the album data.
  useEffect(() => {
    if (screenState.activeAlbum) {
      initialState = sanitize(screenState.activeAlbum);

      // for (const key in initialState) {
      //   const album = screenState.activeAlbum;
      //   const value = album[key as keyof AlbumType];
      //   initialState[key as keyof AlbumInputData] = value;
      // }
      // Object.entries(initialState).forEach(([key, value], index) => {
      //   initialState[key] = screenState.activeAlbum[key]);
      // }

      // Object.keys(initialState).forEach((_key) => {
      //   const key = _key as keyof AlbumType;
      //   console.log(screenState.activeAlbum[key]);
      //   initialState[key] = screenState.activeAlbum[key];
      // })

      // Object.keys(initialState).forEach(key => key in screenState.activeAlbum ? initialState[key] = screenState.activeAlbum[key] : null)
    
    }
    // console.log('Form state starts as: ', formState);
    console.log('Screen state starts as: ', screenState);
  }, [])
  
  const [formState, setFormState] = useState(initialState);
  const dispatch = useAppDispatch();

  // useEffect(() => console.log('Form state is now: ', formState), [formState]);
  
  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();

    // TODO: Create an 'Album' element from the form data
    // For now this is hardcoded in the reducer, but we'll need to send to Mongo and update state with the Mongo ID
    /*
    const newAlbumId = await postAlbum()
    const newAlbum = {
      ...formState,
      id: newAlbumId,
      favorite: false,
      coverImg: formState.images[0],
    }
    */

    // Add the new Album to the AlbumList state in Redux
    dispatch(addAlbum({...formState, coverImg: formState.images[0]}));
    // Remove the editAlbum flag to hide the editing screen
    dispatch(toggleAlbumEdit());
  }

  // Helper function to show a selected image and update the local form state
  const handleImage = (event: React.FormEvent<HTMLInputElement>) => {

    const imageId = event.currentTarget.id;
    console.log(`Target label div ID: ${imageId}Label`);
    const preview = document.querySelector(`#${imageId}Label`);

    // Remove the big plus icon from the label div
    while (preview?.firstChild) {
      preview.removeChild(preview.firstChild);
    }

    const currFiles = event.currentTarget.files;
    console.log('Files found: ', currFiles);

    // Check whether a list of images has been found
    if (currFiles && currFiles?.length > 0) {

      const imgFile = currFiles![0];
      // Show the image on screen in the selector box
      const image = document.createElement('img');
      image.classList.add("object-cover", "h-full", "w-full");
      image.src = URL.createObjectURL(imgFile);
      preview?.appendChild(image);

      // Update the state to include the new image URL
      setFormState({
        ...formState,
        images: [...formState.images, image.src]
      });
    } else {
      const errPara = document.createElement('p');
      errPara.textContent = 'No file found';
      preview?.appendChild(errPara);
    }
  }
  // return (
  //   <>
  //     <h1>Hello!</h1>
  //   </>
  // )
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
        <button 
          type="submit"
          form="imageForm"
          className="text-xl mr-3 px-8 py-2 rounded-md bg-customTeal font-semibold"
          onClick={handleSubmit}
        >
          Save
        </button>
      </nav>
      <form id="imageForm" className="w-full text-xl">
        <input className="w-full pl-4 py-2 border-t" type="text" name="title" value={formState.title} placeholder="Add album name..." onChange={handleChange}></input>
        <input className="w-full px-4 py-2 border-t" type="date" name="date" value={new Date(formState.date).toISOString().split('T')[0]} onChange={handleChange}></input>
        <input className="w-full pl-4 py-2 border-t" type="text" name="description" value={formState.description} placeholder="Add album description..." onChange={handleChange}></input>
      </form>
      <div className="h-full w-full px-4 pt-4 overflow-y-auto flex flex-col justify-start items-center bg-customGreen">
        <div className="w-full">
          <div className="grid grid-cols-2 gap-4">

            {/* Always show 6 boxes in the grid, either with plus signs or the existing images. */}
            {[0, 1, 2, 3, 4, 5].map((element, index) => (
              <div key={index}>
                <label
                  id={`image${index}Label`}
                  htmlFor={`image${index}`}
                  className="aspect-square flex items-center justify-center bg-white shadow-md"
                >
                  {/* The fallback value for activeAlbum is an empty object, so we have to check for any keys before trying to access the images */}
                  { Object.keys(screenState.activeAlbum).length > 0 && screenState.activeAlbum.images[index]
                    ? <img className="h-full w-full object-cover" src={screenState.activeAlbum.images[index]}></img> 
                    : <AddIcon style={{ fontSize: "3rem" }} /> 
                  }
                </label>
                <input
                  id={`image${index}`}
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
