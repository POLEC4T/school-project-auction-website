import React from "react";
import { getVendre } from "../services/UserService";
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import RefusedAccess from "../components/RefusedAccess";
import Titre from "../components/vente/Titre";
import Taille from "../components/vente/Taille";
import Photos from "../components/vente/Photos";
import Description from "../components/vente/Description";
import Categorie from "../components/vente/Categorie";
import Couleur from "../components/vente/Couleur";
import Materiaux from "../components/vente/Materiaux";
import PrixDepart from "../components/vente/PrixDepart";
import PrixReserve from "../components/vente/PrixReserve";
import { createArticle } from "../services/ArticleService";
import {uploadImage} from "../services/ImageService";
import { useNavigate } from "react-router-dom";

function VendrePage() {
  const navigate = useNavigate();

  //usestates
  const [vendeur, setVendeur] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [imagesNames, setImagesNames] = useState([]);
  const [categorie, setCategorie] = useState("");
  const [taille, setTaille] = useState("");
  const [couleur, setCouleur] = useState("");
  const [materiaux, setMateriaux] = useState("");
  const [prix_depart, setPrix_depart] = useState(0);
  const [seuil, setSeuil] = useState(0);
  const [isPageValid, setIsPageValid] = useState(false);
  const [message, setMessage] = useState("");

  //handle functions
  const handleTitre = (e) => {
    e.preventDefault();
    setTitre(e.target.value);
  };

  const handleDescription = (e) => {
    e.preventDefault();
    setDescription(e.target.value);
  };

  const handleImages = (e) => {
    if (images.length < 4) {
      setImages([...images, e.target.files]);
      setImagesNames(imagesNames + ", " + e.target.value);
    }
  };

  const handleCategorie = (e) => {
    e.preventDefault();
    setCategorie(e.target.value);
  };

  const handleTaille = (e) => {
    e.preventDefault();
    setTaille(e.target.value);
  };

  const handleCouleur = (e) => {
    e.preventDefault();
    setCouleur(e.target.value);
  };

  const handleMateriaux = (e) => {
    e.preventDefault();
    setMateriaux(e.target.value);
  };

  const handlePrix_depart = (e) => {
    e.preventDefault();
    //si le dernier caractères est un signe €, on l'enlève
    if(e.target.value.slice(-1) === "€"){
      setPrix_depart(e.target.value.slice(0, -1));
    }else{
    setPrix_depart(e.target.value);
    }
  };

  const handleSeuil = (e) => {
    e.preventDefault();
    //si le dernier caractères est un signe €, on l'enlève
    if(e.target.value.slice(-1) === "€"){
      setSeuil(e.target.value.slice(0, -1));
    }else{
    setSeuil(e.target.value);
    }
  };

  const handleNextPage = (e) => {
    e.preventDefault();
    if (page < 3 && isPageValid) {
      setPage(page + 1);
      setMessage("");
    } else if (page < 3 && isPageValid) {
      setMessage("Veuillez remplir tous les champs correctement");
    }else{
        setMessage("");
    }
    //on remet la validité du formulaire à false quand on change de page
    setIsPageValid(false);
  };

  const handlePreviousPage = (e) => {
    e.preventDefault();
    if (page > 1) {
      setPage(page - 1);
      setMessage("");
    //on remet la validité du formulaire à false quand on change de page
    setIsPageValid(false);
  };
}

const handleSubmit = (e) => {
  e.preventDefault();
  const article = {
    titre: titre,
    description: description,
    categorie: categorie,
    taille: taille,
    couleur: couleur,
    materiaux: materiaux,
    prix_depart: prix_depart
  };
  if (seuil !== 0) {
    article.seuil = seuil;
  }
  //TODO: send data to backend
  createArticle(article).then((response) => {
    //upload images
    console.log(response)
    images.forEach(image => {
      uploadImage(image[0],response.data.id).then((response) => {
        navigate("/");
        window.location.reload();
      }
      ).catch((error) => {
        console.log(error);
        setMessage("Une erreur est survenue, veuillez réessayer plus tard");
      }
      );
    });

  });
  console.log(article);
};

  //useEffect
  //verifier le droit d'accès à la page
  useEffect(() => {
    getVendre()
      .then((response) => {
        setVendeur(true);
        setIsLoading(false);
      })
      .catch((error) => {
        setVendeur(false);
        setIsLoading(false);
      });
  }, []);

  //vérifier si la page est valide
  useEffect(() => {
    if (page === 1) {
      console.log();
      if (
        titre !== "" &&
        description !== "" &&
        description.length <= 255 &&
        images.length >= 0 &&
        images.length < 4
      ) {
        setIsPageValid(true);
      }
    } else if (page === 2) {
      if (
        taille !== "select" &&
        couleur !== "" &&
        materiaux !== "" &&
        categorie !== "select"
      ) {
        setIsPageValid(true);
      }
    } else if (page === 3) {
      if (prix_depart > 0) {
        setIsPageValid(true);
      }
    } else {
      setIsPageValid(false);
    }
  }, [
    page,
    titre,
    description,
    images,
    categorie,
    taille,
    couleur,
    materiaux,
    prix_depart,
    seuil,
  ]);

  if (isLoading) {
    return null;
  }
  if (vendeur) {
    return (
      <>
        <NavBar />
        <main className="main-container flex flex-row items-center fixed justify-center font-outfit h-screen w-screen bg-zinc-800 bg-vente bg-auto bg-100 overflow-hidden">
          <div className="etape bg-white sm:w-3/4 w-full h-3/4 sm:rounded-xl rounded-none flex flex-row justify-between translate-y-[-40px]">
            <button className="precedent sm:px-5 px-1" onClick={handlePreviousPage}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-10 h-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>

            <div className="formulaire mt-5 flex flex-col items-center w-full">
              <h2 className="font-gowun text-center sm:text-5xl text-3xl">
                Mise aux enchères ({page}/3)
              </h2>

              {page === 1 && (
                <>
                  <Photos onChange={handleImages} value={imagesNames} />
                  <Titre onChange={handleTitre} value={titre} />
                  <Description
                    onChange={handleDescription}
                    value={description}
                  />
                </>
              )}
              {page === 2 && (
                <>
                  <Categorie onChange={handleCategorie} value={categorie} />
                  <Taille onChange={handleTaille} value={taille} />
                  <Couleur onChange={handleCouleur} value={couleur} />
                  <Materiaux onChange={handleMateriaux} value={materiaux} />
                </>
              )}
              {page === 3 && (
                <>
                  <PrixDepart
                    onChange={handlePrix_depart}
                    value={prix_depart}
                  />
                  <PrixReserve onChange={handleSeuil} value={seuil} prix_depart={prix_depart} />
                  <button className="bg-zinc-800 text-orange-200 px-3 py-1 rounded-lg sm:mt-6 mt-2 sm:text-2xl text-sm hover:bg-zinc-600 mt-16" onClick={handleSubmit}>
                    Mettre en ligne
                  </button>
                </>
              )}

              {message && <p className="text-red-500">{message}</p>}
            </div>
            <button className="suivant sm:px-5 px-2" onClick={handleNextPage}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-10 h-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>
        </main>
      </>
    );
  } else {
    return (
      <>
        <RefusedAccess message="Vous devez être vendeur · euse pour accéder à cette page" />
      </>
    );
  }
}

export default VendrePage;
