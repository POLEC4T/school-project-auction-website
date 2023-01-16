import React from "react";

import { useState, useEffect } from "react";

function Page1(){
    return (
        <>
        <h2 class="font-gowun sm:text-4xl text-2xl">Mise aux enchères (1/3)</h2>

        <div class="photos w-5/6 mt-10">

            <h2 class="font-gowun text-xl font-bold">Photos :</h2>

            <div class="photos-drop border-2 border-zinc-800 border-dashed p-4 rounded-xl ">
                <form class="flex items-center justify-between">
                    <p class="w-1/3">Ajouter jusqu'à 4 photos :</p>
                    <input class="file:bg-zinc-800 file:rounded-lg file:text-white file:border-zinc-800 file:font-outfit hover:file:bg-zinc-600 w-2/3 text-center ml-5" type="file" id="fileElem" multiple accept="image/*" onchange="fonctionHandleFile"/>
                </form>
            </div>
        </div>


        <div class="titre mt-10 w-5/6">
            <h2 class="font-gowun text-xl font-bold">Titre :</h2>
            <input type="text" placeholder="exemple : cardigan coloré" class="placeholder-zinc-600 h-8 w-full rounded-xl border-2 border-zinc-800  focus:outline-none pl-2"/> 

        </div>

        <div class="description mt-10 w-5/6">
            <span class="font-gowun text-xl font-bold flex items-center">Description<p class="sm:text-sm text-xs mx-1">(max. 255 caractères)</p>:</span>
            <textarea name="description" id="" cols="30" rows="4" maxlength="255" placeholder="exemple : Ce petit cardigan coloré a été fait en laine de mouton, qui se trouve dans un petit paturage dans la Creuse, elle a été teintée grâce à des colorants naturels. Cette laine particulière s'appelle la laine mérinos, et provient de moutons qui sont très mignons." class="placeholder-zinc-600 w-full rounded-xl border-2 border-zinc-800 focus:outline-none p-2"></textarea>
        </div>
        </>
    )
}

export default Page1;