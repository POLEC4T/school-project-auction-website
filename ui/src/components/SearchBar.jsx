import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


function SearchBar() {

    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    function handleChangeSearch(value) {
        setSearchValue(value);
    }

    function handleSubmitSearch(e) {
        e.preventDefault();
        navigate({pathname: '/recherche', search: `recherche=${searchValue}`});
    }

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const search = params.get('recherche');
        if (search) {
            setSearchValue(search);
        }
    }, [location]);


    return (

        <div className="recherche bg-amber-50 w-1/2 h-1/2 rounded-xl flex items-center ease-in duration-100 sm:max-w-48">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6 mx-1"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>

            <form className="w-full flex" onSubmit={handleSubmitSearch}>
                <input
                    type="text"
                    placeholder="Rechercher"
                    className="w-full rounded-r-xl bg-amber-50 focus:outline-none placeholder-zinc-800"
                    value={searchValue}
                    onChange={e => handleChangeSearch(e.target.value)}
                />
                <button type="submit" className='mr-2 hover:text-zinc-800'>Rechercher</button>
            </form>
        </div>
    )
}


export default SearchBar;