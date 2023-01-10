import React from 'react';
import { NavLink } from 'react-router-dom';

function NavBar() {

    const iconeLoupe = require('../static/images/loupe.png');
    const logoCloth2youInverse = require('../static/images/logo-cloth2you-inverse.png');

    return (
        <div>
            <nav className="h-14 bg-black w-full flex justify-around items-center font-outfit">

                < NavLink to="/" className="logo flex h-full items-center">
                    <img src={logoCloth2youInverse} alt="logo" className="h-1/2"/>
                    <h2 className="font-gowun text-2xl text-white sm:block hidden">cloth2you</h2>
                </NavLink>

                < NavLink to="/profil" className="text-white hover:text-zinc-400 lg:block hidden">Profil</NavLink>
                < NavLink to="/vendre" className="text-white hover:text-zinc-400 lg:block hidden">Vendre</NavLink>

                <div className="recherche bg-zinc-100 w-1/2 h-1/2 rounded-xl flex items-center ease-in duration-100 sm:max-w-48">
                    <img src={iconeLoupe} alt="loupe" className="h-3/4 px-2"/>
                    <form action="recherche.html" className="w-full">
                        <input type="text" placeholder="Recherche..." className="w-full rounded-xl focus:outline-none"/>
                    </form>
                </div>

                <div className="connexion-inscription w-48 flex">
                    < NavLink to="/connexion" className="text-white rounded-l-md w-1/2 text-center">Connexion</NavLink>
                    < NavLink to="/inscription" className="text-black bg-white rounded-r-md w-1/2 text-center">Inscription</NavLink>
                </div>
            </nav>  

            <div className="categories w-full flex justify-around font-outfit">
                < NavLink to="/article?cat=hauts" className="bg-zinc-300 w-1/3 text-center ease-in duration-100 hover:bg-zinc-400 ">Hauts</NavLink>
                < NavLink to="/article?cat=bas" className="bg-zinc-300 w-1/3 text-center ease-in duration-100 hover:bg-zinc-400">Bas</NavLink>
                < NavLink to="/article?cat=autres" className="bg-zinc-300 w-1/3 text-center ease-in duration-100 hover:bg-zinc-400">Autres</NavLink>
            </div>
        </div>
    );
}

export default NavBar;