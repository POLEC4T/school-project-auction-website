import React from "react";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import AuthService from "../services/AuthService";
import { Link } from "react-router-dom";
import { getUserById } from "../services/UserService";

function NavBar() {
  const logoCloth2you = require("../static/images/logo.png");
  const imageProfil = require("../static/images/pfp-image-example.jpeg");

  const [isConnected, setIsConnected] = useState(false);
  const [burgerShow, setBurgerShow] = useState(false);
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [avatar, setAvatar] = useState(
    require("../static/images/default-avatar.png")
  );

  useEffect(() => {
    if (user) {
      getUserById(user.id)
        .then((response) => {
          setUserData(response);
          if (response.pdp !== null)
            setAvatar(require(`${response.pdp}`));
          
        })
        .catch((error) => console.log(error));
    }
  }, [user]);

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
                src={avatar}
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
                  stroke-width="1.5"
                  stroke="white"
                  class="w-12 h-12"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="white"
                  class="h-12 w-12"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              )}
            </button>

            {burgerShow && (
              <div className="burger-menu bg-zinc-800 w-full md:w-1/2 lg:w-1/4 mt-16 z-50 absolute top-0 right-0 rounded-b-sm">
                <div className="burger-menu-content flex flex-col justify-center items-center">
                  <div className="text-white text-center my-5 text-lg ">
                    <span className="credits flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="white"
                        class="w-6 h-6 mr-2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                        />
                      </svg>
                      Solde : {userData.solde}€
                      <Link
                        to="/paiement"
                        className="ajout_solde bg-amber-50 hover:bg-amber-100 text-zinc-800 rounded ml-2 px-2"
                      >
                        Ajouter des crédits
                      </Link>
                    </span>

                    <div className="sep h-px w-full bg-amber-50 my-4"></div>

                    <span className="favoris flex items-center mx-auto">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="white"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="white"
                        class="w-6 h-6 mr-2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                        />
                      </svg>
                      Favoris
                    </span>

                    <div className="sep h-px w-full bg-amber-50 my-4"></div>

                    <span className="historique flex items-center mx-auto">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6 mr-2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75"
                        />
                      </svg>
                      Historique des commandes
                    </span>

                    <div className="sep h-px w-full bg-amber-50 my-4"></div>

                    <span className="historique flex items-center mx-auto">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6 mr-2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                        />
                      </svg>
                      Guide d'achat
                    </span>

                    <div className="sep h-px w-full bg-amber-50 my-4"></div>

                    <button
                      onClick={handleLogout}
                      className="ajout_solde border-2 border-amber-50 text-white hover:bg-amber-50 hover:text-zinc-800 text-amber-50 px-2 rounded mx-auto"
                    >
                      Déconnexion
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="connexion-inscription w-48 flex mr-2">
            <NavLink
              to="/connexion"
              className="text-amber-50 rounded-l-md w-1/2 text-center sm:text-lg text-sm"
            >
              Connexion
            </NavLink>
            <NavLink
              to="/inscription"
              className="text-black bg-amber-50 rounded-r-md w-1/2 text-center sm:text-lg text-sm"
            >
              Inscription
            </NavLink>
          </div>
        )}
      </nav>
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
