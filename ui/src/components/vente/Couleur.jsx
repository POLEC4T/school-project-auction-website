import React from "react";
import { useState } from "react";

function Couleur(props) {
  const [message, setMessage] = useState("");

  const handleBlur = (e) => {
    let regex = new RegExp("^[a-zA-Z]+(,[a-zA-Z]+)*$");
    if (props.value.length === 0) {
      setMessage("La couleur est obligatoire");
    }
    else if(!regex.test(props.value)) { 
      setMessage("La couleur doit être au format suivant : couleur1,couleur2,couleur3");
    }
    else {
      setMessage("");
    }
  };
  
  return (
    <div className="couleur mt-8 w-5/6">
      <h2 className="font-gowun sm:text-2xl text-xl font-bold">Couleurs :</h2>
      <input
        onChange={props.onChange}
        onBlur={handleBlur}
        value={props.value}
        type="text"
        placeholder="exemple : rouge,bleu,jaune"
        className="placeholder-zinc-600 sm:h-12 h-10 w-full rounded-xl border-2 border-zinc-800 focus:outline-none pl-2 sm:text-xl text-md"
      />
      <div className="sm:text-lg text-xs flex flex-row items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="orange"
          className=" sm:h-6 h-16 mr-2 mt-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
          />
        </svg>
        si votre produit possède plusieurs couleurs, veillez à les entrer sous
        la forme suivante : couleur1,couleur2,couleur3
      </div>
      {message && (
        <p className="text-red-600 text-xs">{message}</p>
      )}
    </div>
  );
}

export default Couleur;