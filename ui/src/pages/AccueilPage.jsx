import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';

import NavBar from '../components/NavBar'
import ArticleCompact from '../components/ArticleCompact';
import Footer from '../components/Footer';
import { getArticlesWithLeastTimeLeft } from '../services/AccueilService';

function AccueilPage() {

    const imgShort = require("../static/images/image_short_et_jupe.webp");
    const imgPull = require("../static/images/image_pull.webp");
    const imgTshirt = require("../static/images/image_t_shirt.webp");
    const imgPantalon = require("../static/images/image_pantalon.webp");
    const imgShop = require("../static/images/shop.png");

    const [numArticles, setNumArticles] = useState(4);
    const [isExpanded, setIsExpanded] = useState(false);
    const [buttonState, setButtonState] = useState("Afficher plus");
    const [topArticles, setTopArticles] = useState(null); 
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getArticlesWithLeastTimeLeft().then((response) => {
          if (response.message === 'Aucun article trouvé') {
            setError(response.message);
            setIsLoading(false);
          } else {
            setTopArticles(response);
            setIsLoading(false);
          }
        })
        .catch(() => {
          setError('Error connecting to server. Please try again later.');
        });
      }, []);


    function handleClick() {
        if (buttonState === "Afficher plus") {
            setNumArticles(numArticles + 4);
            setButtonState("Afficher tout");
        } else if (buttonState === "Afficher tout") {
            setNumArticles(numArticles + 16);
            setButtonState("Afficher moins");
        } else {
            setNumArticles(4);
            setButtonState("Afficher plus");
        }
    }

    const chunkSize = 4;
    const chunks = Array.from({ length: Math.ceil(numArticles / chunkSize) }, (_, i) => {
    const start = i * chunkSize;
    return (
        <div className="flex flex-row justify-around gap-2 mt-2" key={i}>
        {Array.from({ length: chunkSize }, (_, j) => {
            const index = start + j;
            if (index < numArticles) {
            return <ArticleCompact key={index} />
            }
            return null;
        })}
        </div>
    );
    });


    return (

        <div>
        <NavBar />

        <div className="test absolute h-96 bg-zinx-80">

        </div>
        <main className="main-container bg-zinc-50 flex flex-col sm:p-5 p-0"> 

                <section className="top sm:h-60 h-30 relative flex flex-col justify-center items-center sm:rounded-xl rounded-none bg-intro bg-center bg-no-repeat bg-100 w-full">
                    <h1 className="font-gowun sm:text-5xl text-3xl text-amber-50 font-square sm:mt-0 mt-5">Développer la mode, une enchère à la fois</h1>
                    <NavLink to="/vendre"><button className="bg-amber-50 hover:bg-amber-100 text-zinc-800 py-1 px-2 rounded-lg mt-5 sm:text-xl text-sm sm:mb-0 mb-5 font-outfit">Mettre aux enchères</button></NavLink>
                </section> 
                
                <div className="ligne w-full h-5 mt-8 flex flex-row items-center font-gowun">
                    <div className="h-0.5 bg-zinc-800 w-1/12"></div>  
                    <p className="px-2 sm:text-2xl text-sm">Tendances</p>         
                    <div className="h-0.5 bg-zinc-800 w-full"></div>  
                </div>

                <div className="tendances articles-container flex flex-col mt-8 gap-8">         
                    {chunks}   
                </div>

                <div className="button-afficher-plus w-full flex justify-center mt-10">
                    <button className="fleche bg-zinc-800 rounded-full w-36 text-white flex items-center font-outfit justify-around p-2 hover:bg-zinc-600" onClick={handleClick}>

                        {buttonState === "Afficher moins" ? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="white" class="w-6 h-6 rotate-180">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="white" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                        )}

                        {buttonState}
                    </button>
                </div>
               
                
                <div className="vs flex w-full mt-10 gap-5">

                    <div className="selection w-1/2 flex flex-col bg-zinc-600 items-center rounded-xl px-10 justify-between text-white">
                        <h2 className='font-square text-6xl mt-2'>Notre sélection</h2>
                        <p className='font-outfit text-center text-xl'>Notre sélection de vêtements faits-mains vous offre la possibilité de découvrir des pièces uniques et élégantes, créées par des artisans talentueux.</p>
                        <img src={imgShop} alt="image-shop" className="w-2/3 h-auto" />
                    </div>

                    <div className="fin_proche flex flex-col sm:gap-5 gap-0.5 text-white w-1/2">
                        <section className="top font-outfit p-2 sm:h-60 h-30 relative flex flex-col justify-center items-center sm:rounded-xl rounded-none bg-black bg-center bg-no-repeat bg-100">
                            <p className="font-chivo sm:text-3xl text-xl">06h : 12m : 36s</p>
                            <p className="mt-5 sm:text-2xl text-lg text-center">titre de l'article (cardigan rouge)</p>
                            <button className="bg-amber-50 hover:bg-amber-100 text-zinc-800 py-1 px-2 rounded-lg mt-5 sm:text-xl text-sm sm:mb-0 mb-5">Details</button>
                        </section> 

                        <section className="top font-outfit p-2 sm:h-60 h-30 relative flex flex-col justify-center items-center sm:rounded-xl rounded-none bg-black bg-center bg-no-repeat bg-100">
                            <p className="font-chivo sm:text-3xl text-xl">06h : 12m : 36s</p>
                            <p className="mt-5 sm:text-2xl text-lg text-center ">titre de l'article (cardigan bleu)</p>
                            <button className="bg-amber-50 hover:bg-amber-100 text-zinc-800 py-1 px-2 rounded-lg mt-5 sm:text-xl text-sm sm:mb-0 mb-5">Details</button>
                        </section> 
                    </div>
                </div>
                
                <div className="ligne w-full h-5 mt-8 flex flex-row items-center font-gowun">
                    <div className="h-0.5 bg-zinc-800 w-1/12"></div>  
                    <p className="px-2 sm:text-2xl text-sm">Catégories</p>         
                    <div className="h-0.5 bg-zinc-800 w-full"></div>  
                </div>

                <div className="categories className bg-half flex flex-row flex-wrap justify-around sm:mt-10 mt-2 h-96 sm:text-3xl text-xl">

                    <div className="t_shirt sm:w-80 w-32 z-10">
                        <img className="rounded-full drop-shadow-lg" src={imgTshirt} alt="image_t-shirt" />
                        <h1 className="text-center mt-2 font-gowun">T-shirt</h1>
                    </div>

                    <div className="t_shirt sm:w-80 w-32 z-10">
                        <img className="rounded-full drop-shadow-lg" src={imgPull} alt="image_pull" />
                        <h1 className="text-center mt-2 font-gowun">Pull</h1>
                    </div>

                    <div className="t_shirt sm:w-80 w-32 z-10">
                        <img className="rounded-full drop-shadow-lg" src={imgShort} alt="image_short_et_jupe" />
                        <h1 className="text-center mt-2 font-gowun">Short</h1>
                    </div>

                    <div className="t_shirt sm:w-80 w-32 z-10">
                        <img className="rounded-full drop-shadow-lg" src={imgPantalon} alt="image_pantalon" />
                        <h1 className="text-center mt-2 font-gowun">Pantalon</h1>
                    </div>
                    
                </div>
            </main>
            <Footer />
        </div>

    );
}

export default AccueilPage;