import React from 'react';
import { NavLink } from 'react-router-dom';

function Footer(){

    return (

        <div className="bg-zinc-800 text-orange-50 font-outfit sm:px-32 px-4 py-5">
            <div className="text-top sm:text-lg text-sm w-full flex justify-center">
                <p className="sm:text-center text-justify">Bonjour, nous sommes cloth2you, le première plateforme de vente aux enchères de vêtements fait-mains. Notre objectif, laisser Nathan finir ce texte.</p>
            </div>

            <div className="bas font-gowun sm:mt-8 mt-4 justify-between text-center">

                <div className="apropos sm:text-lg text-sm">
                    <p className='flex-col'>France | Français | € (EUR)</p>
                </div>

                <div className="infos-complementaires flex-row sm:items-start items-center sm:gap-5 gap-6 sm:text-lg text-sm">
                    <p>2022-2023</p>
                    <p>© cloth2you</p>
                    <NavLink style={{ backgroundColor: "rgb(39, 39, 42)" }}><p className='hover:underline'>Politique de confidentialité</p></NavLink>
                    <NavLink style={{ backgroundColor: "rgb(39, 39, 42)" }}><p className='hover:underline'>Conditions générales d'utilisation</p></NavLink>
                    <NavLink style={{ backgroundColor: "rgb(39, 39, 42)" }}><p className='hover:underline'>Conditions générales de vente</p></NavLink>
                    <NavLink style={{ backgroundColor: "rgb(39, 39, 42)" }}><p className='hover:underline'>Mentions légales</p></NavLink>
                </div>


                    
            </div>
            
        </div>


    );




};

export default Footer;