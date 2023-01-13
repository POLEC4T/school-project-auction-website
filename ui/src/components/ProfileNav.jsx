import React from 'react';

function ProfileNav(props){


    const handleButtonClick = (e) => {
        props.onClickButton(e.target.value);
        e.preventDefault();
    }

    if(props.role === "ROLE_VENDEUR"){
        return(
            <nav class="flex flex-row font-gowun w-full text-white h-8 gap-0.5 sm:text-lg text-sm ">
            <button class="bg-zinc-700 hover:bg-zinc-500 flex justify-center w-1/2 items-center ease-in duration-100" value="profil" onClick={(e)=>handleButtonClick(e)}>
                profil
            </button>
            <button class="bg-zinc-700 hover:bg-zinc-500 flex justify-center w-1/2 items-center ease-in duration-100" value="ventes" onClick={(e)=>handleButtonClick(e)}>
                ventes
            </button>
            </nav>
        )
    }else if(props.role === "ROLE_ACHETEUR"){
        return(
            <nav class="flex flex-row font-gowun w-full text-white h-8 gap-0.5 sm:text-lg text-sm ">
            <button class="bg-zinc-700 hover:bg-zinc-500 flex justify-center w-1/3 items-center ease-in duration-100" value="profil" onClick={(e)=>handleButtonClick(e)}>
                profil
            </button>
            <button class="bg-zinc-700 hover:bg-zinc-500 flex justify-center w-1/3 items-center ease-in duration-100" value="commandes" onClick={(e)=>handleButtonClick(e)}>
                commandes
            </button>
            <button class="bg-zinc-700 hover:bg-zinc-500 flex justify-center w-1/3 items-center ease-in duration-100" value="favoris" onClick={(e)=>handleButtonClick(e)}>
                favoris
            </button>
        </nav>  
        )
    }
}

export default ProfileNav;