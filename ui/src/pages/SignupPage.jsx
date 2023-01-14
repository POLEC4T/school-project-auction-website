import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Signup1 from '../components/Signup1';
import Signup2 from '../components/Signup2';


function SignupPage() {
    const logo = require("../static/images/logo-outline.png");

    const[page, setPage] = useState(1);
    const[formValid, setFormValid] = useState(false);
    //const [message, setMessage] = useState("");

    //fonction callback à donner au composant fils
    const handleFormValidation = (formValid, nextPage) => {
        setFormValid(formValid);
        if(nextPage){
            handleRightArrow();
        }
    }

    const handleLeftArrow = () => {
        setPage(1);
    }

    const handleRightArrow = () => {
        if(page === 1 && formValid === true){
            setPage(2);
        }
    }


    return (
        <body className="main-container font-outfit h-screen bg-zinc-800 bg-hero bg-cover sm:bg-100 bg-200 overflow-hidden">

        <nav className="nav sm:w-1/4 w-full">
                <Link to="/" className="text-white flex flex-row items-center pt-5 pl-5" >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-10 h-10 translate-y-0.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                </svg>
                <h2 className="ml-5 text-2xl">Retour à l'accueil</h2>   
                <img className="logo-image h-8 ml-5" src={logo} alt="logo"/>         
            </Link>
        </nav>
        <div className="w-full h-full flex justify-center text-zinc-800 sm:mt-0 mt-10">             

                <div className="etape bg-white w-[600px] sm:h-4/5 h-5/6 sm:rounded-xl rounded-0 flex flex-row justify-between">

                    <button className="back sm:px-5 px-1" onClick={handleLeftArrow}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-10 h-10">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>                  
                    </button>
                    {page ===1 ? (
                        <Signup1 onValidate={handleFormValidation} />
                    ) : (
                        <Signup2 />
                    )}
                    <button className="next sm:px-5 px-2" onClick={handleRightArrow}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-10 h-10">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>             
                    </button>
                </div>

        </div>
</body>
    )
}

export default SignupPage;