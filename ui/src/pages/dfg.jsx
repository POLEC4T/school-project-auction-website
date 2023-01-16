import React from "react";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import AuthService from "../services/AuthService";

function NavBar() {
  const logoCloth2you = require("../static/images/logo.png");
  const imageProfil = require("../static/images/pfp-image-example.jpeg");

  const [isConnected, setIsConnected] = useState(false);
  const [burgerShow, setBurgerShow] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setIsConnected(true);
      setUser(user);
    } else {
      setIsConnected(false);
    }
  }, []);

  const handleLogout = () => {
    AuthService.logout();
    setIsConnected(false);
  };

  /* GESTION DU MENU BURGER */

  const handleBurger = (e) => {
    if (burgerShow) {
      setBurgerShow(false);
    } else {
      setBurgerShow(true);
    }
  };

  /* GESTION DE LA RECHERCHE */

  return (
    <div>
      <nav className="h-16 bg-zinc-800 w-full flex justify-around items-center font-outfit gap-2">
        <NavLink
          style={{ backgroundColor: "rgb(39, 39, 42)" }}
          to="/"
          className="logo flex h-full items-center active:bg-non"
        >
          <img src={logoCloth2you} alt="logo" className="h-1/2 mx-1 mr-3" />
          <h2 className="font-gowun text-2xl text-white sm:block hidden">
            cloth2you
          </h2>
        </NavLink>

        <NavLink
          style={{ backgroundColor: "rgb(39, 39, 42)" }}
          to="/profil"
          className="text-amber-50 hover:text-amber-100 lg:block hidden"
        >
          Profil
        </NavLink>
        <NavLink
          style={{ backgroundColor: "rgb(39, 39, 42)" }}
          to="/vendre"
          className="text-amber-50 hover:text-amber-100 lg:block hidden"
        >
          Vendre
        </NavLink>

        <div className="recherche bg-amber-50 w-1/2 h-1/2 rounded-xl flex items-center ease-in duration-100 sm:max-w-48">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 mx-1"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>

          <form action="recherche.html" className="w-full">
            <input
              type="text"
              placeholder="Rechercher"
              className="w-full rounded-r-xl bg-amber-50 focus:outline-none placeholder-zinc-800"
            />
          </form>
        </div>

        {isConnected && user ? (
          <>
            <div className="connexion-inscription w-24 items-center gap-2 mr-4 sm:flex hidden">
              <img
                src={imageProfil}
                alt="photo de profil"
                className="h-1/3 w-1/3 rounded-full"
              />
              <p className="text-amber-50">{user.login}</p>
            </div>

            <button className="burger ml-10" onClick={handleBurger}>

                {burgerShow ? (

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="white"
                    className="h-12 w-12"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>

                ) : (

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="white"
                    className="w-12 h-12"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>

                )}
              
            </button>

    
            
            

            {burgerShow ? (


              <div className="burger-menu bg-zinc-800 w-1/4 mt-16 z-50 h-auto fixed top-0 right-0 bottom-0">
                <div className="burger-menu-content flex flex-col justify-center items-center">
                  <button className="mt-2 sm:hidden block" onClick={handleBurger}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="white"
                      className="w-12 h-12"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                  <div className="text-white text-center my-5">
                    <h3>Welcome to burger menu</h3>
                  </div>
                  <div className="button-container">
                    <button className="bg-amber-50 rounded-md w-full sm:text-lg text-sm text-center">
                    Option 1
                    </button>
                    <button className="bg-amber-50 rounded-md w-full sm:text-lg text-sm text-center">
                    Option 2
                    </button>
                    <button className="bg-amber-50 rounded-md w-full sm:text-lg text-sm text-center">
                    Option 3
                    </button>
                    </div>
                    </div>
                ) : ()
                    }
                    </>
            ) : (
            <div className="connexion-inscription w-48 flex mr-2">
                <NavLink
                to="/login"
                className="text-amber-50 rounded-l-md w-1/2 text-center sm:text-lg text-sm"
                >
                Connexion
                </NavLink>
                <NavLink
                to="/register"
                className="text-black bg-amber-50 rounded-r-md w-1/2 text-center sm:text-lg text-sm"
                >
                Inscription
                </NavLink>
            </div>
        )}

      </nav>

      </>

      <div className="categories w-full flex justify-around font-outfit">
        <NavLink
          to="/articles?category=tops"
          className="bg-amber-50 w-1/3 text-center ease-in-out duration-300 hover:bg-amber-100"
        >
          Hauts
        </NavLink>
        <NavLink
          to="/articles?category=bottoms"
          className="bg-amber-50 w-1/3 text-center ease-in-out duration-300 hover:bg-amber-100"
        >
          Bas
        </NavLink>
        <NavLink
          to="/articles?category=others"
          className="bg-amber-50 w-1/3 text-center ease-in-out duration-300 hover:bg-amber-100"
        >
          Autres
        </NavLink>
      </div>
    </div>

  );
}

export default NavBar;
