import React from "react";
import { useState } from "react";

function Materiaux(props) {
    const [message, setMessage] = useState("");

    const handleBlur = (e) => {
        //regex pour vérifier que les materiaux sont écrits au bon format
        let regex = new RegExp("^([a-zA-Z]+(?:,[a-zA-Z]+)*)$");
        if(props.value.length === 0) {
            setMessage("Le matériaux est obligatoire");
        }
        else if(!regex.test(props.value)) {
            setMessage("Merci d'entrer les matériaux sous la forme suivante : materiau1,materiau2,materiau3");
        }
        else {
            setMessage("");
        }
    }

  return (
    <div class="materiaux sm:mt-8 mt-12 w-5/6">
      <h2 class="font-gowun text-xl font-bold">Matériaux :</h2>

      <input
        onBlur={handleBlur}
        onChange={props.onChange}
        value={props.value}
        type="text"
        placeholder="exemple : laine,coton,lin"
        class="placeholder-zinc-600 h-8 w-full rounded-xl border-2 border-zinc-800 focus:outline-none pl-2"
      />
      <div class="sm:text-xs text-xs flex flex-row items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="orange"
          class="sm:h-6 h-16 mr-2 mt-1"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
          />
        </svg>
        si votre produit possède plusieurs matériaux, veillez à les entrer sous
        la forme suivante : materiau1,materiau2,materiau3
      </div>
        {message.length > 0 && (
            <div class="text-red-500 text-xs">{message}</div>
        )}
    </div>
  );
}

export default Materiaux;
