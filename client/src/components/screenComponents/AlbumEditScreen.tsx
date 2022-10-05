import React, { ReactElement, useState } from "react";
import { AlbumType, ScreenState } from "../../customTypes";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { addAlbum, toggleAlbumEdit, setUploading, updateAlbum, updateActive } from "../actions";
import axios, { AxiosResponse } from 'axios';
import { toBase64 } from "../../utils/utils";
import { postAlbum } from "../../utils/api-client";
import ImagePickerSquare from "../imageComponents/ImagePickerSquare";

function AlbumEditScreen(): ReactElement {
  
  let initialState: AlbumType = {
    id: "",
    title: "",
    date: Date.now(),
    description: "",
    favorite: false,
    coverImg: "",
    sharedWith: [],
    images: [],
  };
  
 const screenState: ScreenState = useAppSelector(state => state.screenReducer);
 
  // Some local state management, to create an album with image links, and an actual list of image files.
  // If there is a populated active album (ie. we selected 'edit' from inside an album) then update the initial state with the album data.
  const [formState, setFormState] = useState((Object.keys(screenState.activeAlbum).length > 0) ? screenState.activeAlbum : initialState);
  const [imageList, setImageList] = useState([] as {file:File, index:number}[]);

  const dispatch = useAppDispatch();

  const validateForm = () => {
    return !formState.title || !formState.description || !(formState.images.length > 0);
  }

  // EVENT HANDLERS
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();

    // 1. Upload the files to get the image URLs for the Album
    // TODO: The app pauses while this runs, would be great to add a progress bar...
    const newAlbum: AlbumType = await uploadSelectedImages() ?? {} as AlbumType;
    newAlbum['coverImg'] = newAlbum.images[0];
    setFormState(newAlbum);
    
    // 2. Add this album to MongoDB so that we can get the MongoDB ID to complete the Album object
    // const newAlbum: AlbumType = { ...formState, coverImg: formState.images[0] };
    const albumID = await postAlbum(process.env.REACT_APP_USER, newAlbum);
    
    // 3. Add the new Album to the AlbumList state in Redux
    // Set the id for the album if it was just created in Mongo DB, otherwise we can update the album List and active album.
    if (!newAlbum.id) {
      newAlbum.id = String(albumID);
      dispatch(addAlbum(newAlbum));
    } else {
      dispatch(updateAlbum(newAlbum));
      dispatch(updateActive(newAlbum));
    }

    // Remove the editAlbum flag to hide the editing screen
    dispatch(toggleAlbumEdit());
  }

  // Simplifying the tutorial I reviewed massively: assume there is an internet connection and upload files.
  // TODO: For a fully functioning PWA we will need to store the files locally when offline.
  // TODO: Should the upload logic be in the backend?

  const uploadSelectedImages = async () => {
    // We create a copy of the state to change directly, so that we don't have to wait for setState before sending to the server.
    const stateCopy: AlbumType = Object.assign({}, formState);
    console.log('The state copy we\'re using is: ', stateCopy);
    let error = false;
    if (imageList.length > 0) {
      dispatch(setUploading(true));
      for (let i = 0; i < imageList.length; i++) {
          const { file, index } = imageList[i];
          // No need to upload the file if it is already on the server
          if (stateCopy.images.length <= index || stateCopy.images[index].substring(0,27) !== 'https://res.cloudinary.com') {
            // Convert image to base 64 string for uploading
            await toBase64(file)
            // Upload to Cloudinary
            .then(async (res) => await axios.post(
                `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
                {
                    file: res,
                    upload_preset: process.env.REACT_APP_UPLOAD_PRESET
                }
            )).then(
              (res) => {
                // Add the returned URL to the image list for this album.
                checkUploadStatus(res)
                stateCopy.images[index] = res.data.url;
              }
            ).catch((err) => {
                console.log('ERROR: ', err);
                error = true;
            })
          } else {
            console.log('File does not need to be uploaded, it\'s already on cloudinary.');
          }
      }
      if (!error) {
        alert("All images have been successfully uploaded to the cloud.");
      }
      dispatch(setUploading(false));
    }
    return stateCopy;
  }

  const checkUploadStatus = (response: AxiosResponse<any, any>) => {
      if (response.status !== 200) {
        alert('Sorry, we encountered an error uploading your images');
      }
  }

  // Helper function to show a selected image and update the local state
  const handleImage = (event: React.FormEvent<HTMLInputElement>) => {

    const imageId = event.currentTarget.id;
    const preview = document.querySelector(`#${imageId}Box`);

    // Remove the big plus icon from the label div
    while (preview?.firstChild) {
      preview.removeChild(preview.firstChild);
    }

    const currFiles = event.currentTarget.files;

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
      setImageList([
        ...imageList,
        { file: imgFile, index: Number(imageId.substring(5)) }
      ]);
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
          <h1 className="text-2xl">{ formState.id !== "" ? 'Edit' : 'New'} Album</h1>
        </div>
        <button
          type="submit"
          form="imageForm"
          className="text-xl mr-3 px-8 py-2 rounded-md bg-customTeal font-semibold"
          disabled={validateForm()}
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
            {[0, 1, 2, 3, 4, 5].map((_, index) => {
                return(
                  <ImagePickerSquare index={index} album={screenState.activeAlbum} callback={handleImage} />
                )}
              )
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default AlbumEditScreen;