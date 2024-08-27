import React, { useState } from 'react';
import './AuthPage.css'; 

const AuthPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
    console.log(isLogin ? 'Logging in...' : 'Signing up...');
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="logo">
        </div>
        <h2>{isLogin ? 'Prijava' : 'Registracija'}</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>EMAIL</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>ŠIFRA</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="forgot-password">
            <a href="#">Zaboravili ste šifru?</a>
          </div>
          <button type="submit" className="submit-btn">
            {isLogin ? 'Prijavi se' : 'Registruj se'}
          </button>
        </form>
        <p>
          Nemate korisnički račun?{' '}
          <a href="#" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'REGISTRUJ SE' : 'PRIJAVI SE'}
          </a>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
