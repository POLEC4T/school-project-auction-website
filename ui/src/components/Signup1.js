import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";

function Signup1(props){
    let navigate = useNavigate();

    const googleLogo = require("../static/images/logo-google.png");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [message, setMessage] = useState("");
    const [pseudo, setPseudo] = useState("");
    const[formValid, setFormValid] = useState(false);

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
        if(email.length > 0){
            setFormValid(true);
        }
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
        if(password.length > 0){
            setFormValid(true);
        }
    };

    const onChangePasswordConfirm = (e) => {
        const passwordConfirm = e.target.value;
        setPasswordConfirm(passwordConfirm);
        if(passwordConfirm.length > 0 && passwordConfirm === password){
            setFormValid(true);
        }
    };

    const onChangePseudo = (e) => {
        const pseudo = e.target.value;
        setPseudo(pseudo);
        if(pseudo.length > 0){
            setFormValid(true);
        }
    };

    const handleRegister = (e) => {
        e.preventDefault();
        if(formValid) {
            setMessage("");
            props.onValidate(true);
            e.preventDefault();
            AuthService.register(email, password, pseudo).then(
                () => {
                    navigate("/");//redirection vers la page d'accueil
                    window.location.reload();
                }
            );
        }
        else{
            setMessage("Veuillez remplir tous les champs correctement");
            props.onValidate(false);
        }
    };
    return(

        <div className="haut flex flex-col items-center pt-5 px-5">

        <h2 className="opacity-100 font-gowun text-4xl" >Inscription</h2>

        <button className="google-connexion mt-8 h-10 sm:w-2/3 w-full border-2 border-zinc-800 flex flex-row items-center rounded-xl justify-between">
            <img className="h-full pl-4 py-2" src={googleLogo} alt="google-logo"/>
            <p className="sm:pr-5 pr-7 ml-2 sm:text-lg text-sm ">S'inscrire avec Google</p>
        </button>

        <div className="ligne w-full flex flex-row overflow-hidden mt-8">
            <img className="w-1/4" src="ligne-1.png" alt=""/>
            <img className="w-1/4" src="ligne-2.png" alt=""/>
            <img className="w-1/4" src="ligne-1.png" alt=""/>    
            <img className="w-1/4" src="ligne-1.png" alt=""/>    
        </div>


        <input type="text" placeholder="email" className="placeholder-zinc-600 mt-8 h-8 w-full rounded-xl border-2 border-zinc-800  focus:outline-none pl-2" onChange={onChangeEmail}/> 
        <input type="text" placeholder="pseudo" className="placeholder-zinc-600 mt-5 h-8 w-full rounded-xl border-2 border-zinc-800  focus:outline-none pl-2" onChange={onChangePseudo}/>   

        <div className="mdp border-2 mt-5 h-8 rounded-xl border-zinc-800 flex flex-row w-full">
            <input type="text" placeholder="mot de passe" className="placeholder-zinc-600  w-full rounded-xl focus:outline-none pl-2" onChange={onChangePassword}/>
            <button>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 mr-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            </button>
        </div>
        <div className="mdp border-2 mt-5 h-8 rounded-xl border-zinc-800 flex flex-row w-full">
            <input type="text" placeholder="confirmer le mot de passe" className="placeholder-zinc-600 w-full rounded-xl focus:outline-none pl-2" onChange={onChangePasswordConfirm}/>
            <button>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 mr-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            </button>
        </div>

        <div className="cgu flex flex-row gap-2 mt-5">
            <input type="checkbox" name="cgu" id="cgu" className="accent-zinc-800"/>
            <p className="text-justify text-xs" disabled>
                En cochant cette case, vous acceptez les termes et conditions de cloth2you, les <Link href="/cgu" className="underline">conditions générales d'utilisation</Link>  et la <Link to="/confidentialite" className="underline">politique de confidentialité</Link> et avoir au moins 18 ans.
            </p>
        </div>

        <p class="text-red-500 text-sm">{message}</p>
        <div className="choix w-full flex flex-row justify-around sm:gap-0 gap-2">
            <button className="bg-zinc-800 text-amber-50 px-3 py-1 rounded-lg mt-5 sm:text-md text-sm hover:bg-zinc-600" onClick={handleRegister}>S'inscrire en tant qu'acheteur</button>
            <button className="text-zinc-800 border-2 border-zinc-800 px-3 py-1 rounded-lg mt-5 sm:text-md text-sm hover:text-zinc-600">Je souhaite vendre mes créations</button>
        </div>

        <h2 className="mt-4  text-center">Vous avez déjà de compte, <Link className="underline" to="/connexion">se connecter</Link>.</h2>
    </div>
    )
}

export default Signup1;