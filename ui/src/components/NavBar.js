import React from 'react';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AuthService from '../services/AuthService';

function NavBar() {

    const logoCloth2you = require('../static/images/logo.png');

    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            setIsConnected(true);
        }else{
            setIsConnected(false);
        }
    }, []);

    const handleLogout = () => {
        AuthService.logout();
        setIsConnected(false);
    };

    return (
        <div>
            <nav className="h-14 bg-zinc-800 w-full flex justify-around items-center font-outfit gap-2">

                < NavLink style={{ backgroundColor: "rgb(39, 39, 42)" }} to="/" className="logo flex h-full items-center active:bg-non">
                    <img src={logoCloth2you} alt="logo" className="h-1/2 mx-1 mr-3"/>
                    <h2 className="font-gowun text-2xl text-white sm:block hidden">cloth2you</h2>
                </NavLink>

                < NavLink to="/profil" className="text-amber-50 hover:text-amber-100 lg:block hidden">Profil</NavLink>
                < NavLink to="/vendre" className="text-amber-50 hover:text-amber-100 lg:block hidden">Vendre</NavLink>

                <div className="recherche bg-amber-50 w-1/2 h-1/2 rounded-xl flex items-center ease-in duration-100 sm:max-w-48">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mx-1">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>

                    <form action="recherche.html" className="w-full">
                        <input type="text" placeholder="Rechercher" className="w-full rounded-xl bg-amber-50 focus:outline-none placeholder-zinc-800"/>
                    </form>
                </div>

                {isConnected ? (
                        <div className="connexion-inscription w-48 flex">
                        < button onClick={handleLogout} className="text-black bg-amber-50 rounded-md w-full text-center">Déconnexion</button>
                        </div>
                        ) : (
                        <div className="connexion-inscription w-48 flex mr-2">
                        < NavLink to="/connexion" className="text-amber-50 rounded-l-md w-1/2 text-center sm:text-lg text-sm">Connexion</NavLink>
                        < NavLink to="/inscription" className="text-black bg-amber-50 rounded-r-md w-1/2 text-center sm:text-lg text-sm">Inscription</NavLink>
                        </div>
                    )  }

            </nav>  

            <div className="categories w-full flex justify-around font-outfit">
                < NavLink to="/article?cat=hauts" className="bg-amber-50 w-1/3 text-center ease-in-out duration-300 hover:bg-amber-100">Hauts</NavLink>
                < NavLink to="/article?cat=bas" className="bg-amber-50 w-1/3 text-center ease-in-out duration-300 hover:bg-amber-100">Bas</NavLink>
                < NavLink to="/article?cat=autres" className="bg-amber-50 w-1/3 text-center ease-in-out duration-300 hover:bg-amber-100">Autres</NavLink>
            </div>
        </div>
    );
}

export default NavBar;