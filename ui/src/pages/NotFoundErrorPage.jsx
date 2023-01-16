import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';


export default function NotFoundErrorPage() {
  return (
	<>
		<NavBar/>
		<section className="flex flex-col items-center font-outfit pt-20 text-center h-screen text-zinc-800">
		
			
				<h2 className="text-9xl font-outfit font-bold">
					<span className="sr-only">Error</span>404
				</h2>
				<p className="sm:text-2xl text-xl mt-2">Oups, la page que vous recherchez n'existe pas</p>
				<p className="sm:text-2xl text-xl mt-12">Mais ne vous inquiétez pas, il y a pleins de choses sur notre page d'accueil</p>
				<Link rel="noopener noreferrer" to="/" className="hover:bg-zinc-600 bg-zinc-800 text-amber-50 p-2 px-3 sm:text-2xl text-lg rounded-xl mt-12">Retourner à la page d'accueil</Link>
<<<<<<< HEAD
			
=======
>>>>>>> origin/dev
		
	</section>
</>
  );
}