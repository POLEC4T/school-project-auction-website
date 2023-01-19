import React from "react";
import { useState, useEffect,  } from "react";
import { getUserById } from "../services/UserService";
import NavBar from "../components/NavBar";
import ProfilContent from "../components/ProfilContent";
import { useParams } from 'react-router-dom';

function PublicProfilePage() {

  const userId = useParams().userId;

  const [data, setData] = useState(null);
  const [banniere, setBanniere] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getUserById(userId)
      .then((response) => {
        if (response.message) {
          setError(response.message);
          setIsLoading(false);
        } else {
          setData(response);
          setBanniere(response.banniere);
          setIsLoading(false);
        }
      })
      .catch(() => {
        setError("Error connecting to server. Please try again later.");
      });
  }, [userId]);

  return (
    <div>

      <NavBar />

      {data && (
        <>

          <section className="top sm:h-80 h-40 relative justify-center items-center bg-center bg-zinc-800 bg-no-repeat bg-100 flex font-outfit" style={{background: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${banniere})`}}>
              <h1
                className="font-gowun text-6xl"
                style={{ color: data.couleur ? data.couleur : "white" }}
              >
                {data.login}
              </h1>
            </section>
          {<ProfilContent user={data} />}
        </>
      )}
    </div>
  );
}

export default PublicProfilePage;
