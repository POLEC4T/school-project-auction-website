import React from "react";
import { useLocation, useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import FilAriane from "../components/FilAriane";
import ArticleCompact from "../components/ArticleCompact";
import { getArticlesWithLeastTimeLeft } from "../services/AccueilService";
import { useEffect, useState } from "react";
import CheckboxFiltre from "../components/CheckboxFiltre";

function ResultatsRecherche() {
  
  const imageFiltreTaille = require("../static/images/image-filtre-taille.png");

  const [numArticles, setNumArticles] = React.useState(12);
  const [topArticles, setTopArticles] = React.useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openFiltres, setOpenFiltres] = useState(false);

  const [filters, setFilters] = useState({
    taille: [],
    couleurs: [],
    materiaux: [],
    categorie: [],
  });

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const mat = query.get("mat");
  const col = query.get("col");
  const taille = query.get("taille");
  const cat = query.get("cat");
  const recherche = query.get("recherche");

  // On pré-coche les filtres s'ils sont dans l'url
  useEffect(() => {
    if (mat) {
      setFilters({ ...filters, materiaux: [mat] });
      const checkbox = document.querySelector(`input[value=${mat}]`);
      checkbox.checked = true;
    }
    if (col) {
      setFilters({ ...filters, couleurs: [col] });
      const checkbox = document.querySelector(`input[value=${col}]`);
      checkbox.checked = true;
    }
    if (taille) {
      setFilters({ ...filters, taille: [taille] });
      const checkbox = document.querySelector(`input[value=${taille}]`);
      checkbox.checked = true;
    }
    if (cat) {
      setFilters({ ...filters, categorie: [cat] });
      const checkbox = document.querySelector(`input[value=${cat}]`);
      checkbox.checked = true;
    }
  }, [mat, col, taille]);

  useEffect(() => {
    getArticlesWithLeastTimeLeft()
      .then((response) => {
        if (response.message === "Aucun article trouvé") {
          setError(response.message);
          setIsLoading(false);
        } else {
          setTopArticles(response);
          setIsLoading(false);
        }
      })
      .catch(() => {
        setError("Error connecting to server. Please try again later.");
      });
  }, []);
  

  const filteredArticles = topArticles.filter((article) => {
    let matches = true;
    Object.keys(filters).forEach((key) => {
      if (filters[key].length !== 0) {
        if (!filters[key].includes(article[key])) {
          matches = false;
        }
      }
      if (recherche) {
        if (
          !article.titre
            .toLowerCase()
            .includes(recherche.toLowerCase().trim()) ||
          !article.description
            .toLowerCase()
            .includes(recherche.toLowerCase().trim())
        ) {
          matches = false;
        }
      }
    });
    return matches;
  });

  function handleFilterChange(e) {
    const { name, value } = e.target;

    setFilters((prevFilters) => {
      return {
        ...prevFilters,
        [name]: prevFilters[name].includes(value)
          ? prevFilters[name].filter((v) => v !== value)
          : [...prevFilters[name], value],
      };
    });
  }

  function handleClickRemoveFilters() {
    setFilters({ taille: [], couleurs: [], materiaux: [], categorie: [] });
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => (checkbox.checked = false));
  }

  return (
    <>
      <NavBar fixed={true} />
      <main className="flex sm:flex-row flex-col font-outfit">
        <aside
          className={`bg-zinc-200 text-zinc-800 sm:w-[400px] w-full flex flex-col ${
            openFiltres || window.innerWidth > 768
              ? "sm:fixed block h-screen sm:mt-10 mt-0 sm:block"
              : "hidden"
          }`}
        >
          <button
            className="bg-zinc-800 text-orange-50 border-2 border-zinc-800 text-xl py-2 px-4 rounded-lg mx-4 mt-12 mb-2 flex flex-row justify-center items-center gap-2 sm:w-3/4 sm:translate-x-8 translate-x-0"
            onClick={handleClickRemoveFilters}
          >
            <svg
              className="w-6 h-6 ml-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Effacer les filtres
          </button>

          <button
            className="bg-zinc-200 text-zinc-800 border-2 border-zinc-800 text-xl py-2 px-4 rounded-lg mx-4 flex flex-row justify-center items-center gap-2 sm:hidden block"
            onClick={() => setOpenFiltres(false)}
          >
            Fermer les filtres{" "}
          </button>

          {/*==================== CATEGORIES ==================== */}

          <section className="categories flex flex-col sm:my-4 sm:my-2 my-1 px-4 py-5">
            <h2 className="text-3xl flex flex-row">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-8 h-8 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 6h.008v.008H6V6z"
                />
              </svg>
              Catégories
            </h2>
            <div className="check text-xl flex flex-row mt-4 justify-center">
              <div className="gauche">
                <CheckboxFiltre
                  name="categorie"
                  value="haut"
                  onChange={handleFilterChange}
                />
              </div>
              <div className="middle mx-10">
                <CheckboxFiltre
                  name="categorie"
                  value="bas"
                  onChange={handleFilterChange}
                />
              </div>
              <div className="droite">
                {" "}
                <CheckboxFiltre
                  name="categorie"
                  value="autres"
                  onChange={handleFilterChange}
                />
              </div>
            </div>
          </section>

          {/* ====================== TAILLE ======================= */}

          <div className="bg-zinc-800 w-3/4 h-px mx-auto sm:my-2 my-1"></div>

          <section className="taille flex flex-col px-4 py-5">
            <h2 className="text-3xl flex flex-row">
              <img
                src={imageFiltreTaille && imageFiltreTaille}
                alt="filtre_taille"
                className="h-8 w-8 mr-2"
              />
              Taille
            </h2>

            <div className="check text-xl flex flex-row mt-4 justify-center">
              <div className="droite flex flex-col">
                <CheckboxFiltre
                  name="taille"
                  value="0-4 ans"
                  onChange={handleFilterChange}
                />
                <CheckboxFiltre
                  name="taille"
                  value="5-9 ans"
                  onChange={handleFilterChange}
                />
                <CheckboxFiltre
                  name="taille"
                  value="10-14 ans"
                  onChange={handleFilterChange}
                />
              </div>

              <div className="middle flex flex-col mx-7">
                <CheckboxFiltre
                  name="taille"
                  value="XS"
                  onChange={handleFilterChange}
                />
                <CheckboxFiltre
                  name="taille"
                  value="S"
                  onChange={handleFilterChange}
                />
                <CheckboxFiltre
                  name="taille"
                  value="M"
                  onChange={handleFilterChange}
                />
              </div>
              <div className="droite flex flex-col mx-6">
                <CheckboxFiltre
                  name="taille"
                  value="L"
                  onChange={handleFilterChange}
                />
                <CheckboxFiltre
                  name="taille"
                  value="XL"
                  onChange={handleFilterChange}
                />
                <CheckboxFiltre
                  name="taille"
                  value="XXL"
                  onChange={handleFilterChange}
                />
              </div>
            </div>
          </section>

          {/* ======================== COULEURS =========================== */}

          <div className="bg-zinc-800 w-3/4 h-px mx-auto sm:my-2 my-1"></div>
          <section className="couleurs flex flex-col px-4 py-5">
            <h2 className="text-3xl flex flex-row">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-8 w-8 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z"
                />
              </svg>
              Couleurs
            </h2>

            <div className="check text-xl flex flex-row mt-4 justify-center">
              <div className="gauche flex flex-col">
                <CheckboxFiltre
                  name="couleurs"
                  value="rouge"
                  onChange={handleFilterChange}
                />
                <CheckboxFiltre
                  name="couleurs"
                  value="jaune"
                  onChange={handleFilterChange}
                />
                <CheckboxFiltre
                  name="couleurs"
                  value="bleu"
                  onChange={handleFilterChange}
                />
              </div>

              <div className="milieu flex flex-col mx-12">
                <CheckboxFiltre
                  name="couleurs"
                  value="blanc"
                  onChange={handleFilterChange}
                />
                <CheckboxFiltre
                  name="couleurs"
                  value="gris"
                  onChange={handleFilterChange}
                />
                <CheckboxFiltre
                  name="couleurs"
                  value="vert"
                  onChange={handleFilterChange}
                />
              </div>

              <div className="droite flex flex-col">
                <CheckboxFiltre
                  name="couleurs"
                  value="noir"
                  onChange={handleFilterChange}
                />
                <CheckboxFiltre
                  name="couleurs"
                  value="violet"
                  onChange={handleFilterChange}
                />
                <CheckboxFiltre
                  name="couleurs"
                  value="orange"
                  onChange={handleFilterChange}
                />
              </div>
            </div>
          </section>

          {/*==================== MATERIAUX ==================== */}

          <div className="bg-zinc-800 w-3/4 h-px mx-auto sm:my-2 my-1"></div>
          <section className="materiaux flex flex-col px-4 py-5">
            <h2 className="text-3xl flex flex-row">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-8 h-8 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
                />
              </svg>
              Matériaux
            </h2>

            <div className="check text-xl flex flex-row mt-4 justify-center">
              <div className="gauche">
                <CheckboxFiltre
                  name="materiaux"
                  value="cachemire"
                  onChange={handleFilterChange}
                />
                <CheckboxFiltre
                  name="materiaux"
                  value="cuir"
                  onChange={handleFilterChange}
                />
                <CheckboxFiltre
                  name="materiaux"
                  value="coton"
                  onChange={handleFilterChange}
                />
              </div>
              <div className="milieu mx-6">
                <CheckboxFiltre
                  name="materiaux"
                  value="laine"
                  onChange={handleFilterChange}
                />
                <CheckboxFiltre
                  name="materiaux"
                  value="lin"
                  onChange={handleFilterChange}
                />
                <CheckboxFiltre
                  name="materiaux"
                  value="soie"
                  onChange={handleFilterChange}
                />
              </div>
              <div className="droite">
                <CheckboxFiltre
                  name="materiaux"
                  value="polyester"
                  onChange={handleFilterChange}
                />
                <CheckboxFiltre
                  name="materiaux"
                  value="dentelle"
                  onChange={handleFilterChange}
                />
              </div>
            </div>
          </section>
        </aside>

        <section className="flex flex-col w-full sm:pl-100 pl-0 sm:pt-20 pt-0 sm:pr-16 pr-0">
          <div className="flex flex-row justify-between sm:pt-0 pt-12 sm:pr-0 pr-5">
            <FilAriane />

            <button
              className="openFiltre sm:hidden block"
              onClick={() => setOpenFiltres(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            <select  className="select-tri cursor-pointer bg-zinc-800 rounded-lg text-orange-50 sm:text-2xl text-lg sm:h-16 h-10 text-center focus:outline-none hover:bg-zinc-600 sm:pt-0 pt-10" disabled>
              <option value="prix-croissant">Prix croissant</option>
              <option value="prix-decroissant">Prix décroissant</option>
              <option value="temps-croissant">Temps restant croissant</option>
              <option value="temps-decroissant">Temps restant décroissant</option>
            </select>
          </div>

          <section className="flex sm:pt-10 pt-0">
            {filteredArticles.length === 0 ? (
              <p className="flex items-center justify-center text-4xl">
                Aucun article ne correspond à votre recherche
              </p>
            ) : (
              <div>
                {Array.from(
                  { length: Math.ceil(filteredArticles.length / 4) },
                  (_, i) => {
                    const start = i * 4;
                    return (
                      <div
                        className="flex flex-row mt-10 sm:gap-6 gap-0 sm:flex-no-wrap flex-wrap"
                        key={i}
                      >
                        {Array.from({ length: 4 }, (_, j) => {
                          const index = start + j;
                          if (index < filteredArticles.length) {
                            return (
                              <ArticleCompact
                                key={index}
                                article={filteredArticles[index]}
                              />
                            );
                          }
                          return null;
                        })}
                      </div>
                    );
                  }
                )}
              </div>
            )}
          </section>
        </section>

        <a
          href="#"
          className="h-10 w-10 fixed right-3 bottom-5 bg-zinc-800 rounded-full flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="white"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 15.75l7.5-7.5 7.5 7.5"
            />
          </svg>
        </a>
      </main>
    </>
  );
}

export default ResultatsRecherche;
