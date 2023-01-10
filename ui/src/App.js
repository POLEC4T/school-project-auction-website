import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ArticlePage from "./pages/ArticlePage";
import NavBar from "./components/NavBar";
import NotFoundErrorPage from "./pages/NotFoundErrorPage";

function App() {
  return (
    <BrowserRouter>
      <NavBar />{/*On met la navbar ici afin qu'elle apparaisse sur toutes les pages*/}
      <div>
        <Routes>
          <Route path="/" element={<ArticlePage />} />
          <Route path="/connexion" element={<LoginPage />} />
          <Route exact path="*" element={< NotFoundErrorPage/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
