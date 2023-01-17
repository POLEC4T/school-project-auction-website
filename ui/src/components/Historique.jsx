import React from "react";
import { useState, useEffect } from "react";
import { getArticle } from "../services/ArticleService";

function Historique({user}){  
    
    const [image, setImage] = useState(null);
    const [enchereGagnees, setEnchereGagnees] = useState([]);

    return (
        <>
            {user && user.roleId === 2 ? (
            <>
            <section class="historique pt-10 sm:text-start text-center sm:px-28 px-4"> 
                <h2 class="text-4xl">Vos enchères gagnées</h2>
                    <div class="histo1 mt-10 text-black rounded-xl w-full">
                        <div class="infos-livraison border-2 text-xl flex sm:flex-row flex-col justify-between pl-4 p-2 rounded-t-xl text-lg font-chivo text-start">
                            <h3>Gagnée le : 12/12/12</h3>
                            <h3>Livrée le : 12/12/12</h3>
                            <h3>Livrée à : 12 route de ta grand-mère 38500, TAMERE</h3>
                            <h3>Statut : (Fini, en cours, en cours de réclamation)</h3>
                        </div>
                        <div class="details-commande bg-gray-100 flex sm:flex-row flex-col text-2xl justify-between sm:p-5 pt-5 items-center sm:gap-0 gap-8 rounded-b-xl">
                            <div class="gestion-small flex sm:mt-0 mt-5">
                                <img class="h-28 rounded-full sm:ml-10 ml-0" src="./cardigan-fleur-2.jpg" alt="cardigan-coloré"/>
                                <div class="details sm:text-xl text-lg flex sm:flex-row flex-col sm:gap-8 gap-0 items-center sm:justify-between justify-around sm:text-3xl text-xl ml-10">
                                    <h3>Cardigan coloré façonné par les titans</h3>
                                    <h3>300.00€</h3>
                                    <h3>Vendu par Vendeur</h3>
                                </div>
                            </div>
                            <div class="actions flex sm:flex-col flex-row sm:text-xl text-sm gap-4 font-chivo sm:p-0 p-2">
                                <button class="bg-zinc-200 text-black px-2 py-1 rounded-xl hover:bg-zinc-100">Confirmer réception</button>
                                <button class="bg-zinc-200 text-black px-2 py-1 rounded-xl hover:bg-zinc-100">Faire une réclamation</button>
                                <button name="notation-vendeur" class="bg-zinc-200 text-black px-2 py-1 rounded-xl hover:bg-zinc-100">Noter le vendeur</button>
                            </div>
                        </div>
                    </div>
            </section>
                
            </>
            ) : (

            <>
                
            </>
            
            
            )}
        </>
        );

    
}

export default Historique;