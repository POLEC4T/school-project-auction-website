import React from "react";
import moment from "moment";
import { useState, useEffect } from "react";
import { getUserById } from "../services/UserService";
import { getArticleImagesByArticleId } from "../services/ImageService";
import Modal from "./Modal";
import { getDerniereOffre } from "../services/EnchereService";

import {
  updateDateLivraisonArticle,
  updateStatutArticle,
} from "../services/ArticleService";
import Timer from "./Timer";

function HistoriqueElement({ article, roleId }) {
  const [vendeur, setVendeur] = useState(null);
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [gagnant, setGagnant] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [offreActuelle, setOffreActuelle] = useState(null);

  useEffect(() => {
    if (article) {
      setEndDate(moment(article.createdAt).add(7, "days"));
    }
  }, [article]);

  useEffect(() => {
    if (article && roleId === 1) {
      getUserById(article.gagnant)
        .then((response) => {
          if (response.message) {
            setError(response.message);
          } else {
            setGagnant(response);
          }
        })
        .catch(() => {
          setError("Error connecting to server. Please try again later.");
        });
    }
  }, [article]);

  useEffect(() => {
    if (article) {
      getUserById(article.vendeurId)
        .then((response) => {
          if (response.message) {
            setError(response.message);
          } else {
            setVendeur(response);
          }
        })
        .catch(() => {
          setError("Error connecting to server. Please try again later.");
        });
    }
  }, [article]);

  useEffect(() => {
    if (article) {
      getArticleImagesByArticleId(article.id).then((image) => {
        setImage(image[0].url);
      });
    }
  }, [article]);

  useEffect(() => {
    if (article) {
      getDerniereOffre(article.id).then((enchere) => {
        enchere.message
          ? setOffreActuelle({ montant: article.prix_depart })
          : setOffreActuelle(enchere);
      });
    }
  }, [article]);

  const handleConfirm = (e) => {
    const dateLivraison = new Date();
    const statut = "Livrée";
    updateDateLivraisonArticle(article.id, dateLivraison);
    updateStatutArticle(article.id, statut);
    setIsOpen(false);
    window.location.reload();
  };

  return (
    <>
      {article && roleId === 2 ? (
        <>
          <div class="histo1 my-10 text-zinc-800 rounded-xl w-full font-outfit">
            <div class="infos-livraison border-2 border-zinc-800 text-xl flex sm:flex-row flex-col justify-between pl-4 p-2 rounded-t-xl text-lg font-chivo text-start">
              <h3>
                Gagnée le : {moment(article.expires).format("YYYY-MM-DD")}
              </h3>
              <h3>
                Livrée le :{" "}
                {article.dateLivraison != null
                  ? moment(article.dateLivraison).format("YYYY-MM-DD")
                  : "En cours de livraison"}
              </h3>
              <h3>Statut : {article.statut} </h3>
            </div>
            <div class="details-commande bg-zinc-800 flex sm:flex-row flex-col text-2xl justify-between sm:p-5 pt-5 items-center sm:gap-0 gap-8 rounded-b-xl text-amber-50">
              <div class="gestion-small flex sm:mt-0 mt-5">
                <img
                  class="h-32 rounded-[50%] sm:ml-10 ml-0"
                  src={image && image}
                  alt="cardigan-coloré"
                />
                <div class="details sm:text-xl text-lg flex sm:flex-row flex-col sm:gap-8 gap-0 items-center sm:justify-between justify-around sm:text-3xl text-xl ml-10">
                  <h3>{article.titre}</h3>
                  <h3>{article.prix_vente}€</h3>

                  {vendeur && <h3>Vendu par {vendeur.login}</h3>}
                </div>
              </div>
              <div class="actions flex sm:flex-col flex-row sm:text-xl text-sm gap-4 font-chivo sm:p-0 p-2">
                {article.statut !== "Livrée" && (
                  <>
                    <button
                      class="bg-amber-50 text-zinc-800 px-2 py-1 rounded-xl hover:bg-amber-100"
                      onClick={() => setIsOpen(true)}
                    >
                      Confirmer réception
                    </button>
                    <Modal
                      open={isOpen}
                      onClose={() => setIsOpen(false)}
                      onConfirm={handleConfirm}
                    >
                      Vous êtes sur le point de confirmer la réception de cet
                      article :{" "}
                      <p className="font-bold">{article && article.titre}</p>{" "}
                      Voulez vous continuer ?
                    </Modal>
                  </>
                )}
                <button
                  class="bg-amber-50 text-zinc-800 opacity-30 px-2 py-1 rounded-xl hover:bg-amber-100"
                  disabled
                >
                  Faire une réclamation
                </button>
                <button
                  name="notation-vendeur"
                  class="bg-amber-50 text-zinc-800 px-2 opacity-30 py-1 rounded-xl hover:bg-amber-100"
                  disabled
                >
                  Noter le vendeur
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {article && (
            <div class="histo1 my-10 text-zinc-800 rounded-xl w-full font-outfit">
              <div class="infos-livraison border-2 border-zinc-800 text-xl flex sm:flex-row flex-col justify-between pl-4 p-2 rounded-t-xl text-lg font-chivo text-start">
                {article.statut === "En cours" ? (
                  <h3 className="flex gap-1">Fini dans : {endDate && <Timer endDate={endDate} />}</h3>
                ) : (
                  <h3>
                    Vendu le : {moment(article.expires).format("YYYY-MM-DD")}
                  </h3>
                )}

                {article.statut !== "En cours" ? (
                  <h3>
                    Livrée le :{" "}
                    {article.dateLivraison != null
                      ? moment(article.dateLivraison).format("YYYY-MM-DD")
                      : "En cours de livraison"}
                  </h3>
                ) : null}

                <h3>Statut : {article.statut}</h3>
              </div>

              <div class="details-commande bg-zinc-800 flex sm:flex-row flex-col text-3xl justify-between sm:p-5 pt-5 items-center sm:gap-0 gap-8 rounded-b-xl text-amber-50">
                <img
                  class="h-28 rounded-full sm:ml-10"
                  src={image && image}
                  alt="cardigan-coloré"
                />

                <div class="details flex sm:flex-row flex-col sm:gap-8 gap-0 items-center sm:justify-between justify-around sm:text-3xl text-xl w-full sm:ml-10 ml-0">
                  <h3 className="w-1/3 text-center">{article.titre}</h3>
                  <h3 className="w-1/3 text-center">
                    {article.statut === "En cours" && offreActuelle
                      ? offreActuelle.montant
                      : article.prix_vente}
                    €
                  </h3>
                  {gagnant &&
                  (article.statut === "Finie") |
                    (article.statut === "En attente de livraison") |
                    (article.statut === "Livrée") ? (
                    <>
                      <h3 className="w-1/3 text-center">
                        Vendu à {gagnant.login}{" "}
                      </h3>
                    </>
                  ) : (
                    <>
                      <h3>En vente</h3>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default HistoriqueElement;
