import React, { useState } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "./cropImage";

const Crop = ({ imageURL, newImageURL, setNewImageURL, setOpenCrop }) => {
  const zoomInit = 1;
  const cropInit = { x: 0, y: 0 };
  const aspect = 1 / 1;

  const [zoom, setZoom] = useState(zoomInit);
  const [crop, setCrop] = useState(cropInit);

  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropChange = (crop) => {
    setCrop(crop);
  };

  const onZoomChange = (zoom) => {
    setZoom(zoom);
  };

  const closeModal = () => {
    setOpenCrop(false);
  };

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const onCrop = async () => {
    const croppedImageURL = await getCroppedImg(imageURL, croppedAreaPixels);
    setNewImageURL(croppedImageURL);
    setOpenCrop(false);
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-sm">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">Crop</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={closeModal}
              >
                <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ✖
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto h-36">
              <Cropper
                image={imageURL}
                zoom={zoom}
                crop={crop}
                aspect={aspect}
                onCropChange={onCropChange}
                onZoomChange={onZoomChange}
                onCropComplete={onCropComplete}
              />
            </div>
            {/*footer*/}
            <div className="flex flex-col items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <label htmlFor="range">Zoom</label>
              <input
                type="range"
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onInput={(e) => {
                  onZoomChange(e.target.value);
                }}
              />
              <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={onCrop}
              >
                Save Changes
              </button>
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={closeModal}
              >
                Close
              </button>
              {/* <img src={newImageURL} alt="" srcset="" /> */}
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default Crop;
