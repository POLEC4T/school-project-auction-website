import React from "react";
import NavBar from "./NavBar";
import { Link } from "react-router-dom";

function RefusedAccess(props) {
    return (
        <>
            <NavBar/>
            <div className="flex flex-col items-center font-outfit pt-20 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="red" class="w-24 h-24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                    </svg>
                <h1 className="font-gowun sm:text-8xl text-6xl">Accès refusé</h1>
                <p className="sm:text-3xl text-xl mt-10">{props.message}</p>
                <Link to="/" className="hover:bg-zinc-600 bg-zinc-800 text-amber-50 p-2 px-3 sm:text-2xl text-lg rounded-xl mt-10">Retourner à la page d'accueil</Link>
            </div>
        </>

    );
}

export default RefusedAccess;