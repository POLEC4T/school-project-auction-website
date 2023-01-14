import React from 'react';
import { NavLink } from 'react-router-dom';

function Footer(){

    return (

        <div className="bg-zinc-800 text-amber-50 font-outfit px-32 py-5">
            <div className="text-top text-lg w-full flex justify-center">
                <p>Bonjour, nous sommes cloth2you, le première plateforme de vente aux enchères de vêtements fait-mains. Notre objectif, laisser Nathan finir ce texte.</p>
            </div>
            <div className="bas font-gowun mt-8 flex justify-between">
                <div className="apropos text-lg">
                    <p>France | Français | € (EUR)</p>
                </div>

                <div className="infos-complementaires flex gap-3 text-lg">
                    <p>2022-2023</p>|
                    <p>© cloth2you</p>|
                    <NavLink style={{ backgroundColor: "rgb(39, 39, 42)" }}><p className='hover:underline'>Conditions générales d'utilisation</p></NavLink>|
                    <NavLink style={{ backgroundColor: "rgb(39, 39, 42)" }}><p className='hover:underline'>Politique de confidentialité</p></NavLink>|
                    <NavLink style={{ backgroundColor: "rgb(39, 39, 42)" }}><p className='hover:underline'>Cookies</p></NavLink>

                </div>


                    
            </div>
            
        </div>


    );




};

export default Footer;