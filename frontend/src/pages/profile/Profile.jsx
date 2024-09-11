import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/AuthContext'; 
import Header from '../../components/header/Header';
import './Profile.css';

function Profile() {
  const { user } = useContext(AuthContext);
  const[access_token, setAccess_token] = useState(localStorage.getItem('access_token'));
  const [ads, setAds] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/get-published-ads/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${access_token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch ads');
        }

        const data = await response.json();
        setAds(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchAds();
  }, [user]);

  return (
    <div>
      <Header />
      <h1>Welcome, {user.name}!</h1>
      {error && <p className="error">{error}</p>}
      <h2>Your Published Ads</h2>
      <div className="ads-container">
        {ads.map(ad => (
          <div className="ad-card" key={ad.id}>
            <h3>{ad.title}</h3>
            <p>{ad.description}</p>
            <p>Category: {ad.category}</p>
            <p>Price: {ad.price}</p>
            <p>City: {ad.city}</p>
            <p>Date Published: {ad.date_published}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Profile;