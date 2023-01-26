import React from "react";
import { useState } from "react";

function Categorie(props) {

    const [message, setMessage] = useState("");

    const handleBlur = (e) => {

        if(props.value === "select") {
            setMessage("La catégorie est obligatoire");
        } 
        else {
            setMessage("");
        }
    }

  return (
    <div className="categorie sm:mt-8 mt-6 w-5/6">
      <h2 className="font-gowun sm:text-2xl text-xl font-bold">Catégorie :</h2>

      <select
        onBlur={handleBlur}
        onChange={props.onChange}
        value={props.value}
        name="catégorie"
        id=""
        className="rounded-xl px-2 sm:h-12 h-10 w-full bg-white border-2 border-zinc-800 sm:text-xl text-md"
      >
        <option selected value="select">
          Selectionner une catégorie
        </option>
        <option value="haut">Haut</option>
        <option value="bas">Bas</option>
        <option value="autres">Autres</option>
      </select>
        {message.length > 0 && (
            <div className="text-red-500 text-xs">{message}</div>
        )}
    </div>
  );
}

export default Categorie;
