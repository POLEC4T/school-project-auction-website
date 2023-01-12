import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ArticlePage from "./pages/ArticlePage";
import NotFoundErrorPage from "./pages/NotFoundErrorPage";
import VendrePage from "./pages/VendrePage";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<ArticlePage />} />
          <Route path="/connexion" element={<LoginPage />} />
          <Route path="/vendre" element={<VendrePage />} />
          <Route exact path="*" element={< NotFoundErrorPage/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
