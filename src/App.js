import React, { useState } from "react";
import Logo from "./res/Images/Logo.png";
import Template from "./res/Images/Template.png";
import Crop from "./components/Crop";
import downloadjs from "downloadjs";
import html2canvas from "html2canvas";

const App = () => {
  const [name, setName] = useState(null);
  const [imageURL, setImageURL] = useState("");
  const [newImageURL, setNewImageURL] = useState("");
  const [openCrop, setOpenCrop] = useState(false);

  const handleOnNameChange = (e) => {
    setName(e.target.value);
    console.log(name);
  };

  const handleOnImageChange = (e) => {
    const { files } = e.target;
    if (files.length > 0) {
      const url = URL.createObjectURL(files[0]);
      setImageURL(url);
      setOpenCrop(true);
    } else {
      setImageURL(null);
    }
    console.log(imageURL);
  };

  const handleCaptureClick = async () => {
    const canvas = await html2canvas(document.getElementById("download"), {
      scale: 2,
      dpi: 144,
    });
    const dataURL = canvas.toDataURL("image/png");

    downloadjs(dataURL, "download.png", "image/png");
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full min-h-screen">
        <div className="p-6 max-w-sm rounded-lg bg-gradient-to-tl from-purple-400 to-yellow-400 border-red-600 border-b-2 shadow-lg dark:bg-gray-800 dark:border-gray-700">
          <img src={Logo} alt="Logo" width={70} />
          <h5 className="mb-2 text-2xl font-serif font-semibold tracking text-gray-900">
            Birthday Card Generator
          </h5>

          <p className="mb-3 font-semibold text-stone-700">
            Generate Birthday Cards From here.
          </p>

          <div className="mt-3 flex flex-col">
            <form>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 mb-6 w-full group">
                  <input
                    type="text"
                    name="floating_first_name"
                    id="floating_first_name"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-stone-700 appearance-none focus:outline-none focus:ring-0 focus:border-stone-700 peer"
                    placeholder=" "
                    required
                    onChange={handleOnNameChange}
                  />
                  <label
                    htmlFor="floating_first_name"
                    className="peer-focus:font-medium absolute text-sm text-stone-700  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-stone-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Name
                  </label>
                </div>
              </div>

              <div className="mb-3 w-full">
                <label
                  className="text-black items-center bg-white hover:bg-pink-300 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  htmlFor="file_input"
                >
                  Upload Image
                </label>
                <input
                  className="hidden"
                  id="file_input"
                  type="file"
                  accept="image/*"
                  onChange={handleOnImageChange}
                />
              </div>
            </form>
            <button
              className="mt-2 bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded-xl shadow hover:shadow-lg outline-none "
              onClick={handleCaptureClick}
            >
              Generate
            </button>
          </div>
        </div>
        {openCrop ? (
          <Crop {...{ imageURL, newImageURL, setNewImageURL, setOpenCrop }} />
        ) : null}

        <div className="mt-3 p-2 max-w-sm" id="download">
          <div className="relative">
            <img
              className="abosulte object-cover w-full"
              src={Template}
              alt="Template"
            />
            <div className="flex flex-col justify-center items-center absolute top-14 left-4">
              <img
                className="h-24 rounded-full"
                src={newImageURL}
                alt="Profile"
              />
              <p className="-mt-7 font-baloo font-extrabold text-lg text-purple-700 text-shadow py-0.5 px-1 rounded-lg">
                {/* अविनाश विचारे */}
                {name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
