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
    <div class="categorie sm:mt-8 mt-12 w-5/6">
      <h2 class="font-gowun text-xl font-bold">Catégorie :</h2>

      <select
        onBlur={handleBlur}
        onChange={props.onChange}
        value={props.value}
        name="catégorie"
        id=""
        class="rounded-xl px-2 h-8 w-full bg-white border-2 border-zinc-800"
      >
        <option selected value="select">
          Selectionner une catégorie
        </option>
        <option value="pull">Pull</option>
        <option value="t-shirt">T-shirt</option>
      </select>
        {message.length > 0 && (
            <div class="text-red-500 text-xs">{message}</div>
        )}
    </div>
  );
}

export default Categorie;
