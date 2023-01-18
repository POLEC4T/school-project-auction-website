import React from "react";
import { useLocation, useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import FilAriane from "../components/FilAriane";
import ArticleCompact from "../components/ArticleCompact";
import { getArticlesWithLeastTimeLeft } from "../services/AccueilService";
import { useEffect, useState } from "react";
import ProfileNav from "../components/ProfileNav";
import CheckboxFiltre from "../components/CheckboxFiltre";


function ResultatsRecherche() {
  const [numArticles, setNumArticles] = React.useState(12);
  const [topArticles, setTopArticles] = React.useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);


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

  const chunkSize = 4;
  const chunks = Array.from(
    { length: Math.ceil(numArticles / chunkSize) },
    (_, i) => {
      const start = i * chunkSize;
      return (
        <div
          className="flex flex-row justify-around sm:gap-2 gap-0 sm:flex-no-wrap flex-wrap"
          key={i}
        >
          {Array.from({ length: chunkSize }, (_, j) => {
            const index = start + j;
            if (index < numArticles && topArticles && topArticles[index]) {
              return (
                <ArticleCompact key={index} article={topArticles[index]} />
              );
            }
            return null;
          })}
        </div>
      );
    }
  );

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
            .includes(recherche.toLowerCase().trim())
          ||
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
      <NavBar />
      <main class="flex">
        <aside class="w-1/4 bg-zinc-400 flex items-center flex-col gap-3 p-4 justify-top">
          <button
            class="rounded-xl bg-black text-white w-1/2 h-10 font-gowun flex justify-around items-center "
            onClick={() => handleClickRemoveFilters()}
          >
            Effacer les filtres
            <svg
              class="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* ====================== TAILLE ======================= */}

          <div class="w-full h-0.5 bg-gray-700"></div>
          <section class="w-full flex flex-col gap-3">
            <h2 class=" font-gowun text-xl ">Taille</h2>

            <div class="flex flex-col flex-wrap h-20 justify-center items-center">
              <label class="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  class="cursor-pointer"
                  value="1-3"
                  name="taille"
                  onChange={handleFilterChange}
                />
                <span class="select-none font-outfit ml-2">0 à 3 ans</span>
              </label>
              <label class="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  class="cursor-pointer"
                  value="4-9"
                  name="taille"
                  onChange={handleFilterChange}
                />
                <span class="select-none font-outfit ml-2">4 à 9 ans</span>
              </label>
              <label class="  inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  class="cursor-pointer"
                  value="10-14"
                  name="taille"
                  onChange={handleFilterChange}
                />
                <span class="select-none font-outfit ml-2">10 à 14 ans</span>
              </label>

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
          </section>

          {/* ======================== COULEURS =========================== */}

          <div class="w-full h-0.5 bg-gray-700"></div>
          <section class="w-full flex flex-col gap-3">
            <h2 class=" font-gowun text-xl ">Couleur</h2>

            <div class="flex flex-col flex-wrap h-24">
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
              <CheckboxFiltre
                name="couleurs"
                value="vert"
                onChange={handleFilterChange}
              />
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
                value="beige"
                onChange={handleFilterChange}
              />
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
          </section>

          {/*==================== MATERIAUX ==================== */}

          <div class="w-full h-0.5 bg-gray-700"></div>
          <section class="w-full flex flex-col gap-3">
            <h2 class=" font-gowun text-xl ">Matériaux</h2>
            <div class="flex flex-col flex-wrap h-20">
              <CheckboxFiltre
                name="materiaux"
                value="cachemire"
                onChange={handleFilterChange}
              />
              <CheckboxFiltre name="materiaux" value="cuir" onChange={handleFilterChange} />
              <CheckboxFiltre
                name="materiaux"
                value="coton"
                onChange={handleFilterChange}
              />
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
          </section>

          {/*==================== CATEGORIES ==================== */}

          <div class="w-full h-0.5 bg-gray-700"></div>
          <section class="w-full flex flex-col gap-3">
            <h2 class=" font-gowun text-xl ">Catégories</h2>
            <div class="flex flex-col flex-wrap h-20">
              <CheckboxFiltre
                name="categorie"
                value="haut"
                onChange={handleFilterChange}
              />
              <CheckboxFiltre
                name="categorie"
                value="bas"
                onChange={handleFilterChange}
              />
              <CheckboxFiltre
                name="categorie"
                value="autres"
                onChange={handleFilterChange}
              />
            </div>
          </section>
        </aside>
        <section class="p-16 w-full ">
          <div class="flex justify-between items-center">
            <FilAriane />
            <div class="bg-zinc-200 p-2 rounded shadow-lg">
              <p>Trier par</p>
              <select class="bg-zinc-200">
                <option value="option1">Prix croissant</option>
                <option value="option2">Prix décroissant</option>
                <option value="option3">Temps restant croissant</option>
                <option value="option4">Temps restant décroissant</option>
              </select>
            </div>
          </div>

          <section class="flex justify-between gap-16 p-12 flex-wrap overflow-y-scroll">
            {filteredArticles.length === 0 ? (
              <p>Aucun article ne correspond à votre recherche</p>
            ) : (
              filteredArticles.map((article) => (
                <ArticleCompact article={article} key={article.id} />
              ))
            )}
          </section>
        </section>
      </main>
    </>
  );
}

export default ResultatsRecherche;
