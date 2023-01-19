import React from 'react';
import { NavLink } from 'react-router-dom';

function Footer(){

    return (

        <div className="bg-zinc-800 text-orange-50 font-outfit sm:px-32 px-4 py-5">
            <div className="text-top sm:text-lg text-sm w-full flex justify-center">
                <p className="sm:text-center text-center sm:text-xl text-sm">Nous sommes cloth2you, le première plateforme de vente aux enchères de vêtements fait-mains.</p>
            </div>

            <div className="bas font-gowun flex sm:flex-col flex-row sm:mt-10 mt-4 justify-around text-center">

                <div className="apropos items-center sm:flex-row flex-col sm:gap-5 gap-2 sm:text-lg text-lg">
                    <p className="sm:block hidden">France | Français | € (EUR)</p>
                    <p className="sm:hidden block">France</p>
                    <p className="sm:hidden block">Français</p>
                    <p className="sm:hidden block">€ (EUR)</p>
                </div>

                <div className="w-px bg-orange-50 sm:hidden block"></div>

                <div className="infos-complementaires flex sm:flex-row flex-col mt-2 justify-center sm:gap-5 gap-2 sm:text-lg text-sm">
                    <p>2022-2023</p>
                    <p>© cloth2you</p>
                    <p>contact@cloth2you.fr</p>
                    <NavLink to="/politiqueconf" style={{ backgroundColor: "rgb(39, 39, 42)" }}><p className='hover:underline'>Politique de confidentialité</p></NavLink>
                    <NavLink to="/cgu" style={{ backgroundColor: "rgb(39, 39, 42)" }}><p className='hover:underline'>Conditions générales d'utilisation</p></NavLink>
                    <NavLink to="/cgv" style={{ backgroundColor: "rgb(39, 39, 42)" }}><p className='hover:underline'>Conditions générales de vente</p></NavLink>
                    <NavLink to="/mentionslegales" style={{ backgroundColor: "rgb(39, 39, 42)" }}><p className='hover:underline'>Mentions légales</p></NavLink>
                </div>


                    
            </div>
            
        </div>


    );




};

export default Footer;