import React, { useState, useEffect } from 'react'
import { getLikedArticles } from '../services/ArticleService'
import ArticleCompact from './ArticleCompact'

function Favoris({ user }) {
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        getLikedArticles().then((articles) => {
            console.log(articles);
            setArticles(articles)
            setIsLoading(false)
        })
    }, [user])

    

    return (
        <>
            {isLoading ? (
                <p>Chargement...</p>
            ) : (
                
                <section className="flex flex-wrap justify-center font-outfit flex-col px-16 pt-10">
                    <h2 className="text-4xl">Vos favoris</h2>
                        <div className='flex flex-row gap-12 mt-10'>
                            {articles.map((article) => (
                                <ArticleCompact article={article} />
                            ))}
                        </div>
                </section>
            )}
        </>
    )
}

export default Favoris
