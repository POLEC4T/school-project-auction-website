import React from "react";

function CheckboxFiltre({ name, value , onChange }) {
  return (
    <label class="  inline-flex items-center ml-4 cursor-pointer ">
      <input type="checkbox" class="cursor-pointer" name={name} value={value} onChange={onChange} />
      <span class="select-none font-outfit ml-2">{value}</span>
    </label>
  );
}

export default CheckboxFiltre;