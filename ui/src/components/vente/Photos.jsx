import React from "react";
import { useState } from "react";
import { useEffect } from "react";

function Photos(props) {
  
    const [message, setMessage] = useState("");
    const [images, setImages] = useState("");
    

    const onBlur = (e) => {
        if (props.images.length === 0) {
            setMessage("Vous devez ajouter au moins une photo");
        } else if (props.images.length === 4) {
            setMessage("Vous ne pouvez pas ajouter plus de 4 photos");
        }else {
            setMessage("");
        }
    };

    useEffect(() => {
      setImages(props.value);
    }, [props.value])
    

//TODO : Afficher les previews des images
  return (
    <div className="photos w-5/6 mt-10">
      <h2 className="font-gowun text-2xl font-bold">Photos :</h2>

      <div className="photos-drop border-2 border-zinc-800 border-dashed p-4 rounded-xl ">
        <form className="flex sm:flex-row flex-col justify-center items-center justify-between sm:text-xl text-lg">
          <p className="sm:w-1/3 w-full text-center">Ajouter jusqu'à 4 photos :</p>
          <input
            onChange={props.onChange}
            onBlur={onBlur}
            className="file:bg-zinc-800 file:rounded-lg file:text-white file:border-zinc-800 file:font-outfit hover:file:bg-zinc-600 w-2/3 sm:mt-0 mt-2 text-center sm:ml-5 ml-0"
            type="file"
            id="fileElem"
            multiple
            accept="image/*"
            onchange="fonctionHandleFile"
          />
          <p className="sm:w-1/3 w-full text-right"></p>
        </form>
      </div>
        {message.length > 0 && (
            <div className="text-red-500 text-sm">{message}</div>
        )}
    </div>
  );
}

export default Photos;
