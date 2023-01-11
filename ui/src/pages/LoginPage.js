import React from 'react';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Separator from '../components/Separator';
import { Link } from 'react-router-dom';

import AuthService from "../services/AuthService";


function LoginPage() {

    let navigate = useNavigate();

    //usestates
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const logoGoogle = require('../static/images/logo-google.png');

    //fonction callback onAction
    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
      };
    
      const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
      };
    
    const handleLogin = (e) => {
        console.log("handleLogin");
        e.preventDefault();
        setMessage("");
        AuthService.login(username, password).then(
            () => {
                console.log("login success");
              navigate("/");//redirection vers la page d'accueil
              window.location.reload();
            }
          ).catch(err => {
            console.log("login failed");
            setMessage(err.response.data.message);
          })
      };
    

    return (
        <div className='h-screen overflow-hidden'>
            <div className='main-container flex font-outfit overflow-hidden h-screen'>
                <div className='leftsection bg-slate-400 h-screen lg:w-2/3 w-full flex flex-col justify-between p-20 content-center text-center'>
                    <h1 className='text-4xl text-white text-center'>Connexion</h1>
                    <button className='loginwithgoogle rounded-full p-2 w-1/3 h-12 bg-white text-center mx-auto flex justify-around content-center'>
                        <img src={logoGoogle} alt="logo Google"></img>
                        Se connecter avec Google
                    </button>
                    <Separator content={"Se connecter avec le nom d'utilisateur"}/>
                    <div className='flex justify-center'>
                        <div className='w-1/2 grid gap-2'>
                            <input type="text" name="login" placeholder='login' className='rounded-full p-2 w-full h-12 drop-shadow-lg outline-none' value={username} onChange = {(e) => onChangeUsername(e)}/>
                            <input type="password" name="password" placeholder="mot de passe" className='rounded-full p-2 w-full h-12 drop-shadow-lg outline-none' value={password} onChange = {(e) => onChangePassword(e)}/>
                            <Link className='text-white text-right' to="/forgotten">Mot de passe oublié ?</Link>
                            <p>{message}</p>
                            <button onClick={(e)=>handleLogin(e)} type="submit" className='rounded-full p-2 bg-white w-36 drop-shadow-lg mx-auto'>Se connecter</button>
                        </div>
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