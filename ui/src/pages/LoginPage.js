import React from 'react';
import { useState, useEffect } from 'react';
import { getUser } from '../services/UserService';
import NavBar from '../components/NavBar';
import Separator from '../components/Separator';

function LoginPage() {

    const logoGoogle = require('../static/images/logo-google.png');

    const [userA, setUserA] = useState([]);
    
    useEffect(() => {
        getUser('nathan').then((user) => {
            setUserA(user);
        });
    }, []);


    return (
        <div className='h-screen overflow-hidden'>
            <div className='main-container flex font-outfit overflow-hidden h-screen'>
                <div className='leftsection bg-slate-400 h-screen lg:w-2/3 w-full flex flex-col justify-between p-20 content-center text-center'>
                    <h1 className='text-4xl text-white text-center'>Connexion</h1>
                    <button className='loginwithgoogle rounded-full p-2 w-1/3 h-12 bg-white text-center mx-auto flex justify-around content-center'>
                        <img src={logoGoogle} alt="logo Google"></img>
                        Se connecter avec Google
                    </button>
                    <Separator content={userA.email}/>
                    <div className='flex justify-center'>
                        <form className='w-1/2 grid gap-2' method="post">
                            <input type="text" name="login" placeholder='email' className='rounded-full p-2 w-full h-12 drop-shadow-lg outline-none'/>
                            <input type="password" name="password" placeholder="mot de passe" className='rounded-full p-2 w-full h-12 drop-shadow-lg outline-none'/>
                            <a className='text-white text-right'>Mot de passe oublié ?</a>
                            <button type="submit" className='rounded-full p-2 bg-white w-36 drop-shadow-lg mx-auto'>Se connecter</button>
                        </form>
                    </div>
                    <p className='text-white text-center'>Vous n'avez pas de compte ? <span className='text-black underline'>S'inscrire</span></p>
                </div>
                <div className="rightsection bg-cover bg-bottom bg-no-repeat bg-loginpagerightsection h-full w-1/3 lg:block hidden flex justify-center content-center">
                    <div className='backdrop-blur h-3/4 w-3/4 m-auto rounded-2xl bg-white/30 flex '>
                        <h2 className='text-5xl text-center text-white '>"La meilleure plateforme d'enchères des vêtements fait main"</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;