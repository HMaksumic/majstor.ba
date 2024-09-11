import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/header/Header';
import Home from './pages/home/Home';
import CategoryPage from './pages/categories/CategoryPage';
import AuthPage from './pages/authentication/AuthPage';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider} from './context/AuthContext';
import Profile from './pages/profile/Profile';
import CreateUserAd from './pages/userads/CreateUserAd';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div id="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/category/:categoryName" element={<CategoryPage />} />
            <Route path="/profile" element={<ProtectedRoute component={Profile} />} />
            <Route path="/objavi-oglas" element={<ProtectedRoute component={CreateUserAd} />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;