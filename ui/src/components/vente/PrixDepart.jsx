import React from "react";
import { useState } from "react";

function PrixDepart(props) {
    const [message, setMessage] = useState("");

    const handleBlur = (e) => {
      let regex = new RegExp("^[0-9]+(\.?[0-9]+)?€?$");
        if (props.value.length === 0) {
            setMessage("Le prix de départ est obligatoire");
        } else if (!regex.test(props.value)) {
        setMessage("Le prix de départ doit être un nombre positif, avec ou sans le signe € à la fin");
        }
        else {
            setMessage("");
        }
    };

  return (
    <div class="prix mt-12 w-5/6">
      <h2 class="font-gowun text-xl font-bold">Prix de départ :</h2>
      <input
        onChange={props.onChange}
        onBlur={handleBlur}
        value={props.value}
        type="text"
        placeholder="exemple : 30€"
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
        veillez à bien estimer votre produit, un prix de départ trop élevé peut
        parfois rendre le début de l'enchère compliqué
      </div>
      {message && (
        <p class="text-red-600 text-xs">{message}</p>)}
    </div>
  );
}

export default PrixDepart;
