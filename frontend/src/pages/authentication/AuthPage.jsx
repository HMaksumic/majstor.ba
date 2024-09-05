import React, { useState } from 'react';
import './AuthPage.css'; 

const AuthPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin ? 'http://127.0.0.1:8000/api/login/' : 'http://127.0.0.1:8000/api/register/';
    const payload = isLogin ? { email, password } : { name, email, password };
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log('Success:', data);
  
      // Check for access_token or user to verify successful login
    if (isLogin) {
      if (data.access_token && data.user) {
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('access_token', data.access_token);

        // Redirect to profile page after successful login
        window.location.href = '/profile';
      } else {
        // Display login error message
        setErrorMessage('Login failed. Invalid credentials or server error.');
      }
    } else {
      // Handle registration flow
      if (data.success) {
        setIsLogin(true); // Switch to login form after successful registration
        alert('Registration successful! Please log in.');
      } else {
        // Display registration error message
        setErrorMessage(data.message || 'Registration error');
      }
    }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An unexpected error occurred. Please try again.');
    }
  };

const handleEmailChange = (e) => {
  setEmail(e.target.value.toLowerCase());
};

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="logo">
        </div>
        <h2>{isLogin ? 'Prijava' : 'Registracija'}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div>
              <label>IME</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={!isLogin}
              />
            </div>
          )}
          <div>
            <label>EMAIL</label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
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
          {errorMessage && <div className="error-message">{errorMessage}</div>}
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
