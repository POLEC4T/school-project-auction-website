import React from 'react';
import { useState, useEffect } from 'react';
import { getArticle } from '../services/ArticleService';
import { getArticleImagesByArticleId } from '../services/ImageService';
import { getDerniereOffre } from '../services/EnchereService';
import moment from 'moment';
import Timer from './Timer';
import {Link} from 'react-router-dom';


function ArticleCompact({article}){

    const [image, setImage] = useState(null);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [offreActuelle, setOffreActuelle] = useState(null);
    const [error, setError] = useState(null);
    const [endDate, setEndDate] = useState(null);


    
     useEffect(() => {
        if (article) {
          getArticleImagesByArticleId(article.id).then((images) => {
            if(images && images.length > 0) {
            
              setImage(images[0].url);
              setImagesLoaded(true);
            }
          });
        }
      }, [article]);


      useEffect(() => {
        if (article) {
          getDerniereOffre(article.id)
            .then((enchere) => {
                enchere.message ? setOffreActuelle({montant: article.prix_depart}) : setOffreActuelle(enchere);
            });
        }
      }, [article]);

    useEffect(() => {
      if (article) {
        setEndDate(moment(article.expires));          
      }
    }, [article])



    
    

    return (
        <Link to={`/article/${article.id}`} className="article flex flex-col sm:h-102 h-64 sm:w-80 w-42 bg-white rounded-xl sm:mt-0 mt-5">

        {imagesLoaded&&

        <div className="image w-full h-full bg-cover bg-no-repeat bg-center bg-inverse rounded-t flex items-center justify-center" style={{backgroundImage: `url(${image})`}}>
          <p className="font-outfit text-2xl">{article.titre}</p>
        </div>

        }

        <div className="caracteristiques flex justify-between p-2" >
            <div className="offre flex-col justify-items-start">
                <p className="font-chivo text-zinc-400 sm:text-lg text-xs">Offre Actuelle</p>

                {offreActuelle&&
                <p className="font-gowun sm:text-2xl text-md">{offreActuelle.montant}€</p>
                }
            </div>
            <div className="temps_restant flex flex-col justify-items-end text-end">
                <p className="font-chivo text-zinc-400 sm:text-lg text-xs">Finit dans</p>
                <p className="font-gowun sm:text-2xl text-md">{endDate&& <Timer endDate={endDate}/>}</p>
            </div>
        </div>
    </Link> 
    );
}

export default ArticleCompact;