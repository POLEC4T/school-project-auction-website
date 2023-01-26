import React from "react";
import { useState, useEffect } from "react";
import { getArticlesWonbyUserId } from "../services/UserService";
import { getArticlesSoldbyUserId } from "../services/UserService";
import { getArticle } from "../services/ArticleService";
import HistoriqueElement from "./HistoriqueElement";

function Historique({ user }) {
  const [image, setImage] = useState(null);
  const [enchereGagnees, setEnchereGagnees] = useState([]);
  const [enchereVendues, setEnchereVendues] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user && user.roleId == 2) {
      getArticlesWonbyUserId(user.id)
        .then((response) => {
          if (!response) {
            setError(response.message);
          } else {
            setEnchereGagnees(response);
          }
        })
        .catch(() => {
          setError("Error connecting to server. Please try again later.");
        });
    }
  }, [user]);

  useEffect(() => {
    if (user && user.roleId === 1) {
      getArticlesSoldbyUserId(user.id)
        .then((response) => {
          if (!response) {
            setError(response.message);
          } else {
            setEnchereVendues(response);
            console.log("TEST HISTORIQUE " + response);
          }
        })
        .catch(() => {
          setError("Error connecting to server. Please try again later.");
        });
    }
  }, [user]);

  const historiqueElements = enchereGagnees.map((article) => {
    return (
      <HistoriqueElement
        article={article}
        roleId={user.roleId}
        key={article.id}
      />
    );
  });

  const historiqueElementsVendues = enchereVendues.map((article) => {
    console.log(user.roleId + " " + user.login);
    return (
      <HistoriqueElement
        article={article}
        roleId={user.roleId}
        key={article.id}
      />
    );
  });

  return (
    <>
      {user && user.roleId === 1 ? (
        <>
          <section className="historique pt-10 sm:text-start text-center sm:px-28 px-4 font-outfit">
            <h2 className="text-4xl">Vos ventes</h2>
            {historiqueElementsVendues &&
            historiqueElementsVendues.length > 0 ? (
              historiqueElementsVendues
            ) : (
              <>
                
                
                <div className="font-outfit text-4xl mt-10 w-full flex flex-col justify-center items-center">
                  <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w- 12 h-12"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                  </svg>
                  Vous n'avez pas encore vendu d'articles
                </div>
              </>
            )}
          </section>
        </>
      ) : (
        <>
          <section className="historique pt-10 sm:text-start text-center sm:px-28 px-4 font-outfit">
            <h2 className="text-4xl">Vos enchères gagnées</h2>
            {historiqueElements}
          </section>
        </>
      )}
    </>
  );
}

export default Historique;
