import React from 'react';
import { useState, useEffect } from 'react';
import { getArticle } from '../services/ArticleService';
import { getArticleImagesByArticleId } from '../services/ImageService';
import { getDerniereOffre } from '../services/EnchereService';
import moment from 'moment';
import Timer from './Timer';


function ArticleCompact(){
    
    const [article, setArticle] = useState(null);
    const [image, setImage] = useState(null);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [offreActuelle, setOffreActuelle] = useState(null);
    const [error, setError] = useState(null);
    const [endDate, setEndDate] = useState(null);

    useEffect(() => {
        getArticle(1).then((response) => {
          if (response.message === 'Article non trouvé') {
            setError(response.message);
            setIsLoading(false);
          } else {
            setArticle(response);
            setIsLoading(false);
            setEndDate(moment(article.createdAt).add(7, 'days'));
          }
        })
        .catch(() => {
          setError('Error connecting to server. Please try again later.');
        });
      }, []);


      useEffect(() => {
        if (article) {
          getArticleImagesByArticleId(article.id).then((images) => {
            setImage(images[0].url);
            setImagesLoaded(true);
          });
        }
      }, [article]);


    useEffect(() => {
        if (article) {
            getDerniereOffre(article.id).then((enchere) => {
                setOffreActuelle(enchere);
            })
        }
    }, [article])

    
    

    return (
        <div class="article flex flex-col sm:h-102 h-80 sm:w-80 w-36 bg-white rounded-xl">

        {imagesLoaded&&

        <div className="image w-full h-full bg-cover bg-no-repeat bg-center bg-article rounded-t flex items-center justify-center" style={{backgroundImage: `url(${image})`}}>
          <p className="font-outfit text-2xl">{article.titre}</p>
        </div>

        }

        <div class="caracteristiques flex justify-between p-2" >
            <div class="offre flex-col justify-items-start">
                <p class="font-chivo text-zinc-600 sm:text-xl text-sm">Offre Actuelle</p>

                {offreActuelle&&
                <p class="font-gowun text-lg">{offreActuelle.montant}€</p>
                }
            </div>
            <div class="temps_restant flex flex-col justify-items-end text-md text-end">
                <p class="font-chivo text-zinc-600 sm:text-xl text-sm">Finit dans</p>
                <p class="font-gowun text-lg">{endDate&& <Timer endDate={endDate}/>}</p>
            </div>
        </div>
    </div> 
    );
}

export default ArticleCompact;