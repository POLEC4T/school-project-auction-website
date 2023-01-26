import React from "react";
import { useState } from "react";

function Description(props) {
    const [message, setMessage] = useState("");

    const handleBlur = (e) => {
        if(props.value.length === 0) {
            setMessage("La description est obligatoire");
        } else if(props.value.length > 255) {
            setMessage("La description ne doit pas dépasser 255 caractères");
        }
        else {
            setMessage("");
        }
    }

  return (
    <div className="description mt-10 w-5/6">
      <span className="font-gowun text-2xl font-bold flex text-center items-center">
        Description<p className="sm:text-sm text-xs mx-1">(max. 255 caractères)</p>:
      </span>
      <textarea
        onChange={props.onChange}
        onBlur={handleBlur}
        value={props.value}
        name="description"
        id=""
        cols="30"
        rows="4"
        maxlength="255"
        placeholder="exemple : Ce petit cardigan coloré a été fait en laine de mouton, qui se trouve dans un petit paturage dans la Creuse, elle a été teintée grâce à des colorants naturels. Cette laine particulière s'appelle la laine mérinos, et provient de moutons qui sont très mignons."
        className="placeholder-zinc-600 w-full rounded-xl border-2 border-zinc-800 focus:outline-none p-2 text-lg"
      ></textarea>
        {message.length > 0 && (
            <div className="text-red-500 text-sm">{message}</div>
        )}
    </div>
  );
}

export default Description;
