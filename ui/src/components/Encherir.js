import React from "react";
import { getDerniereOffre } from "../services/EnchereService";
import { useState, useEffect, useRef } from "react";
import moment from "moment";
import Timer from "./Timer";
import { getNbLikeArticle } from "../services/ArticleService";
import { Link } from "react-router-dom";
import AuthService from "../services/AuthService";
import Modal from "../components/Modal";
import { getUserById } from "../services/UserService";
import { isArticleLikedByUser, createLike, removeLike } from "../services/LikeService";
const WS_URL = "ws://127.0.0.1:8000"; // à changer en prod


function Encherir({ article, vendeur }) {

  const [offreActuelle, setOffreActuelle] = useState(0.0);
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [avatar, setAvatar] = useState(
    require("../static/images/default-avatar.png")
  );

  const ws = useRef(null);

  //useEffect qui gère le websocket
  useEffect(() => {
    if (!user) return;
    const url =
      WS_URL +
      "?id=" +
      article.id +
      "&token=" +
      AuthService.getCurrentUser().accessToken;
    ws.current = new WebSocket(url);
    ws.current.onopen = () => {
      console.log("ws connected");
    };
    ws.current.onmessage = (e) => {
      const response = JSON.parse(e.data);
      if (response.prix) {
        setOffreActuelle({ montant: parseFloat(response.prix) });
      } else if (response.error) {
        setMessage(response.error);
      }
    };
    ws.current.onclose = () => {
      console.log("ws closed");
    };
    return () => {
      ws.current.close();
    };
  }, [offreActuelle, article]);

  useEffect(() => {
    if (article) {
      getDerniereOffre(article.id).then((enchere) => {
        enchere.message
          ? setOffreActuelle({ montant: article.prix_depart })
          : setOffreActuelle(enchere);
      });
    }
  }, [article]);

  const [nbLikesConst, setNbLikesConst] = useState(0);
  useEffect(() => {
    if (article) {
      getNbLikeArticle(article.id).then((nbLikesRes) => {
        if (nbLikesRes.nb) setNbLikesConst(nbLikesRes.nb);
      });
    }
  }, [article]);

  /* RECUPERATION DE LA PDP */

  useEffect(() => {
    if (vendeur) {
      if (vendeur.pdp !== null) setAvatar(`${vendeur.pdp}`);
    }
  }, [vendeur]);




  /* RECUPERATION DE L'USER */


  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setUser(user);
    } else {
      console.error("User non trouvé");
    }
  }, []);

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (user) {
      getUserById(user.id).then((user) => {
        setUserData(user);
      });
    }
  }, [user]);

  const [likeStroke, setLikeStroke] = useState("black");
  const [likeFill, setLikeFill] = useState("none");

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user && article) {
      isArticleLikedByUser(article.id).then((isLiked) => {
        console.log("isLiked", isLiked)
        isLiked.liked ? setLikeStroke("red") : setLikeStroke("black");
        isLiked.liked ? setLikeFill("red") : setLikeFill("none");
        isLiked.liked ? setIsArticleLiked(true) : setIsArticleLiked(false);
      }).catch((err) => {
        console.log(err);
      });
    }
  }, [article]);

  const placeholderPrixForm = `${
    offreActuelle.montant + offreActuelle.montant * 0.1
  }€ ou plus`;
  const propositionPrix1 = offreActuelle.montant + offreActuelle.montant * 0.1;
  const propositionPrix2 = offreActuelle.montant + offreActuelle.montant * 0.5;
  const propositionPrix3 = offreActuelle.montant + offreActuelle.montant;
  const endDate = moment(article.expires);
  const [montantInput, setMontantInput] = useState("");
  const articleTags = {
    col: article.couleurs.split(","),
    mat: article.materiaux.split(","),
    taille: article.taille,
    categorie: article.categorie,
  };
  const [isArticleLiked, setIsArticleLiked] = useState(false);

  function handleClickLike() {
    //si l'utilisateur n'est pas connecté on affiche un message
    if (!user) {
      setMessage("Vous devez être connecté pour liker un article");
      return;
    }
    setIsArticleLiked(!isArticleLiked);
    if (isArticleLiked) {
      removeLike(article.id);
      setLikeFill("none");
      setLikeStroke("black");
      setNbLikesConst(nbLikesConst - 1);
    } else {
      createLike(article.id);
      setLikeFill("red");
      setLikeStroke("red");
      setNbLikesConst(nbLikesConst + 1);
    }
  }

  const handleClickButtonProposition = (e) => {
    setMontantInput(e);
  };
  const handleChangeMontantInput = (event) => {
    setMontantInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (montantInput < propositionPrix1) {
      setMessage(
        "Vous devez ajouter au moins 10% de l'offre actuelle (soit " +
          propositionPrix1 +
          "€)"
      );
    } else {
      setMessage("");
      console.log("envoi montant : ", montantInput);
      setIsOpen(false);
      ws.current.send(montantInput);
    }
  };

  return (
    <div className="sm:w-1/2 w-full z-10">
      <section className="droite flex flex-col items-center">
        <div className="chrono text-orange-200 bg-zinc-800 sm:w-2/6 w-full justify-center sm:rounded-t flex h-10 items-center min-w-fit drop-shadow-lg">
          <span className="flex flex-row justify-center items-center p-2 md:text-2xl text-xl">
            <Timer endDate={endDate} full="true" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              className="h-8 w-8 ml-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </span>
        </div>

        <div className="informations bg-white text-zinc-800 sm:w-5/6 w-full p-4 sm:px-9 px-4 sm:rounded-xl rounded-b-xl">
          <div className="top flex justify-between items-start">
            <div className="prix flex flex-col">
              <p className="font-chivo text-gray-400 text-xl">Offre actuelle</p>
              {offreActuelle.montant && (
                <p className="sm:text-9xl text-9xl">{offreActuelle.montant}€</p>
              )}
              {article.seuil_reserve != null ? (
                <p className="text-gray-400 text-xl">Avec prix de réserve</p>
              ) : null}
            </div>

            <button className="bouton-jaime flex items-center gap-1 bg-white px-2 rounded" onClick={handleClickLike}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={likeFill}
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke={likeStroke}
                className="w-4 h-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
              <p className="font-gowun text-zinc-800">{nbLikesConst}</p>
            </button>
          </div>

          <div className="profil mt-6 flex flex-row items-center">
            <img
              className="w-20 h-20 rounded-full"
              src={avatar && avatar}
              alt="photo-profil"
            />
            <div className="text-profil flex flex-row flex-wrap items-center">
              <p className="ml-5 text-3xl">par {vendeur.login}</p>

              {user && user.id === vendeur.id ? (
                <Link
                  to={`/profil`}
                  className="flex items-center justify-center ml-5 text-gray-500 text-xl hover:text-gray-400"
                >
                  <p className="text-4xl mr-2 text-gray-400">+ Voir profil</p>
                </Link>
              ) : (
                <Link
                  to={`/publicprofil/${vendeur.id}`}
                  className="flex items-center ml-5 text-gray-500 text-xl hover:text-gray-400"
                >
                  <p className="text-xl mr-2 text-gray-400">+ Voir profil</p>
                </Link>
              )}
            </div>
          </div>

          <div className="zone-enchere flex flex-col pt-6">
            <div className="enchere-preparee w-full flex gap-4 text-2xl">
              <button
                className="border-2 border-zinc-500 text-zinc-500 hover:bg-zinc-500 ease-in-out duration-100 hover:text-gray-100 w-1/3 rounded-lg h-12"
                onClick={() => handleClickButtonProposition(propositionPrix1)}
              >
                {propositionPrix1}€
              </button>
              <button
                className="border-2 border-zinc-700 text-zinc-700 hover:bg-zinc-700  ease-in-out duration-100 hover:text-gray-100 w-1/3 rounded-lg h-12"
                onClick={() => handleClickButtonProposition(propositionPrix2)}
              >
                {propositionPrix2}€
              </button>
              <button
                className="border-2 border-zinc-900 text-zinc-900 hover:bg-zinc-900 ease-in-out duration-100 hover:text-gray-100 w-1/3 rounded-lg h-12"
                onClick={() => handleClickButtonProposition(propositionPrix3)}
              >
                {propositionPrix3}€
              </button>
            </div>
            <input
              className="mt-3 bg-zinc-100 rounded-lg h-12 px-4 focus:outline-none hover:bg-zinc-200 text-xl placeholder-zinc-500"
              type="number"
              placeholder={placeholderPrixForm}
              value={montantInput}
              onChange={handleChangeMontantInput}
            />
            <div className="enchere-ou-offre-maximale flex mt-3 gap-4">
              {userData && userData.roleId === 2 ? (
                <button
                  onClick={() => setIsOpen(true)}
                  className="bg-zinc-800 hover:bg-zinc-600 w-full rounded-lg h-12 text-2xl text-orange-200"
                  disabled={montantInput === ""}
                >
                  Enchérir
                </button>
              ) : (
                <Link
                  to="/connexion"
                  className="bg-zinc-800 hover:bg-zinc-600 flex items-center justify-center w-full rounded-lg h-12 sm:text-2xl text-lg text-orange-200"
                >
                  Se connecter en tant qu'acheteur pour enchérir
                </Link>
              )}
            </div>

            <Modal
              open={isOpen}
              onClose={() => setIsOpen(false)}
              onConfirm={handleSubmit}
            >
              Vous êtes sur le point de faire une offre sur cet article.
              <br />
              <span className="mt-10 font-bold">Montant : {montantInput}€</span>
            </Modal>

            {message && <p className="text-red-500 text-xl mt-3">{message}</p>}

            <p className="description text-justify text-2xl mt-6">
              {article.description}
            </p>

            <div className="mt-3 flex gap-2 flex-wrap text-xl">
              <Link
                className="hover:bg-zinc-800 hover:text-orange-200 ease-in-out duration-100 px-2 rounded"
                to={{
                  pathname: "/recherche",
                  search: `taille=${articleTags.taille}`,
                }}
              >
                #{articleTags.taille}
              </Link>
              <Link
                className="hover:bg-zinc-800 hover:text-orange-200 ease-in-out duration-100 px-2 rounded"
                to={{
                  pathname: "/recherche",
                  search: `cat=${articleTags.categorie}`,
                }}
              >
                #{articleTags.categorie}
              </Link>
              {articleTags.mat.map((materiau, i) => {
                return (
                  <Link
                    key={i}
                    className="hover:bg-zinc-800 hover:text-orange-200 ease-in-out duration-100 px-2 rounded"
                    to={{ pathname: "/recherche", search: `mat=${materiau}` }}
                  >
                    #{materiau}
                  </Link>
                );
              })}
              {articleTags.col.map((couleur, i) => {
                return (
                  <Link
                    key={i}
                    className="hover:bg-zinc-800 hover:text-orange-200 ease-in-out duration-100 px-2 rounded"
                    to={{ pathname: "/recherche", search: `col=${couleur}` }}
                  >
                    #{couleur}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Encherir;
