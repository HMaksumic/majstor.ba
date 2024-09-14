import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/AuthContext'; 
import Header from '../../components/header/Header';
import './Profile.css';

function Profile() {
  const { user } = useContext(AuthContext);
  const [access_token, setAccess_token] = useState(localStorage.getItem('access_token'));
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
  }, [user, access_token]);

  const handleDelete = async (adId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/delete-ad/${adId}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${access_token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete ad');
      }

      // Remove the deleted ad from the state
      setAds(ads.filter(ad => ad.id !== adId));
    } catch (error) {
      setError(error.message);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };


  return (
    <div>
      <Header />
      <h1>Dobrodošli na vašu stranicu, {user.name}!</h1>
      {error && <p className="error">{error}</p>}
      <div className="profile-content">
        <div className="ads-container-profile">
          {ads.map((ad) => (
            <div className="col-md-4" key={ad.id}>
              <div className="ad-card-profile">
                {ad.images.length > 0 && (
                  <img src={ad.images[0].image_url} alt={ad.title} className="ad-image-profile" />
                )}
                <h3>{ad.title}</h3>
                <p>{ad.description.length > 20 ? `${ad.description.substring(0, 20)}...` : ad.description}</p>
                <p>Kategorija: {ad.category}</p>
                <p>Cjena: {ad.price}</p>
                <p>Grad: {ad.city}</p>
                <p>Objavljeno: {formatDate(ad.date_published)}</p>
                <button onClick={() => handleDelete(ad.id)} className="delete-button">Ukloni</button>
              </div>
            </div>
          ))}
        </div>
  
        <div className="inbox-placeholder">
          <h2>Inbox</h2>
          <p>This is where your messages will appear.</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;