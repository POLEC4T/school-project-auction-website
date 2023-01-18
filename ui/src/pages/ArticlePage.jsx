import React from 'react';
import Encherir from '../components/Encherir';
import { useState, useEffect } from 'react';
import { getArticle, getNbLikeArticle } from '../services/ArticleService'
import { getUserById } from '../services/UserService'
import { getArticleImagesByArticleId } from '../services/ImageService';
import ImageCarousel from '../components/ImageCarousel';
import NavBar from '../components/NavBar'
import NotFoundErrorPage from './NotFoundErrorPage';
import { useParams } from 'react-router-dom';

function PageArticle() {

  const [article, setArticle] = useState(null);
  const [vendeur, setVendeur] = useState(null);
  const [images, setImages] = useState(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [nbLikesConst, setNbLikesConst] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const idPassed = useParams().id;



  useEffect(() => {
    getArticle(idPassed).then((response) => {
      if (response.message) {
        setError(response.message);
        setIsLoading(false);
      } else {
        setArticle(response);
        setIsLoading(false);
      }
    })
    .catch(() => {
      setError('Error connecting to server. Please try again later.');
    });
  }, [idPassed]);

  useEffect(() => {
    if (article) {
      getArticleImagesByArticleId(article.id).then((images) => {
        setImages(images.map(image => ({image: image.url, caption: ""})));
        setImagesLoaded(true);
      });
    }
  }, [article]);

  useEffect(() => {
    if (article) {
      getUserById(article.vendeurId).then((vendeur) => {
        setVendeur(vendeur);
        
      });
    }
  }, [article]);
  
  return (
    <div className="bg-zinc-100 h-screen">
        {isLoading ? (
          <div className="text-center">Loading...</div>
        ) : (
          error ? (
            <NotFoundErrorPage />
          ) : (
            <>
              <NavBar/>
              <main className='contenu sm:mt-16 mt-0 flex flex-row flex-wrap font-outfit w-screen'>
                <section className="gauche sm:w-1/2 w-full flex justify-center mt-10 mb-10">
                  {imagesLoaded && <ImageCarousel images={images}/>}
                </section>
                {article && vendeur && <Encherir article={article} vendeur={vendeur}/>}
              </main>
            </>
          )
        )}
    </div>
  );
}

export default PageArticle;