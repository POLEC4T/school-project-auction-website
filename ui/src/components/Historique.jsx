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
          <section class="historique pt-10 sm:text-start text-center sm:px-28 px-4 font-outfit">
            <h2 class="text-4xl">Vos ventes</h2>

            {historiqueElementsVendues}
          </section>
        </>
      ) : (
        <>
          <section class="historique pt-10 sm:text-start text-center sm:px-28 px-4 font-outfit">
            <h2 class="text-4xl">Vos enchères gagnées</h2>
            {historiqueElements}
          </section>
        </>
      )}
    </>
  );
}

export default Historique;
