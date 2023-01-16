import React, { useEffect } from "react";
import { useState } from "react";

function PrixReserve(props) {
  const [message, setMessage] = useState("");
  const [prix_reserve, setPrix_reserve] = useState(false);

  const handleCheckbox = (e) => {
    setPrix_reserve(!prix_reserve);
  };

  const onBlur = (e) => {
    let regex = new RegExp("^[0-9]+(\.?[0-9]+)?€?$");
     if (!regex.test(props.value)) {
      setMessage("Le prix de réserve doit être un nombre positif, avec ou sans le signe € à la fin");
      }
      else {
          setMessage("");
      }
  };


  return (
    <>
      <div class="choix_reserve w-5/6 mt-8 flex items-center">
        <input
          type="checkbox"
          class="mr-2 accent-zinc-800"
          onChange={handleCheckbox}
        />
        Je souhaite fixer un prix de réserve
      </div>

        {prix_reserve && (
            <div class="prix_reserve sm:mt-8 mt-12 w-5/6">
                <h2 class="font-gowun text-xl font-bold">Prix de réserve :</h2>

                <input
                    onChange={props.onChange}
                    onBlur={onBlur}
                    value={props.value}
                type="text"
                placeholder="exemple : 60€"
                class="placeholder-zinc-600 h-8 w-full rounded-xl border-2 border-zinc-800 focus:outline-none pl-2"
                />
                <div class="sm:text-xs text-xs flex flex-row items-center mt-1">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="sm:h-6 h-16 mr-2"
                >
                    <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                    />
                </svg>
                Ce prix de réserve est un prix secret des utilisateurs, en dessous
                duquel le bien ne sera pas vendu, c'est en quelque sorte une
                assurance, si les enchères ne décollent pas
                </div>
                {message && (
                <p class="text-red-600 text-xs">{message}</p>)}
            </div>
        )}
    </>
  );
}

export default PrixReserve;
