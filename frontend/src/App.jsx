import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/header/Header';
import Home from './pages/home/Home';
import CategoryPage from './pages/categories/CategoryPage';
import AuthPage from './pages/authentication/AuthPage';

const App = () => {

  return (
    <Router>
      <div id="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;