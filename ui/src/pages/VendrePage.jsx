import React from "react";
import { getVendre } from "../services/UserService";
import { useEffect,useState } from "react";
import NavBar from "../components/NavBar";
import RefusedAccess from "../components/RefusedAccess";
import Titre from "../components/vente/Titre";
import Taille from "../components/vente/Taille";
import Photos from "../components/vente/Photos";

function VendrePage() {

    //usestates
    const [data, setData] = useState([]);
    const [vendeur, setVendeur] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [titre, setTitre] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);
    const [categorie, setCategorie] = useState("");
    const [taille, setTaille] = useState("");
    const [couleur, setCouleur] = useState("");
    const [materiaux, setMateriaux] = useState("");
    const [prix_depart, setPrix_depart] = useState(0);
    const [seuil, setSeuil] = useState(0);
    const [isPageValid, setIsPageValid] = useState(false);


    //handle functions
    const handleTitre = (e) => {
        e.preventDefault();
        setTitre(e.target.value);
    }

    const handleDescription = (e) => {
        e.preventDefault();
        setDescription(e.target.value);
    }

    const handleImages = (e) => {
        e.preventDefault();
        setImages([...images, ...e.target.files]);
    }

    const handleCategorie = (e) => {
        e.preventDefault();
        setCategorie(e.target.value);
    }

    const handleTaille = (e) => {
        e.preventDefault();
        setTaille(e.target.value);
    }

    const handleCouleur = (e) => {
        e.preventDefault();
        setCouleur(e.target.value);
    }

    const handleMateriaux = (e) => {
        e.preventDefault();
        setMateriaux(e.target.value);
    }

    const handlePrix_depart = (e) => {
        e.preventDefault();
        setPrix_depart(e.target.value);
    }

    const handleSeuil = (e) => {
        e.preventDefault();
        setSeuil(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            titre: titre,
            description: description,
            images: images,
            categorie: categorie,
            taille: taille,
            couleur: couleur,
            materiaux: materiaux,
            prix_depart: prix_depart,
            seuil: seuil
        }
        //TODO: send data to backend
        console.log(data);
    }

    const handleNextPage = (e) => {
        e.preventDefault();
        //on remet la validité du formulaire à false quand on change de page
        setIsPageValid(false);
        if(page < 3){
            setPage(page + 1);
        }
    }

    const handlePreviousPage = (e) => {
        e.preventDefault();
        //on remet la validité du formulaire à false quand on change de page
        setIsPageValid(false);
        if(page > 1){
            setPage(page - 1);
        }
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
        
                    <button class="precedent sm:px-5 px-1" onClick={handlePreviousPage}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>                  
                    </button>

                    <h2 class="font-gowun sm:text-4xl text-2xl">Mise aux enchères ({page}/3)</h2>

                    {page === 1 && (
                        <>
                        <Titre onChange={handleTitre} value={titre}/>
                        <Photos onChange={handleImages} value={images}/>
                        </>
                    )}
                    {/*afficher form en fonction de la page */}
                    <button class="suivant sm:px-5 px-2" onClick={handleNextPage}>
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