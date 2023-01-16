import React from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import FilAriane from "../components/FilAriane";
import ArticleCompact from "../components/ArticleCompact";
import { getArticlesWithLeastTimeLeft } from "../services/AccueilService";
import { useEffect, useState } from "react";

function ResultatsRecherche() {
  const recherche = useParams().recherche;
  const [numArticles, setNumArticles] = React.useState(12);
  const [topArticles, setTopArticles] = React.useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <>
      <NavBar />
      <main className="h-screen w-screen flex">
        <aside className="w-1/4 bg-black"></aside>
        <section className="w-3/4 bg-blue">
          <nav className="flex justify-between h-32">
            <FilAriane />
            <div className="tri"></div>
          </nav>
          <div className="resultats">{chunks}</div>
        </section>
      </main>
    </>
  );
}

export default ResultatsRecherche;
