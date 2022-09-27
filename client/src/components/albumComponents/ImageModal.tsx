import React, { ReactElement } from "react";
import '../screenComponents/AlbumViewScreen.css';

type ModalProps = {
  imgSrc: string;
  callback: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

function Modal({imgSrc, callback}: ModalProps) : ReactElement {

  return (
    <div className="modal z-50">
      <div className="overlay" onClick={callback}>
        <div className="py-6 absolute top-1/4">
          <button className="bg-customTeal rounded-md px-4 py-1 my-2 float-right" onClick={callback}>
            CLOSE
          </button>
          <img src={imgSrc} alt='Modal popup image'/>
        </div>
      </div>
    </div>
  )
}

export default Modal;

{/* <div className="modal">
<div className="overlay" onClick={callback}>
  <div className="modal-content">
    <img src={imgSrc} alt='Modal popup image'/>
    <button className="close-modal" onClick={callback}>
      CLOSE
    </button>
  </div>
</div>
</div> */}