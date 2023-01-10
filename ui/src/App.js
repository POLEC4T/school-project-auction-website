import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ArticlePage from './pages/ArticlePage';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<ArticlePage/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
