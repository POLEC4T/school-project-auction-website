import React from "react";
import { useState, useEffect } from "react";
import { getProfileInfos } from "../services/UserService";
import NavBar from "../components/NavBar";
import ProfileNav from "../components/ProfileNav";
import RefusedAccess from "../components/RefusedAccess";
import ProfilContent from "../components/ProfilContent";
import AuthService from "../services/AuthService";

function ProfilePage() {
  const [isConnected, setIsConnected] = useState(null);
  const [role, setRole] = useState(null);
  const [data, setData] = useState(null);
  const [banniere, setBanniere] = useState();
  const [avatar, setAvatar] = useState(
    require("../static/images/default-avatar.png")
  );
  const [isLoading, setIsLoading] = useState(true);

  // Etat du bouton de la navbar
  const [clickedButton, setClickedButton] = useState("profil");

  const handleClickedButton = (value) => {
    setClickedButton(value);
  };

  useEffect(() => {
    getProfileInfos()
      .then((response) => {
        setIsConnected(true);
        setRole(response.data.role);
        setData(response.data.user);
        setBanniere(response.data.user.banniere);
        setIsLoading(false);
        if (response.data.user.pdp !== null)
          setAvatar(require(`${response.data.user.pdp}`));
      })
      .catch((error) => {
        setIsConnected(false);
        setIsLoading(false);
      });
  }, []);
  if (isLoading) {
    return null;
  }

  return (
    <main>
      {isConnected ? (
        <>
          <NavBar />
          {banniere === null ? (
            <section className="top sm:h-80 h-40 relative justify-center items-center bg-center bg-banniere bg-no-repeat bg-100 flex font-outfit">
              <button
                name="personnaliser"
                className="sm:text-xl text-sm text-zinc-800 bg-amber-50 hover:bg-amber-100 absolute sm:top-5 top-2 sm:right-5 right-2 rounded-xl px-4 py-1"
              >
                personnaliser
              </button>
              <h1
                className="font-gowun text-6xl"
                style={{ color: data.couleur ? data.couleur : "white" }}
              >
                {data.login}
              </h1>
            </section>
          ) : (
            <section
              style={{ backgroundImage: `url(${banniere})` }}
              className="top sm:h-80 h-40 relative justify-center items-center bg-center bg-no-repeat bg-100 flex "
            >
              <button
                name="personnaliser"
                className="sm:text-xl text-sm text-black bg-zinc-300 hover:bg-zinc-200 absolute sm:top-5 top-2 sm:right-5 right-2 rounded-xl px-4 py-1"
              >
                personnaliser
              </button>
              <h1 className="font-gowun text-6xl text-white">{data.login}</h1>
            </section>
          )}

          {role&&

            <>

                <ProfileNav role={role} onClickButton={handleClickedButton} />

                <ProfilContent user={data}></ProfilContent>

            </>
          
          }

          
        </>
      ) : (
        <>
          <RefusedAccess message="Vous devez être connecté pour accéder à cette page" />
        </>
      )}
    </main>
  );
}

export default ProfilePage;
