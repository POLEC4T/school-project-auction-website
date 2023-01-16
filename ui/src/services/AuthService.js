import axios from "axios";

const registerAcheteur = (login, email, password) => {
  return axios.post("/api/auth/signup", {
    login,
    email,
    password,
    role_id: 2,
  });
};

const registerVendeur = (login, email, password, num_siren,nom, prenom) => {
  return axios.post("/api/auth/signup", {
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
    .post("/api/auth/signin", {
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
