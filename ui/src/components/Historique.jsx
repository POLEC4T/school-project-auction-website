import React from "react";
import { useState, useEffect } from "react";
import { getArticlesWonbyUserId } from "../services/UserService";
import { getArticle } from "../services/ArticleService";
import HistoriqueElement from "./HistoriqueElement";

function Historique({user}){  
    
    const [image, setImage] = useState(null);
    const [enchereGagnees, setEnchereGagnees] = useState([]);
    const [article, setArticle] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        getArticle(1).then((response) => {
          if (response.message) {
            setError(response.message);
          } else {
            setArticle(response);
          }
        })
        .catch(() => {
          setError('Error connecting to server. Please try again later.');
        });
      }, []);

    useEffect(() => {
        if (article) {
            getArticlesWonbyUserId(user.id).then((response) => {
                if (!response) {
                    setError(response.message);
                } else {
                    setEnchereGagnees(response);
                }
            })
            .catch(() => {
                setError('Error connecting to server. Please try again later.');
            });
        }
    }, [article]);

    const historiqueElements = enchereGagnees.map((article) => {
        return <HistoriqueElement article={article} key={article.id} />;
    });

    return (
        <>
            {user && user.roleId === 1 ? (

            <>


            
                
            </>
            ) : (

            <>

            <section class="historique pt-10 sm:text-start text-center sm:px-28 px-4 font-outfit"> 
                <h2 class="text-4xl">Vos enchères gagnées</h2>

                {historiqueElements}

            </section>
                
            </>
            
            
            )}
        </>
        );

    
}

export default Historique;