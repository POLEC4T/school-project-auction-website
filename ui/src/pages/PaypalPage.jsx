import React from "react";
import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import AuthService from "../services/AuthService";
import Modal from "../components/Modal";
import { getUserById } from "../services/UserService";
import { updateSolde } from "../services/UserService";
import { Link, useRouteLoaderData } from 'react-router-dom';

function PaypalPage() {
  
  const [montant, setMontant] = useState(null);
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState(null);

  const imgPaypal = require("../static/images/logo-paypal.png");

  /* ACCES AUX DONNEES DU USER */

  useEffect(() => {
    if (user) {
      getUserById(user.id)
        .then((response) => {
          console.log(response);
          setUserData(response);         
        })
        .catch((error) => console.log(error));
    }
  }, [user]);

  /* CHANGEMENT DU MONTANT */

  const onChangeMontant = (e) => {
    const montant = e.target.value;
    setMontant(montant);
  };

  /* CONFIRMATION DU MONTANT ET AJOUT EN BASE DE DONNEES */

  const handleConfirm = (e) =>{
  
    const nouveauSolde = parseInt(userData.solde) + parseInt(montant);

    updateSolde(user.id, nouveauSolde);

    console.log(userData.solde);

    setIsOpen(false);

    window.location.reload();

  }

  /* RECUPERATION DE L'USER */

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setUser(user);
    } else {
      console.error("User non trouvé");
    }
  }, []);

  return (
    <div>
      <NavBar></NavBar>
      <section class="main-container font-outfit h-screen bg-zinc-800 bg-hero bg-center bg-100 overflow-hidden">
        <div class="w-full h-full flex justify-center items-center text-zinc-800">
          <div class="etape bg-white w-[600px] h-[500px] translate-y-[-40px] rounded-xl flex flex-col justify-between">
            <div class="haut flex flex-col items-center pt-5 px-5">
              <h2 class="opacity-100 font-gowun text-4xl">
                Recharger votre compte
              </h2>
              <p className="text-center text-sm mt-2">
                Pour pouvoir enchérir sur le site cloth2you, vous devez mettre à
                jour votre solde. Ceci est prévu pour assurer la sécurité des
                acheteurs et des vendeurs, pour ne pas permettre des enchères
                au-dessus de ses moyens.
              </p>

              <div class="ligne w-full flex flex-row overflow-hidden mt-10">
                <img
                  class="w-1/4"
                  src={require("../static/images/ligne-1.png")}
                  alt=""
                />
                <img
                  class="w-1/4"
                  src={require("../static/images/ligne-2.png")}
                  alt=""
                />
                <img
                  class="w-1/4"
                  src={require("../static/images/ligne-1.png")}
                  alt=""
                />
                <img
                  class="w-1/4"
                  src={require("../static/images/ligne-2.png")}
                  alt=""
                />
              </div>

              <div className="montant w-full mt-5">
                <p className="text-lg">Montant : </p>
                <input
                  type="text"
                  placeholder="exemple : 60€"
                  class="placeholder-zinc-400 text-xl mt-1 h-10 w-full rounded-xl border-2 border-zinc-800  focus:outline-none pl-2"
                  value={montant}
                  onChange={(e) => onChangeMontant(e)}
                />
              </div>

              <div className="choix w-full mt-5">
                <p className="text-lg">Choisir une méthode de paiement : </p>
                <div className="moyens flex gap-2 mt-4">
                  <button
                    type="button"
                    className="carte flex flex-col items-center mt-5 w-1/3 text-xl opacity-30"
                    disabled
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-12 h-12"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                      />
                    </svg>
                    Carte de crédit
                  </button>

                  <button
                    type="button"
                    className="paypal flex flex-col bg-amber-400 hover:bg-amber-300 items-center mt-5 w-1/3 text-xl rounded-xl"
                    disabled={montant === null}
                    onClick={() => setIsOpen(true)}
                  >
                    <img
                      src={imgPaypal}
                      alt="paypal"
                      className="h-14 w-14 m-auto"
                    />
                  </button>

                  {user&&

                  <Modal open={isOpen} onClose={() => setIsOpen(false)} onConfirm={handleConfirm}>
                    
                      Vous êtes sur le point de recharger votre compte {user.login}.<br />
                       <span className="mt-10 font-bold">Montant : {montant}€</span>
                    
                  </Modal>

                  }

                  <button
                    type="button"
                    className="plus flex flex-col items-center mt-5 w-1/3 text-xl opacity-30"
                    disabled
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-12 h-12"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                    Autre méthode
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PaypalPage;
