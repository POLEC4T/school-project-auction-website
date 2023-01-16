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
    const [page, setPage] = useState(1);

    const handlePage1 = (data) => {
        
    }

    //useEffect
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
                <main class="main-container flex flex-row items-center justify-center font-outfit h-full w-screen bg-zinc-800 bg-hero bg-cover bg-100 overflow-hidden sm:px-48 px-0 py-24"> 
                
                <div class="etape bg-white w-full h-full rounded-xl flex flex-row justify-between translate-y-[-40px]">
        
                    <button class="back sm:px-5 px-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>                  
                    </button>
        
        
                    <div class="formulaire mt-5 flex flex-col items-center w-full">
                    <h2 class="font-gowun sm:text-4xl text-2xl">Mise aux enchères (3/3)</h2>

                    <div class="prix mt-12 w-5/6">

                        <h2 class="font-gowun text-xl font-bold">Prix de départ :</h2>
                        <input type="text" placeholder="exemple : 30€" class="placeholder-zinc-600 h-8 w-full rounded-xl border-2 border-zinc-800 focus:outline-none pl-2"/> 
                        <div class="sm:text-xs text-xs flex flex-row items-center mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="sm:h-6 h-16 mr-2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                            </svg>
                                                    
                            veillez à bien estimer votre produit, un prix de départ trop élevé peut parfois rendre le début de l'enchère compliqué
                        </div>


                        
                    </div>

                    <div class="choix_reserve w-5/6 mt-8 flex items-center">
                        <input type="checkbox" class="mr-2 accent-zinc-800"/>
                        Je souhaite fixer un prix de réserve
                    </div>

                    <div class="prix_reserve sm:mt-8 mt-12 w-5/6">

                        <h2 class="font-gowun text-xl font-bold">Prix de réserve :</h2>

                        <input type="text" placeholder="exemple : 60€" class="placeholder-zinc-600 h-8 w-full rounded-xl border-2 border-zinc-800 focus:outline-none pl-2"/> 
                        <div class="sm:text-xs text-xs flex flex-row items-center mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="sm:h-6 h-16 mr-2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                            </svg>                                             
                            Ce prix de réserve est un prix secret des utilisateurs, en dessous duquel le bien ne sera pas vendu, c'est en quelque sorte une assurance, si les enchères ne décollent pas 
                        </div>

                    </div>

                    <button class="bg-zinc-800 text-amber-50 px-3 py-1 rounded-lg mt-5 sm:text-lg text-sm hover:bg-zinc-600 mt-16">Mettre en ligne</button>


                                        
                    </div>





                    <button class="next sm:px-5 px-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>             
                    </button>
                        
                    </div>      

                    </main>
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