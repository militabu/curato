import React, { ReactElement, useEffect, useState } from "react";
import { AlbumType, ScreenState } from "../../customTypes";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { addAlbum, toggleAlbumEdit, setUploading } from "../../redux/actions";
import axios, { AxiosResponse } from 'axios';
import { toBase64 } from "../../utils/utils";
import { postAlbum } from "../../utils/api-client";

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
  const [imageList, setImageList] = useState([] as File[]);

  const dispatch = useAppDispatch();

  useEffect(() => console.log('Album date is: ', screenState.activeAlbum.date), []);
  useEffect(() => console.log('Initial date is: ', initialState.date), []);
  
  const validateForm = () => {
    return !formState.title || !formState.description || !(formState.images.length > 0);
  }

  // EVENT HANDLERS
  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLElement>) => {
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

    // 1. Upload the files to get the image URLs for the Album
    // uploadSelectedImages();

    // 2. Add this album to MongoDB so that we can get the MongoDB ID to complete the Album object
    const newAlbum: AlbumType = { ...formState, coverImg: formState.images[0] };
    console.log('Trying to post the following album to the server: ', formState);
    console.log('ENV var for the username: ', process.env.REACT_APP_USER);
    const albumID = await postAlbum(process.env.REACT_APP_USER, newAlbum);
    console.log(`The ID for the ${formState.id ? 'updated' : 'new'} album is : `, albumID);
   
    // 3. Add the new Album to the AlbumList state in Redux
    // Set the id for the album if it was just created in Mongo DB
    if (!newAlbum.id) newAlbum.id = String(albumID);
    dispatch(addAlbum(newAlbum));

    // Remove the editAlbum flag to hide the editing screen
    dispatch(toggleAlbumEdit());
  }

  // Simplifying the tutorial I reviewed massively: assume there is an internet connection and upload files.
  // TODO: For a fully functioning PWA we will need to store the files locally when offline.

  const uploadSelectedImages = () => {
    if (imageList.length > 0) {
      dispatch(setUploading(true));
      for (let i = 0; i < imageList.length; i++) {
          console.log('Trying to upload image: ', imageList[i]);
          // Convert image to base 64 string for uploading
          toBase64(imageList[i])
          // Upload to Cloudinary
          .then((res) => axios.post(
              `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
              {
                  file: res,
                  upload_preset: process.env.REACT_APP_UPLOAD_PRESET
              }
          )).then(
            (res) => {
              // Confirm the upload, then add the returned URL to the image list for this album.
              checkUploadStatus(res)
              setFormState({
                ...formState,
                images: [
                  ...formState.images,
                  res.data.url
                ]
              })              
            }
          ).catch((err) => {
              console.log('ERROR: ', err);
          })
      }
      dispatch(setUploading(false));
    }
  }

  const checkUploadStatus = (response: AxiosResponse<any, any>) => {
      dispatch(setUploading(false));
      if (response.status === 200) {
          alert('Images Uploaded to Cloudinary Media Library');
      } else {
          alert('Sorry, we encountered an error uploading your images');
      }
  }

  // Helper function to show a selected image and update the local state
  const handleImage = (event: React.FormEvent<HTMLInputElement>) => {

    const imageId = event.currentTarget.id;
    console.log(`Target label div ID: ${imageId}Box`);
    const preview = document.querySelector(`#${imageId}Box`);

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
      setImageList([
        ...imageList,
        imgFile
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
            {[0, 1, 2, 3, 4, 5].map((element, index) => {
                return(
                  <div key={index}>
                    <label
                      id={`image${index}Box`}
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
                )
              }
            )
          }
          </div>
        </div>
      </div>
    </>
  );
}

export default AlbumEditScreen;
