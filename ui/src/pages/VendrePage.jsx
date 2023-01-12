import React from "react";
import { getVendre } from "../services/UserService";
import { useEffect,useState } from "react";
import { Link } from 'react-router-dom';
import NavBar from "../components/NavBar";

function VendrePage() {

    //usestates
    const [data, setData] = useState([]);
    const [vendeur, setVendeur] = useState([]);

    useEffect(() => {
        getVendre().then((response) => {
            setVendeur(true);
            setData(response.data);
        })
        .catch((error) => {
            setData({ message: error.response.data.message});
            setVendeur(false);
        });
    }, [])
    if (vendeur) {
        return (
            <>
                <NavBar/>
                <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
                    <h1 className="text-2xl font-semibold md:text-3xl">Page de vente</h1>
                    <p className="mt-4 mb-8 dark:text-black font-semibold">{data.message}</p>
                </div>
            </>
        );
    }else{
        return (
            <>
                <NavBar/>
                <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
                    <h1 className="text-2xl font-semibold md:text-3xl">Accès refusé</h1>
                    <p className="mt-4 mb-8 dark:text-black font-semibold">Vous devez être connecté avec un compte vendeur pour accéder à cette page</p>
                    <Link to="/" className="px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-gray-900">Back to homepage</Link>
                </div>
            </>
        );
    }

}

export default VendrePage;