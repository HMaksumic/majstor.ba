import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import "./home.css";
import Header from "../../components/header/Header";

const Home = () => {
  const categories = [
    "Vodoinstalateri",
    "Stolari",
    "Električari",
    "Moleri",
    "Keramičari",
    "Bravari",
    "Servis računara",
    "Servis klima uređaja"
  ];

  const [ads, setAds] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/get-all-published-ads/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
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
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      <Header />
      <div className="home-container">
        <div className="row">
          <div className="col-md-12">
            <div className="category-bar text-center scrollable-category-bar">
              {categories.map((category) => (
                <Link to={`/category/${category}`} key={category} className="category-item">
                  <img src={`/categories/${category}.jpg`} alt={category} />
                  <span>{category}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="ads-container-home">
          {error && <p className="error">{error}</p>}
          {ads.map((ad) => (
            <div className="col-md-4-home" key={ad.id}>
              <div className="ad-card-home">
                {ad.images.length > 0 && (
                  <img src={ad.images[0].image_url} alt={ad.title} className="ad-image-home" />
                )}
                <h3>{ad.title}</h3>
                <p>{ad.description.length > 20 ? `${ad.description.substring(0, 20)}...` : ad.description}</p>                <p>Category: {ad.category}</p>
                <p>Cjena: {ad.price} KM</p>
                <p>Grad: {ad.city}</p>
                <p>Objavljeno: {formatDate(ad.date_published)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;