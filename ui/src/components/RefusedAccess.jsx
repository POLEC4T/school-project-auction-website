import React from "react";
import NavBar from "./NavBar";
import { Link } from "react-router-dom";

function RefusedAccess(props) {
    return (
        <>
        <NavBar/>
        <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
            <h1 className="text-2xl font-semibold md:text-3xl">Accès refusé</h1>
            <p className="mt-4 mb-8 dark:text-black font-semibold">{props.message}</p>
            <Link to="/" className="px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-gray-900">Back to homepage</Link>
        </div>
    </>
    );
}

export default RefusedAccess;