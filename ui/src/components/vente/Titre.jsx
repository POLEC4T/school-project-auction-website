import React from "react";
import { useState } from "react";

function Titre(props) {

  const [message, setMessage] = useState("");

  const handleBlur = (e) => {
    if(props.value.length === 0) {
      setMessage("Le titre est obligatoire");
    } else {
      setMessage("");
    }
  }

  return (
    <div class="titre mt-10 w-5/6">
      <h2 class="font-gowun text-xl font-bold">Titre :</h2>
      <input
        onChange={props.onChange}
        value={props.value}
        onBlur={handleBlur}
        type="text"
        placeholder="exemple : cardigan coloré"
        class="placeholder-zinc-600 h-8 w-full rounded-xl border-2 border-zinc-800  focus:outline-none pl-2"
      />
      {message.length > 0 && (
        <div class="text-red-500 text-xs">{message}</div>
      )}
    </div>
  );
}

export default Titre;
