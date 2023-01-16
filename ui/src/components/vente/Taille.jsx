import React from "react";

function Taille(props) {
  return (
    <div class="taille sm:mt-8 mt-12 w-5/6">
      <h2 class="font-gowun text-xl font-bold">Taille :</h2>

      <select
        onChange={props.onChange}
        value={props.value}
        name="taille"
        id=""
        class="rounded-xl px-2 h-8 w-full bg-white border-2 border-zinc-800"
      >
        <option selected value="select">
          Selectionner une taille
        </option>
        <option value="taille 1">S</option>
        <option value="taille 2">M</option>
      </select>
    </div>
  );
}

export default Taille;
