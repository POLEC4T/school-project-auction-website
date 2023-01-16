import React from "react";
import { useState } from "react";

function Photos(props) {
    const [message, setMessage] = useState("");

    const onBlur = (e) => {
        if (props.value.length === 0) {
            setMessage("Vous devez ajouter au moins une photo");
        } else if (props.value.length > 4) {
            setMessage("Vous ne pouvez pas ajouter plus de 4 photos");
        }else {
            setMessage("");
        }
    };

    const handleUpload = (e) => {
        const chosenFiles = Array.prototype.slice.call(e.target.files);
        props.onChange(chosenFiles);
    }

  return (
    <div class="photos w-5/6 mt-10">
      <h2 class="font-gowun text-xl font-bold">Photos :</h2>

      <div class="photos-drop border-2 border-zinc-800 border-dashed p-4 rounded-xl ">
        <form class="flex items-center justify-between">
          <p class="w-1/3">Ajouter jusqu'à 4 photos :</p>
          <input
            onChange={handleUpload}
            value={props.value}
            onBlur={onBlur}
            class="file:bg-zinc-800 file:rounded-lg file:text-white file:border-zinc-800 file:font-outfit hover:file:bg-zinc-600 w-2/3 text-center ml-5"
            type="file"
            id="fileElem"
            multiple
            accept="image/*"
            onchange="fonctionHandleFile"
          />
        </form>
      </div>
        {message.length > 0 && (
            <div class="text-red-500 text-xs">{message}</div>
        )}
    </div>
  );
}

export default Photos;
