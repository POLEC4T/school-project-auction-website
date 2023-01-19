import React from "react";

function Taille(props) {
  return (
    <div class="taille mt-8 w-5/6">
      <h2 class="font-gowun sm:text-2xl text-xl font-bold">Taille :</h2>

      <select
        onChange={props.onChange}
        value={props.value}
        name="taille"
        id=""
        class="rounded-xl px-2 sm:h-12 h-10 w-full bg-white border-2 border-zinc-800 sm:text-xl text-md"
      >
        <option selected value="select">
          Selectionner une taille
        </option>
        <option value="0-4">Jusqu'à 4 ans</option>
        <option value="5-9">5 à 9 ans</option>
        <option value="10-14">10 à 14 ans</option>
        <option value="XS">XS</option>
        <option value="S">S</option>
        <option value="M">M</option>
        <option value="L">L</option>
        <option value="XL">XL</option>
        <option value="XXL">XXL</option>
      </select>
    </div>
  );
}

export default Taille;
