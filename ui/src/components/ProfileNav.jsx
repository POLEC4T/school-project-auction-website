import React from 'react';

function ProfileNav(props){
    if(props.role === "ROLE_VENDEUR"){
        return(
            <nav class="flex flex-row font-gowun w-full text-white h-8 gap-0.5 sm:text-lg text-sm ">
            <button class="bg-zinc-700 hover:bg-zinc-500 flex justify-center w-1/2 items-center ease-in duration-100">
                profil
            </button>
            <button class="bg-zinc-700 hover:bg-zinc-500 flex justify-center w-1/2 items-center ease-in duration-100">
                ventes
            </button>
            </nav>
        )
    }else{
        return(
            <nav class="flex flex-row font-gowun w-full text-white h-8 gap-0.5 sm:text-lg text-sm ">
            <button class="bg-zinc-700 hover:bg-zinc-500 flex justify-center w-1/3 items-center ease-in duration-100">
                profil
            </button>
            <button class="bg-zinc-700 hover:bg-zinc-500 flex justify-center w-1/3 items-center ease-in duration-100">
                commandes
            </button>
            <button class="bg-zinc-700 hover:bg-zinc-500 flex justify-center w-1/3 items-center ease-in duration-100">
                favoris
            </button>
        </nav>  
        )
    }
}

export default ProfileNav;