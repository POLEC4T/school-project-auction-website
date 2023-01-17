import React from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import FilAriane from "../components/FilAriane";
import ArticleCompact from "../components/ArticleCompact";
import { getArticlesWithLeastTimeLeft } from "../services/AccueilService";
import { useEffect, useState } from "react";
import ProfileNav from "../components/ProfileNav";

function ResultatsRecherche() {
  const recherche = useParams().recherche;
  const [numArticles, setNumArticles] = React.useState(12);
  const [topArticles, setTopArticles] = React.useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ taille: [], color: [], mats: [] });

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
          console.log(topArticles[0]);
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
    setFilters({ taille: [], color: [], mats: [] });
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
              <label class="w-10 inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  class="cursor-pointer"
                  value="1-3"
                  name="taille"
                  onChange={handleFilterChange}
                />
                <span class="select-none font-outfit ml-2">1-3 ans</span>
              </label>
              <label class="w-10 inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  class="cursor-pointer"
                  value="4-9"
                  name="taille"
                  onChange={handleFilterChange}
                />
                <span class="select-none font-outfit ml-2">4-9 ans</span>
              </label>
              <label class="w-10 inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  class="cursor-pointer"
                  value="10-14"
                  name="taille"
                  onChange={handleFilterChange}
                />
                <span class="select-none font-outfit ml-2">10-14 ans</span>
              </label>
            </div>

            <div class="flex flex-col flex-wrap h-20 justify-center items-center">
              <label class="w-10 inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  class="cursor-pointer"
                  name="taille"
                  value="XS"
                  onChange={handleFilterChange}
                />
                <span class="select-none font-outfit ml-2">XS</span>
              </label>
              <label class="w-10 inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  class="cursor-pointer"
                  name="taille"
                  value="S"
                  onChange={handleFilterChange}
                />
                <span class="select-none font-outfit ml-2">S</span>
              </label>
              <label class="w-10 inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  class="cursor-pointer"
                  value="M"
                  name="taille"
                  onChange={handleFilterChange}
                />
                <span class="select-none font-outfit ml-2">M</span>
              </label>
              <label class="w-10 inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  class="cursor-pointer"
                  value="L"
                  name="taille"
                  onChange={handleFilterChange}
                />
                <span class="select-none font-outfit ml-2">L</span>
              </label>

              <label class="w-10 inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  class="cursor-pointer"
                  value="XL"
                  name="taille"
                  onChange={handleFilterChange}
                />
                <span class="select-none tracking-widest font-outfit ml-2">
                  XL
                </span>
              </label>
              <label class="w-10 inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  class="cursor-pointer"
                  value="XXL"
                  name="taille"
                  onChange={handleFilterChange}
                />
                <span class="select-none tracking-widest font-outfit ml-2">
                  XXL
                </span>
              </label>
            </div>
          </section>

          {/* ======================== COULEURS =========================== */}

          <div class="w-full h-0.5 bg-gray-700"></div>
          <section class="w-full flex flex-col gap-3">
            <h2 class=" font-gowun text-xl ">Couleur</h2>

            <div class="flex flex-col flex-wrap h-24">
              <label class="w-10 inline-flex items-center ml-4 cursor-pointer ">
                <input type="checkbox" class="cursor-pointer" value="S" />
                <span class="select-none font-outfit ml-2">Rouge</span>
              </label>
              <label class="w-10 inline-flex items-center ml-4 cursor-pointer">
                <input type="checkbox" class="cursor-pointer" value="M" />
                <span class="select-none font-outfit ml-2">Jaune</span>
              </label>
              <label class="w-10 inline-flex items-center ml-4 cursor-pointer">
                <input type="checkbox" class="cursor-pointer" value="L" />
                <span class="select-none font-outfit ml-2">Bleu</span>
              </label>
              <label class="w-10 inline-flex items-center ml-4 cursor-pointer">
                <input type="checkbox" class="cursor-pointer" value="M" />
                <span class="select-none tracking-widest font-outfit ml-2">
                  Noir
                </span>
              </label>
              <label class="w-10 inline-flex items-center ml-4 cursor-pointer">
                <input type="checkbox" class="cursor-pointer" value="Blanc" />
                <span class="select-none tracking-widest font-outfit ml-2">
                  Blanc
                </span>
              </label>
              <label class="w-10 inline-flex items-center ml-4 cursor-pointer ">
                <input type="checkbox" class="cursor-pointer" value="S" />
                <span class="select-none font-outfit ml-2">Gris</span>
              </label>
              <label class="w-10 inline-flex items-center ml-4 cursor-pointer">
                <input type="checkbox" class="cursor-pointer" value="M" />
                <span class="select-none font-outfit ml-2">Beige</span>
              </label>
              <label class="w-10 inline-flex items-center ml-4 cursor-pointer">
                <input type="checkbox" class="cursor-pointer" value="L" />
                <span class="select-none font-outfit ml-2">Rose</span>
              </label>
              <label class="w-10 inline-flex items-center ml-4 cursor-pointer">
                <input type="checkbox" class="cursor-pointer" value="M" />
                <span class="select-none tracking-widest font-outfit ml-2">
                  Violet
                </span>
              </label>
              <label class="w-10 inline-flex items-center ml-4 cursor-pointer">
                <input type="checkbox" class="cursor-pointer" value="L" />
                <span class="select-none tracking-widest font-outfit ml-2">
                  Orange
                </span>
              </label>
            </div>
          </section>

          {/*==================== MATERIAUX ==================== */}

          <div class="w-full h-0.5 bg-gray-700"></div>
          <section class="w-full flex flex-col gap-3">
            <h2 class=" font-gowun text-xl ">Matériaux</h2>
            <div class="flex flex-col flex-wrap h-20">
              <label class="w-10 inline-flex items-center ml-4 cursor-pointer ">
                <input type="checkbox" class="cursor-pointer" value="S" />
                <span class="select-none font-outfit ml-2">Cachemire</span>
              </label>
              <label class="w-10 inline-flex items-center ml-4 cursor-pointer">
                <input type="checkbox" class="cursor-pointer" value="M" />
                <span class="select-none font-outfit ml-2">Coton</span>
              </label>
              <label class="w-10 inline-flex items-center ml-4 cursor-pointer">
                <input type="checkbox" class="cursor-pointer" value="L" />
                <span class="select-none font-outfit ml-2">laine</span>
              </label>
              <label class="w-10 inline-flex items-center ml-4 cursor-pointer">
                <input type="checkbox" class="cursor-pointer" value="M" />
                <span class="select-none tracking-widest font-outfit ml-2">
                  Lin
                </span>
              </label>
              <label class="w-10 inline-flex items-center ml-4 cursor-pointer">
                <input type="checkbox" class="cursor-pointer" value="L" />
                <span class="select-none tracking-widest font-outfit ml-2">
                  Soie
                </span>
              </label>
              <label class="w-10 inline-flex items-center ml-4 cursor-pointer">
                <input type="checkbox" class="cursor-pointer" value="L" />
                <span class="select-none tracking-widest font-outfit ml-2">
                  Polyester
                </span>
              </label>
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
            {filteredArticles.map((article) => (
              <ArticleCompact article={article} key={article.id} />
            ))}
          </section>
        </section>
      </main>
    </>
  );
}

export default ResultatsRecherche;
