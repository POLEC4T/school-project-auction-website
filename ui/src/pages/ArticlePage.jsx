import React from 'react';
import Encherir from '../components/Encherir';
import { useState, useEffect } from 'react';
import { getArticle } from '../services/ArticleService'
import { getUserById } from '../services/UserService'
import { getArticleImagesByArticleId } from '../services/ImageService';
import ImageGrid from '../components/ImageGrid';
import NavBar from '../components/NavBar'

function PageArticle() {

  const [article, setArticle] = useState(null);
  const [vendeur, setVendeur] = useState(null);
  const [images, setImages] = useState(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    getArticle(1).then((article) => {
      setArticle(article);
    });
  }, []);

  useEffect(() => {
    if (article) {
      getArticleImagesByArticleId(article.id).then((images) => {
        setImages(images);
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
    <div>
        <NavBar/>
        <main className='contenu sm:px-20 pt-5 flex flex-row flex-wrap font-outfit'>
            <section className="gauche w-1/2 bg-gray-100">
              {imagesLoaded && <ImageGrid images={images}/>}
            </section>
            {article && vendeur && <Encherir article={article} vendeur={vendeur}/>}
        </main>
    </div>
  );
}

export default PageArticle;