import axios from "axios";

const API_URL = "http://localhost:3080/api/auth/";

const register = (login, email, password) => {
  return axios.post(API_URL + "signup", {
    login,
    email,
    password,
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
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
