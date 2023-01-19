import React from 'react';
import { Link } from 'react-router-dom';

function FilAriane({page}) {



    return (
        <div>
            <span class="fil_ariane font-outfit opacity-30 text-2xl sm:block hidden">
                <Link to='/' class="text-zinc-600" href="">Accueil {'>'} </Link>
                <Link to='/categories' class="text-zinc-600" href="">Hauts {'>'} </Link>
                <Link to='/'>Page</Link> 
            </span>
        </div>
    )
}

export default FilAriane;