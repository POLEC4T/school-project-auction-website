import React, { useEffect, useState } from "react";
import { getUserById } from "../services/UserService";

function ProfilContent({ user }) {
  const [avatar, setAvatar] = useState(require("../static/images/default-avatar.png"));

  if (user.pdp !== null)
    setAvatar(require(`${user.pdp}`));

  return (
    <>
      {user && user.roleId === 1 ? (
        <>
          <section class="bottom-profil sm:px-28 px-4 font-outfit">
            <div class="middle1 pt-10 flex flex-row justify-between">
              <div class="profil flex flex-row">
                <img
                  class="sm:w-24 w-16 sm:h-24 h-16 rounded-full"
                  src=""
                  alt="photo de profil"
                />

                <div class="nom flex flex-col justify-around ml-5">
                  <p class="sm:text-4xl text-2xl">{user.login}</p>

                  <div class="etoiles flex flex-row w-full justify-around">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="yes"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="sm:w-8 w-5 sm:h-8 h-5 fill-goldenyellow text-goldenyellow"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="yes"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="sm:w-8 w-5 sm:h-8 h-5 fill-goldenyellow text-goldenyellow"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="yes"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="sm:w-8 w-5 sm:h-8 h-5 fill-goldenyellow text-goldenyellow"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="sm:w-8 w-5 sm:h-8 h-5 text-goldenyellow"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="sm:w-8 w-5 sm:h-8 h-5 text-goldenyellow"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <a
                href=""
                class="contact flex sm:flex-row flex-col justify-center items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="sm:w-8 w-6 sm:h-8 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                  />
                </svg>
                <p class="sm:text-3xl text-2xl ml-2">Contact</p>
              </a>
            </div>

            <div class="middle2 mt-12 flex sm:flex-row flex-col">
              <div class="stats flex sm:flex-col flex-row sm:w-1/6 w-full rounded-xl sm:text-xl text-lg font-chivo justify-around text-center rounded-xl">
                <div class="bg-gray-100 sm:w-full w-1/2 p-4">
                  Articles vendus : 0
                </div>
                <div class="bg-gray-300 sm:w-full w-1/2 p-4">
                  Likes obtenus : 0
                </div>
              </div>

              <p class="description sm:w-5/6 w-full sm:ml-6 ml-0 text-justify sm:text-2xl text-xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
                sit, nisi officia dolorum id quo harum rem delectus unde modi
                animi tempore soluta dolore voluptas optio eaque doloribus
                fugiat provident.
              </p>
            </div>

            <div class="middle3 mt-10 flex flex-row justify-end">
              <button class="bg-zinc-200 pl-2 w-48 text-xl rounded flex flex-col text-start">
                <p class="text-gray-400">Trier par</p>
                <p>Tri choisi</p>
              </button>
            </div>
          </section>
        </>
      ) : (
        <div className="bonjour h-20 w-20 text-black">
          Je ne suis pas vendeur
        </div>
      )}
    </>
  );
}

export default ProfilContent;
