import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import moment from 'moment';
import Timer from '../components/Timer';
import {Link} from 'react-router-dom';

import NavBar from '../components/NavBar'
import ArticleCompact from '../components/ArticleCompact';
import Footer from '../components/Footer';
import { getArticlesWithLeastTimeLeft } from '../services/AccueilService';
import { getArticleImagesByArticleId } from '../services/ImageService';

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
    const [imagesSelection, setImagesSelection] = useState([]);

    useEffect(() => {
        if (topArticles && topArticles.length > 0) {
            for (let i = 0; i < 2; i++) {
            getArticleImagesByArticleId(topArticles[i].id).then((images) => {
                setImagesSelection((prevImages) => [...prevImages, images[0].url])
            });
        }
        setImagesSelection(imagesSelection);
        }
      }, [topArticles]); 


    useEffect(() => {
        getArticlesWithLeastTimeLeft().then((response) => {
          if (response.message === 'Aucun article trouvé') {
            setError(response.message);
            setIsLoading(false);
          } else {
            setTopArticles(response);
            console.log(topArticles[0])
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
            <div className="flex flex-row justify-around sm:gap-2 gap-0 sm:flex-no-wrap flex-wrap" key={i}>
            {Array.from({ length: chunkSize }, (_, j) => {
                const index = start + j;
                if (index < numArticles && topArticles && topArticles[index]) {
                    return <ArticleCompact key={index} article={topArticles[index]} />
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

                           
                <div className="ligne w-full h-5 sm:mt-8 mt-2 flex flex-row items-center font-gowun">
                    <div className="h-0.5 bg-zinc-800 w-1/12"></div>  
                    <p className="px-2 sm:text-2xl text-sm">Tendances</p>         
                    <div className="h-0.5 bg-zinc-800 w-full"></div>  
                </div>  


                <div className="tendances articles-container flex flex-col sm:mt-8 mt-0 gap-8"> 


                    {chunks}                


                     
                </div>

                <div className="button-afficher-plus w-full flex justify-center sm:mt-10 mt-5" >
                    {topArticles&&
                        <button className="fleche bg-zinc-800 rounded-full w-36 text-white flex items-center font-outfit justify-around p-2 hover:bg-zinc-600" onClick={handleClick} disabled={numArticles >= topArticles.length}>
                        
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
                    }           
                </div>
               
                
                <div className="vs flex sm:flex-row flex-col w-full mt-10 sm:gap-5 gap-0">

                    <div className="selection sm:w-1/2 w-full flex flex-col bg-zinc-600 items-center sm:rounded-xl rounded-none px-10 justify-between text-white">
                        <h2 className='font-square sm:text-6xl text-4xl mt-2'>Notre sélection</h2>
                        <p className='font-outfit text-center sm:text-xl text-md'>Notre sélection de vêtements faits-mains vous offre la possibilité de découvrir des pièces uniques et élégantes, créées par des artisans talentueux.</p>
                        <button  className="w-1/2 h-auto sm:mt-0 mt-3 ease-in duration-500 hover:w-4/6"><img src={imgShop} alt="image-shop"/></button>
                    </div>

                    {topArticles&&

                    <div className="sm:flex hidden fin_proche sm:flex-col flex-row sm:gap-5 gap-0 text-white sm:w-1/2 w-full">

                        <section className="top w-full font-outfit sm:h-60 h-30  rounded-xl bg-black bg-center bg-no-repeat bg-100" style={{backgroundImage: `url(${imagesSelection[1]})`}}>
                            <div className="details-selection flex flex-col justify-center items-center p-2 w-full h-full rounded-xl backdrop-blur-sm hover:backdrop-blur-none ease-in-out duration-300">
                                <p className="font-chivo text-3xl"><Timer endDate={moment(topArticles[0].createdAt).add(7, 'days')} /></p>
                                <p className="mt-5 text-2xl text-center">{topArticles[0].titre}</p>
                                <Link to={`/article/${topArticles[0].id}`} className="bg-amber-50 hover:bg-amber-100 text-zinc-800 py-1 px-2 rounded-lg mt-5 text-xl mb-0">Details</Link>
                            </div>
                        </section> 

                        <section className="top w-full font-outfit sm:h-60 h-30  rounded-xl bg-black bg-center bg-no-repeat bg-100" style={{backgroundImage: `url(${imagesSelection[0]})`}}>
                            <div className="details-selection flex flex-col justify-center items-center p-2 w-full h-full rounded-xl backdrop-blur-sm hover:backdrop-blur-none ease-in-out duration-300">
                                <p className="font-chivo text-3xl"><Timer endDate={moment(topArticles[1].createdAt).add(7, 'days')} /></p>
                                <p className="mt-5 text-2xl text-center">{topArticles[1].titre}</p>
                                <Link to={`/article/${topArticles[1].id}`} className="bg-amber-50 hover:bg-amber-100 text-zinc-800 py-1 px-2 rounded-lg mt-5 text-xl mb-0">Details</Link>
                            </div>
                        </section> 
                    </div>
                    }

                        
                    
                </div>
                
                <div className="ligne w-full h-5 sm:mt-8 mt-5 flex flex-row items-center font-gowun">
                    <div className="h-0.5 bg-zinc-800 w-1/12"></div>  
                    <p className="px-2 sm:text-2xl text-sm">Catégories</p>         
                    <div className="h-0.5 bg-zinc-800 w-full"></div>  
                </div>

                <div className="categories className bg-half flex flex-row flex-wrap justify-around text-zinc-800 sm:mt-10 sm:my-5 my-5 sm:text-3xl text-xl">

                    <div className="t_shirt sm:w-80 w-40 z-10">
                        <img className="rounded-full drop-shadow-lg" src={imgTshirt} alt="image_t-shirt" />
                        <h1 className="text-center sm:mt-2 mt-1 font-gowun sm:text-zinc-800 text-amber-50">T-shirt</h1>
                    </div>

                    <div className="pull sm:w-80 w-40 z-10">
                        <img className="rounded-full drop-shadow-lg" src={imgPull} alt="image_pull" />
                        <h1 className="text-center sm:mt-2 mt-1 font-gowun sm:text-zinc-800 text-amber-50">Pull</h1>
                    </div>

                    <div className="short sm:w-80 w-40 z-10 sm:mt-0 mt-3">
                        <img className="rounded-full drop-shadow-lg" src={imgShort} alt="image_short_et_jupe" />
                        <h1 className="text-center sm:mt-2 mt-1 font-gowun">Short</h1>
                    </div>

                    <div className="pantalon sm:w-80 w-40 z-10 sm:mt-0 mt-3">
                        <img className="rounded-full drop-shadow-lg" src={imgPantalon} alt="image_pantalon" />
                        <h1 className="text-center sm:mt-2 mt-1 font-gowun">Pantalon</h1>
                    </div>
                    
                </div>
            </main>
            <Footer />
        </div>

    );
}

export default AccueilPage;