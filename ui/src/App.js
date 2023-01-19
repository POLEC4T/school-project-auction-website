import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ArticlePage from "./pages/ArticlePage";
import NotFoundErrorPage from "./pages/NotFoundErrorPage";
import VendrePage from "./pages/VendrePage";
import ProfilePage from "./pages/ProfilePage";
import SignupPage from "./pages/SignupPage";
import AccueilPage from "./pages/AccueilPage";
import ResultatsRecherche from "./pages/ResultatsRecherche";
import PaypalPage from "./pages/PaypalPage";
import PublicProfilePage from "./pages/PublicProfilePage";
import CGUPage from "./pages/CGUPage";
import CGVPage from "./pages/CGVPage";
import PolitiqueConfPage from "./pages/PolitiqueConfPage";
import MentionsLegalesPage from "./pages/MentionsLegalesPage";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<AccueilPage />} />
          <Route path="/recherche/:recherche?" element={<ResultatsRecherche />} />
          <Route path="/article/:id" element={<ArticlePage />} />
          <Route path="/connexion" element={<LoginPage />} />
          <Route path="/vendre" element={<VendrePage />} />
          <Route path="/profil" element={<ProfilePage />} />
          <Route path="/inscription" element={<SignupPage />} />
          <Route path="/paiement" element={<PaypalPage />} />
          <Route path="/publicprofile/:userId" element={<PublicProfilePage />} />
          <Route path="/cgu" element={<CGUPage />} />
          <Route path="/cgv" element={<CGVPage />} />
          <Route path="/politiqueconf" element={<PolitiqueConfPage />} />
          <Route path="/mentionslegales" element={<MentionsLegalesPage />} />
          <Route exact path="*" element={< NotFoundErrorPage/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
