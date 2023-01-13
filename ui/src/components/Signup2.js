import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Signup2(props){

    return(
        <div class="haut flex flex-col items-center pt-5 px-5">

        <h2 class="opacity-100 font-gowun text-4xl" >Inscription</h2>

        <div class="ligne w-full flex flex-row overflow-hidden mt-8">
            <img class="w-1/4" src="ligne-1.png" alt=""/>
            <img class="w-1/4" src="ligne-2.png" alt=""/>
            <img class="w-1/4" src="ligne-1.png" alt=""/>    
            <img class="w-1/4" src="ligne-1.png" alt=""/>    
        </div>

        <p class="text-sm text-center mt-8">
            En vous inscrivant en tant que vendeur·euse sur cloth2you, vous devez avoir un statut entrepreneurial, <a href="" class="underline">en savoir plus</a>.
        </p>

        <input type="text" placeholder="nom" class="placeholder-zinc-600 mt-8 h-8 w-full rounded-xl border-2 border-zinc-800  focus:outline-none pl-2"/> 
        <input type="text" placeholder="prénom" class="placeholder-zinc-600 mt-4 h-8 w-full rounded-xl border-2 border-zinc-800  focus:outline-none pl-2"/> 
        <input type="text" placeholder="numéro SIREN" class="placeholder-zinc-600 mt-4 h-8 w-full rounded-xl border-2 border-zinc-800  focus:outline-none pl-2"/> 
        
        <div class="cgu flex flex-row gap-2 mt-8">
            <input type="checkbox" name="cgu" id="cgu" class="accent-zinc-800"/>
            <p class="text-justify text-xs" disabled>
                En cochant cette case, vous acceptez les termes et conditions de cloth2you, les <Link to="/cgu" class="underline">conditions générales d'utilisation</Link>  et la <Link href="" class="underline">politique de confidentialité</Link> et avoir au moins 18 ans.
            </p>
        </div>

        <div class="choix w-full flex flex-row justify-around mt-5">
            <button class="bg-zinc-800 text-amber-50 px-3 py-1 rounded-lg mt-5 text-md hover:bg-zinc-600">S'inscrire en tant que vendeur · euse</button>
        </div>
    </div> 
    )
}

export default Signup2;