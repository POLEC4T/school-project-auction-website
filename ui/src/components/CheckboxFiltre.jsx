import React from "react";



function CheckboxFiltre({ name, value , onChange }) {
  return (
    <label className="flex flex-row items-center cursor-pointer">
      <input type="checkbox" className="cursor-pointer" name={name} value={value} onChange={onChange} className="h-4 w-4 accent-zinc-800" />
      <span className="select-none font-outfit ml-1">{value}</span>
    </label>
  );
}

export default CheckboxFiltre;