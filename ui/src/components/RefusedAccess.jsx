import React from "react";
import NavBar from "./NavBar";
import { Link } from "react-router-dom";
import AuthService from "../services/AuthService";

function RefusedAccess(props) {

    console.log(props);

    const handleLogout = () => {
        AuthService.logout();
        window.location('/');
      };

    return (
        <>
            <NavBar/>
            <div className="flex flex-col justify-center items-center font-outfit pt-20 text-center">
                
                <h1 className="font-gowun sm:text-8xl text-6xl">Accès refusé</h1>
                <p className="sm:text-3xl text-xl mt-10">{props.message}</p>

                

                

                <p className="px-24 mt-10 text-lg text-justify">Si vous souhaitez vendre des articles que vous avez créé · e, vous devez vous inscrire en tant que vendeur·euse. Pour cela, allez sur la page d'inscription, 
                    remplissez les informations de la première page et cliquez sur "Je souhaite vendre mes créations", remplissez les informations et voilà, vous possédez maintenant un compte vendeur · euse sur cloth2you </p>

                    <Link className="hover:bg-zinc-600 bg-zinc-800 text-amber-50 p-2 px-3 sm:text-2xl text-lg rounded-xl mt-10" to="/inscription">S'inscrire en tant que vendeur · euse</Link>
            

                
                
            </div>
        </>
    );
}

export default RefusedAccess;