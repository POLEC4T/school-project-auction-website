import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";

function SignupPage() {
  let navigate = useNavigate();

  const googleLogo = require("../static/images/logo-google.png");
  const logo = require("../static/images/logo-outline.png");
  const ligne1 = require("../static/images/ligne-1.png");
  const ligne2 = require("../static/images/ligne-2.png");

  //usestates correspondant aux champs du formulaire
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [formValid, setFormValid] = useState(false);
  const [page, setPage] = useState(1);
  const [cguChecked, setCguChecked] = useState(false);
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [siren, setSiren] = useState("");
  //usestate pour afficher les messages d'erreur
  const [message, setMessage] = useState("");

  // useState pour les mots de passe
  const [eye, setEye] = useState("closed");
  const [eyeConf, setEyeConf] = useState("closed");

  // fonction pour gérer l'affichage du mot de passe
  
const handleEye = (e) => {
  if(eye === "closed"){
      setEye("open");
  }else if(eye === "open"){
      setEye("closed");
  }
};

const handleEyeConf = (e) => {
  if(eyeConf === "closed"){
      setEyeConf("open")
  }else if(eyeConf === "open"){
      setEyeConf("closed")
  }
};

  //fonctions pour gérer les changements des champs du formulaire et les boutons cliqués
  const handleCguChange = (e) => {
    setCguChecked(e.target.checked);
  };

  const handlePreviousPage = (e) => {
    e.preventDefault();
    setMessage("");
    setPage(1);
  };

  const handleNextPage = (e) => {
    e.preventDefault();
    if (page === 1 && formValid === true) {
      setPage(2);
      setMessage("");
    } else {
      setMessage("Veuillez remplir tous les champs correctement");
    }
  };

  const onChangeEmail = (e) => {
    e.preventDefault();
    const email = e.target.value;
    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
    if(!regex.test(email)){
      setMessage("Veuillez entrer une adresse email valide");
    }else{
      setMessage("");
    }
    setEmail(email);
  };

  const onChangePassword = (e) => {
    e.preventDefault();
    const password = e.target.value;
    const regex = new RegExp('(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"');
    if(!regex.test(password)){
      setMessage("Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre");
    }else{
      setMessage("");
    }

    setPassword(password);
  };

  const onChangePasswordConfirm = (e) => {
    e.preventDefault();
    const passwordConfirm = e.target.value;
    setPasswordConfirm(passwordConfirm);
  };

  const onChangePseudo = (e) => {
    e.preventDefault();
    const pseudo = e.target.value;
    setPseudo(pseudo);
  };

  const onChangePrenom = (e) => {
    e.preventDefault();
    const prenom = e.target.value;
    setPrenom(prenom);
  };

  const onChangeNom = (e) => {
    e.preventDefault();
    const nom = e.target.value;
    setNom(nom);
  };

  const onChangeSiren = (e) => {
    e.preventDefault();
    const siren = e.target.value;
    const regex = new RegExp('^[0-9]{9}$');
    if(!regex.test(siren)){
      setMessage("Le numéro SIREN doit contenir 9 chiffres");
    }else{
      setMessage("");
    }
    setSiren(siren);
  };

  //useEffect pour valider le formulaire ou non
  useEffect(() => {
    if (page === 1) {
      if (pseudo && email && password && passwordConfirm) {
        if (password === passwordConfirm) {
          setFormValid(true);
        }
      } else {
        setFormValid(false);
      }
    } else if (page === 2) {
      if (nom && prenom && siren) {
        setFormValid(true);
      } else {
        setFormValid(false);
      }
    }
  }, [pseudo, email, password, passwordConfirm, nom, prenom, siren]);

  const handleRegisterAcheteur = (e) => {
    setMessage("");
    if (formValid) {
      if (!cguChecked) {
        setMessage("Vous devez accepter les CGU");
      } else {
        setMessage("");
        e.preventDefault();
        AuthService.registerAcheteur(pseudo, email, password)
          .then(() => {
            navigate("/connexion"); //redirection vers la page d'accueil
            window.location.reload();
          })
          .catch((err) => {
            console.log("register failed");
            setMessage(err.response.data.message);
          });
      }
    }
  };

  const handleRegisterVendeur = (e) => {
    setMessage("");
    if (formValid) {
      if (!cguChecked) {
        setMessage("Vous devez accepter les CGU");
      } else {
        setMessage("");
        e.preventDefault();
        AuthService.registerVendeur(pseudo, email, password, nom, prenom, siren)
          .then(() => {
            navigate("/connexion"); //redirection vers la page de connexion
            window.location.reload();
          })
          .catch((err) => {
            console.log("register failed");
            setMessage(err.response.data.message);
          });
      }
    }
  };

  return (
    <main className="main-container font-outfit h-screen bg-zinc-800 bg-hero bg-cover sm:bg-100 bg-200 overflow-hidden">
      <nav className="nav sm:w-1/4 w-full">
        <Link
          to="/"
          className="text-white flex flex-row items-center pt-5 pl-5"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-10 h-10 translate-y-0.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
            />
          </svg>
          <h2 className="ml-5 text-2xl">Retour à l'accueil</h2>
          <img className="logo-image h-8 ml-5" src={logo} alt="logo" />
        </Link>
      </nav>
      <div className="w-full h-full flex justify-center text-zinc-800 sm:mt-0 mt-10">
        <div className="etape bg-white w-[800px] sm:h-full h-5/6 sm:rounded-xl rounded-0 flex flex-row justify-between">
          <button
            className="back sm:px-5 px-1"
            onClick={(e) => handlePreviousPage(e)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-10 h-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
          {page === 1 ? (
            <div className="haut flex flex-col items-center pt-5 px-5">
              <h2 className="opacity-100 font-gowun text-7xl">Inscription</h2>

              <button className="google-connexion mt-8 h-16 sm:w-2/3 w-full border-2 border-zinc-800 flex flex-row items-center rounded-xl justify-between opacity-30" disabled>
                <img
                  className="h-full pl-4 py-2"
                  src={googleLogo}
                  alt="google-logo"
                />
                <p className="sm:pr-5 pr-7 ml-2 sm:text-3xl text-md">
                  S'inscrire avec Google
                </p>
              </button>

              <div className="ligne w-full flex flex-row overflow-hidden mt-8">
                <img className="w-1/4" src={ligne1} alt="" />
                <img className="w-1/4" src={ligne2} alt="" />
                <img className="w-1/4" src={ligne1} alt="" />
                <img className="w-1/4" src={ligne2} alt="" />
              </div>

              <input
                type="text"
                placeholder="email (exemple@cloth2you.com)"
                className="placeholder-zinc-600 mt-8 h-12 text-2xl w-full rounded-xl border-2 border-zinc-800  focus:outline-none pl-2"
                value={email}
                onChange={(e) => onChangeEmail(e)}
              />
              <input
                type="text"
                placeholder="pseudo"
                className="placeholder-zinc-600 mt-5 h-12 text-2xl w-full rounded-xl border-2 border-zinc-800  focus:outline-none pl-2"
                value={pseudo}
                onChange={(e) => onChangePseudo(e)}
              />

              <div className="mdp border-2 mt-5 h-12 text-2xl rounded-xl border-zinc-800 flex flex-row w-full">

              {eye === "closed" ? (

                <input
                  type="password"
                  placeholder="mot de passe"
                  className="placeholder-zinc-600 w-full rounded-xl focus:outline-none pl-2"
                  value={password}
                  onChange={(e) => onChangePassword(e)}
                />

                ) : (

                <input
                  type="text"
                  placeholder="mot de passe"
                  className="placeholder-zinc-600 w-full rounded-xl focus:outline-none pl-2"
                  value={password}
                  onChange={(e) => onChangePassword(e)}

                />
                )

                }  
                
                <button onClick={handleEye}>

                      {eye === "closed" ? (

                          <>

                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-4">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                          </svg>

                            

                          </>
                          
                          ) : (

                          <> 
                          

                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-4">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>

                          </>

                      )
                      } 
                </button>
              </div>
              <div className="mdp border-2 mt-5 mt-5 h-12 text-2xl rounded-xl border-zinc-800 flex flex-row w-full">
              {eyeConf === "closed" ? (

                  <input
                    type="password"
                    placeholder="confirmer le mot de passe"
                    className="placeholder-zinc-600  w-full rounded-xl focus:outline-none pl-2"
                    value={passwordConfirm}
                    onChange={(e) => onChangePasswordConfirm(e)}
                  />

                  ) : (

                  <input
                    type="text"
                    placeholder="confirmer le mot de passe"
                    className="placeholder-zinc-600  w-full rounded-xl focus:outline-none pl-2"
                    value={passwordConfirm}
                    onChange={(e) => onChangePasswordConfirm(e)}

                  />
                  )

                  }

                <button onClick={handleEyeConf}>

                  {eyeConf === "closed" ? (

                      <>

                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-4">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg>

                      

                      </>
                      
                      ) : (

                      <> 
                      

                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-4">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                          <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>

                      </>

                  )
                  } 
                  </button>
              </div>

              <div className="cgu flex flex-row gap-2 mt-5">
                <input
                  type="checkbox"
                  name="cgu"
                  id="cgu"
                  className="accent-zinc-800"
                  onChange={(e) => handleCguChange(e)}
                />
                <p className="text-justify text-lg" disabled>
                  En cochant cette case, vous acceptez les termes et conditions
                  de cloth2you, les{" "}
                  <Link href="/cgu" className="underline">
                    conditions générales d'utilisation
                  </Link>{" "}
                  et la{" "}
                  <Link to="/confidentialite" className="underline">
                    politique de confidentialité
                  </Link>{" "}
                  et avoir au moins 18 ans.
                </p>
              </div>

              <p className="text-red-500 text-sm text-center mt-2">{message}</p>
              <div className="choix w-full h-12 flex flex-row sm:text-lg text-md justify-between sm:gap-2 gap-2">
                <button
                  className="bg-zinc-800 text-orange-200 h-full px-3 py-1 rounded-lg mt-5 hover:bg-zinc-600 w-1/2"
                  onClick={(e) => handleRegisterAcheteur(e)}
                >
                  S'inscrire en tant qu'acheteur
                </button>
                <button
                  className="text-zinc-800 border-2 h-full border-zinc-800 px-3 py-1 rounded-lg mt-5 hover:text-zinc-600 w-1/2"
                  onClick={(e) => handleNextPage(e)}
                >
                  Je souhaite vendre mes créations
                </button>
              </div>

              <h2 className="mt-6 text-center">
                Vous avez déjà un compte,{" "}
                <Link className="underline" to="/connexion">
                  se connecter
                </Link>
                .
              </h2>

            </div>

            
          ) : (
            <div className="haut flex flex-col items-center pt-5 px-5">
              <h2 className="opacity-100 font-gowun text-7xl">Inscription</h2>

              <div className="ligne w-full flex flex-row overflow-hidden mt-8">
                <img className="w-1/4" src={ligne1} alt="" />
                <img className="w-1/4" src={ligne2} alt="" />
                <img className="w-1/4" src={ligne1} alt="" />
                <img className="w-1/4" src={ligne2} alt="" />
              </div>

              <p className="text-lg text-center mt-8">
                En vous inscrivant en tant que vendeur·euse sur cloth2you, vous
                devez avoir un statut entrepreneurial,{" "}
                <a href="" className="underline">
                  en savoir plus
                </a>
                .
              </p>

              <input
                type="text"
                placeholder="nom"
                className="placeholder-zinc-600 mt-8 h-12 text-2xl w-full rounded-xl border-2 border-zinc-800  focus:outline-none pl-2"
                value={nom}
                onChange={(e) => onChangeNom(e)}
              />
              <input
                type="text"
                placeholder="prénom"
                className="placeholder-zinc-600 mt-4 h-12 text-2xl w-full rounded-xl border-2 border-zinc-800  focus:outline-none pl-2"
                value={prenom}
                onChange={(e) => onChangePrenom(e)}
              />
              <input
                type="text"
                placeholder="numéro SIREN"
                className="placeholder-zinc-600 mt-4 h-12 text-2xl w-full rounded-xl border-2 border-zinc-800  focus:outline-none pl-2"
                value={siren}
                onChange={(e) => onChangeSiren(e)}
              />

              <div className="cgu flex flex-row gap-2 mt-8">
                <input
                  type="checkbox"
                  name="cgu"
                  id="cgu"
                  className="accent-zinc-800"
                  onChange={(e) => handleCguChange(e)}
                />
                <p className="text-justify text-lg" disabled>
                  En cochant cette case, vous acceptez les termes et conditions
                  de cloth2you, les{" "}
                  <Link to="/cgu" className="underline">
                    conditions générales d'utilisation
                  </Link>{" "}
                  et la{" "}
                  <Link to="/politiqueconf" className="underline">
                    politique de confidentialité
                  </Link>{" "}
                  et avoir au moins 18 ans.
                </p>
              </div>

              <p className="text-red-500 text-center mt-5 text-lg">{message}</p>

              <div className="choix w-full flex flex-row justify-around mt-5">
                <button
                  className="bg-zinc-800 text-orange-200 px-3 py-1 rounded-lg mt-5 text-2xl hover:bg-zinc-600"
                  onClick={(e) => handleRegisterVendeur(e)}
                >
                  S'inscrire en tant que vendeur · euse
                </button>
              </div>
            </div>
          )}
          <button className="suivant sm:px-5 px-2" onClick={handleNextPage}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-10 h-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </main>
  );
}

export default SignupPage;
