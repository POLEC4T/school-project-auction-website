import React from "react";
import { getVendre } from "../services/UserService";
import { useEffect,useState } from "react";
import NavBar from "../components/NavBar";
import RefusedAccess from "../components/RefusedAccess";

function VendrePage() {

    //usestates
    const [data, setData] = useState([]);
    const [vendeur, setVendeur] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getVendre().then((response) => {
            setVendeur(true);
            setData(response.data);
            setIsLoading(false);
        })
        .catch((error) => {
            setData({ message: error.response.data.message});
            setVendeur(false);
            setIsLoading(false);
        });
    }, [])
    if(isLoading){
        return null;
    }
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
           <RefusedAccess message="Vous devez être vendeur pour accéder à cette page"/>
           </>
        );
    }

}

export default VendrePage;