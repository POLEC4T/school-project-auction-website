import React from 'react';
import Encherir from '../components/Encherir';
import { useState, useEffect } from 'react';
import { getArticle } from '../services/ArticleService'

function PageArticle() {

  const [prix, setPrix] = useState();

  useEffect(() => {
    getArticle(1).then((article) => {
      console.log("react");
      setPrix(article.prix_depart);
      
    });
  }, []);
  
  
  return (
    <div>
        <main className='contenu sm:px-20 pt-5 flex flex-row flex-wrap font-outfit'>
            <section className="gauche w-1/2 bg-gray-100">

            </section>
            <Encherir prix={prix}/>
        </main>
    </div>
  );
}

export default PageArticle;