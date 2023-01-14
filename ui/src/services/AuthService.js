import axios from "axios";

const API_URL = "http://localhost:3080/api/auth/";

const registerAcheteur = (login, email, password) => {
  return axios.post(API_URL + "signup", {
    login,
    email,
    password,
    role_id: 2,
  });
};

const registerVendeur = (login, email, password, num_siren,nom, prenom) => {
  return axios.post(API_URL + "signup", {
    login,
    email,
    password,
    role_id : 1,
    num_siren,
    nom,
    prenom
  });
};

const login = (login, password) => {
  return axios
    .post(API_URL + "signin", {
      login,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
    });
};

const logout = () => {
  localStorage.removeItem("user");
  //refresh de la page 
  window.location.reload();
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  registerAcheteur,
  registerVendeur,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
