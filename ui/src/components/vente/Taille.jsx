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
        <option value="0-4">Jusqu'à 4 ans</option>
        <option value="5-9">5 à 9 ans</option>
        <option value="10-14">10 à 14 ans</option>
        <option value="xs">XS</option>
        <option value="s">S</option>
        <option value="m">M</option>
        <option value="l">L</option>
        <option value="xl">XL</option>
        <option value="xxl">XXL</option>
      </select>
    </div>
  );
}

export default Taille;
