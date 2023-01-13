import React from 'react';
import { getDerniereOffre } from '../services/EnchereService';
import { useState, useEffect } from 'react';
import moment from 'moment';
import Timer from './Timer';

function Encherir({ article, vendeur, nbLikes }) {

    const pfpImageExample = require('../static/images/pfp-image-example.jpeg');
    
    const [offreActuelle, setOffreActuelle] = useState(0.00);
    useEffect(() => {
        getDerniereOffre(article.id).then((enchere) => {
            setOffreActuelle(enchere);
        })
    }, [article])
    

    const placeholderPrixForm = `${offreActuelle.montant + offreActuelle.montant*0.1}€ ou plus`;
    const propositionPrix1 = offreActuelle.montant + offreActuelle.montant*0.1;
    const propositionPrix2 = offreActuelle.montant + offreActuelle.montant*0.5;
    const propositionPrix3 = offreActuelle.montant + offreActuelle.montant;
    const heroPrixActuel = parseFloat(offreActuelle.montant);
    const endDate = moment(article.createdAt).add(7, 'days');
    

    const articleTags = {"col": article.couleurs.split(","), "mat": article.materiaux.split(","), "taille": article.taille};

    return (

    
        <div className='sm:w-1/2 w-full'>
            <section className="droite flex flex-col items-center">

                <div className="chrono bg-gray-400 sm:w-2/6 w-full justify-center sm:rounded-t flex h-10 items-center min-w-fit ">
                    <span className="flex flex-row justify-center p-2 md:text-2xl text-xl">
                        <Timer endDate={endDate}/>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="h-8 w-8 ml-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </span>
                </div>

                <div className="informations bg-gray-100 sm:w-5/6 w-full p-4 sm:px-9 px-4 sm:rounded-xl rounded-b-xl shadow-base shadow-gray-300">

                        <div className="top flex justify-between items-start">
                            <div className="prix flex flex-col">
                                <p className="font-chivo text-gray-500 text-lg">Offre actuelle</p>
                                <p className="text-6xl">{heroPrixActuel}€</p>
                                <p className="text-gray-500 text-lg">Avec prix de réserve</p>
                            </div>    
                            
                            <button className="bouton-jaime flex items-center gap-1 bg-white px-2 rounded">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                </svg>
                                <p className="font-gowun">{article.nb_likes}</p>
                            </button>
                        </div>  

                        <div className="profil mt-6 flex flex-row items-center">
                            <img className="w-20 h-20 rounded-full" src={pfpImageExample} alt="photo-profil"/>
                            <div className="text-profil flex flex-row flex-wrap">
                                <p className="ml-5 sm:text-2xl text-lg">par {vendeur.login}</p>
                                <a className="flex items-center ml-5 text-gray-500 text-xl hover:text-gray-400" href="">
                                    <p className="text-2xl mr-2">+</p> Voir profil
                                </a>
                            </div>
                        </div>

                        <div className="zone-enchere flex flex-col pt-6">
                            <div className="enchere-preparee w-full flex gap-4">
                                <button className="bg-zinc-300 hover:bg-zinc-200 w-1/3 rounded-lg h-10 text-xl">{propositionPrix1}€</button>
                                <button className="bg-zinc-400 hover:bg-zinc-300 w-1/3 rounded-lg h-10 text-xl">{propositionPrix2}€</button>
                                <button className="bg-zinc-500 hover:bg-zinc-400 w-1/3 rounded-lg h-10 text-xl">{propositionPrix3}€</button>
                            </div>
                            <input className="mt-3 bg-zinc-200 rounded-lg h-12 px-4 focus:outline-none hover:bg-zinc-200 text-xl" type="text" placeholder={placeholderPrixForm}/>
                            <div className="enchere-ou-offre-maximale flex mt-3 gap-4">
                                <button className="bg-zinc-300 hover:bg-zinc-200 w-full rounded-lg h-10 text-xl">Enchérir</button>
                            </div>

                            <p className="description text-justify mt-6">{article.description}</p>
                            
                            <div className="mt-3 flex gap-2 flex-wrap">
                                <a className="bg-white px-2 rounded" href="">#{articleTags.taille}</a>
                                {articleTags.mat.map((materiau, i) => {
                                    return <a key={i} className="bg-white px-2 rounded" href="">#{materiau}</a>
                                })}
                                {articleTags.col.map((couleur, i) => {
                                    return <a key={i} className="bg-white px-2 rounded" href="">#{couleur}</a>
                                })}
                            </div>
                            
                        </div>
                    </div>

            </section>
        </div>
    )
}

export default Encherir;