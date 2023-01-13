import React from 'react';
import { useState, useEffect } from 'react';
import { getProfileInfos } from '../services/UserService';
import NavBar from '../components/NavBar'
import ProfileNav from '../components/ProfileNav';
import RefusedAccess from '../components/RefusedAccess';


function ProfilePage() {
    const [isConnected, setIsConnected] = useState(null);
    const [role, setRole] = useState(null);
    const [data, setData] = useState(null);
    const[banniere, setBanniere] = useState();
    const[avatar, setAvatar] = useState(require("../static/images/default-avatar.png"));
    const[isLoading, setIsLoading] = useState(true);

    //Etat du bouton de la navbar
    const [clickedButton, setClickedButton] = useState("profil");

    const handleClickedButton = (value) => {
        setClickedButton(value);
    }
    
    useEffect(() => {
        getProfileInfos().then((response) => {
            console.log(response);
            setIsConnected(true);
            setRole(response.data.role);
            setData(response.data.user);
            if(response.data.user.banniere !== null) setBanniere(response.data.user.banniere)
            setIsLoading(false)
            if(response.data.user.pdp !== null) setAvatar(require(response.data.user.pdp));
 
        }).catch((error) => {
            setIsConnected(false);
            setIsLoading(false);
        })
}, []);
    if(isLoading){
        return null;
    }

    return(
        <main>

        {isConnected ? (
            <>
            <NavBar/>
            {banniere === null ? (
                <section  class="top sm:h-80 h-40 relative justify-center items-center bg-center bg-banniere bg-no-repeat bg-100 flex ">
                    <button name="personnaliser" class="sm:text-xl text-sm text-black bg-zinc-300 hover:bg-zinc-200 absolute sm:top-5 top-2 sm:right-5 right-2 rounded-xl px-4 py-1">personnaliser</button>
                    <h1 class="font-gowun text-6xl text-white">{data.login}</h1>
                </section>
            ) : (
                <section style={{backgroundImage: `url(${banniere})`}}  class="top sm:h-80 h-40 relative justify-center items-center bg-center bg-no-repeat bg-100 flex ">
                    <button name="personnaliser" class="sm:text-xl text-sm text-black bg-zinc-300 hover:bg-zinc-200 absolute sm:top-5 top-2 sm:right-5 right-2 rounded-xl px-4 py-1">personnaliser</button>
                    <h1 class="font-gowun text-6xl text-white">{data.login}</h1>
                </section>
            )}

            <ProfileNav role={role} onClickButton={handleClickedButton}/>
            <section class="bottom-profil sm:px-28 px-4">

            <div class="middle1 pt-10 flex flex-row justify-between">

                <div class="profil flex flex-row">

                    <img class="sm:w-24 w-16 sm:h-24 h-16 rounded-full" src={avatar} alt="photo de profil"/>

                    <div class="nom flex flex-col justify-around ml-5">

                        <p class="sm:text-4xl text-2xl">{data.login}</p>
                        <p>{clickedButton}</p>
                    </div>
                </div>
            </div>

        </section>
            </>
        ) : (
            <><RefusedAccess message="Vous devez être connecté pour accéder à cette page"/></>
        )} 
        </main> 

    )
}

export default ProfilePage;