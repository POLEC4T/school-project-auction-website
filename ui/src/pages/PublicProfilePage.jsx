import React from "react";
import { useState, useEffect,  } from "react";
import { getUserById } from "../services/UserService";
import NavBar from "../components/NavBar";
import ProfilContent from "../components/ProfilContent";
import { useParams } from 'react-router-dom';
import { getArticlesSoldbyUserId } from "../services/UserService";
import ArticleCompact from "../components/ArticleCompact";

function PublicProfilePage() {

  const userId = useParams().userId;
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getUserById(userId)
      .then((response) => {
        if (response.message) {
          setError(response.message);
          setIsLoading(false);
        } else {
          setData(response);
          setIsLoading(false);
        }
      })
      .catch(() => {
        setError("Error connecting to server. Please try again later.");
      });
  }, [userId]);

  useEffect(() => {
    getArticlesSoldbyUserId(userId)
      .then((response) => {
        if (response.message) {
          setError(response.message);
          setIsLoading(false);
        } else {
          setArticles(response);
          setIsLoading(false);
        }
      })
      .catch(() => {
        setError("Error connecting to server. Please try again later.");
      });
  }, [userId]);


  return (
    <div>

      <NavBar />

      {data && (
        <>

          <section className="top sm:h-80 h-40 relative justify-center items-center bg-center bg-banniere bg-zinc-800 bg-no-repeat bg-100 flex font-outfit">
              <h1
                className="font-gowun text-6xl"
                style={{ color: data.couleur ? data.couleur : "white" }}
              >
                {data.login}
              </h1>
            </section>
          {<ProfilContent user={data}/>}
          <h2 className="text-4xl font-outfit w-full text-center my-10">En vente sur ce profil</h2>
          <div className="w-full mt-10 flex flex-col items-center">
                {Array.from(
                  { length: Math.ceil(articles.length / 4) },
                  (_, i) => {
                    const start = i * 4;
                    return (
                      <div
                        className="flex flex-row mt-10 sm:gap-8 gap-0 sm:flex-no-wrap flex-wrap"
                        key={i}
                      >
                        {Array.from({ length: 4 }, (_, j) => {
                          const index = start + j;
                          if (index < articles.length) {
                            return (
                              <ArticleCompact
                                key={index}
                                article={articles[index]}
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
        </>
      )}
    </div>
  );
}

export default PublicProfilePage;
