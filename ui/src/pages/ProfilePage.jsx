import React from 'react';
import { useState, useEffect } from 'react';
import { getProfileInfos } from '../services/UserService';
import NavBar from '../components/NavBar'
import ProfileNav from '../components/ProfileNav';
import RefusedAccess from '../components/RefusedAccess';


function ProfilePage() {
    const [isConnected, setIsConnected] = useState(null);
    const [role, setRole] = useState(null);
//    const [data, setData] = useState(null);
    const[banniere, setBanniere] = useState("../static/images/banniere-profil.jpg");
    //const[avatar, setAvatar] = useState("../static/images/default-avatar.jpg");

    useEffect(() => {
        getProfileInfos().then((response) => {
            if (response.status === 200) {
                setIsConnected(true);
                setRole(response.data.role);
                //setData(response.data);
                if(response.data.banniere){
                    setBanniere(response.data.banniere);
                }
                if(response.data.pdp){
                    //setAvatar(response.data.pdp);
                }
            } else {
                setIsConnected(false);
            }
        });
}, []);

    return(
        <main>

        {isConnected ? (
            <>
            <NavBar/>
            <section style={{'var(--image-url)': banniere}}  class="top sm:h-80 h-40 relative justify-center items-center bg-center bg-[image:var(--image-url)] bg-no-repeat bg-100 flex ">
                <button name="personnaliser" class="sm:text-xl text-sm text-black bg-zinc-300 hover:bg-zinc-200 absolute sm:top-5 top-2 sm:right-5 right-2 rounded-xl px-4 py-1">personnaliser</button>
                <h1 class="font-gowun text-6xl text-white">nomduprofil</h1>
            </section>
            <ProfileNav role={role}/>
            </>
        ) : (
            <><RefusedAccess message="Vous devez être connecté pour accéder à cette page"/></>
        )} 
        </main> 

    )
}

export default ProfilePage;