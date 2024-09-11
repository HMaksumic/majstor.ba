import React, { useState, useContext } from 'react';
import './CreateUserAd.css';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext'; 
import SimpleHeader from '../../components/header/SimpleHeader';

const CreateUserAd = () => {
    const {user, createUserAd } = useContext(AuthContext);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [city, setCity] = useState('');
    const [images, setImages] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleImageChange = (e) => {
      setImages([...e.target.files]);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setErrorMessage('');
      setSuccessMessage('');

      const adData = {
        title,
        description,
        category,
        price,
        city,
        date_published: new Date().toISOString().split('T')[0],
      };

      const result = await createUserAd(adData, images);
      if (result.success) {
        setSuccessMessage(result.message);
        // Clear form fields
        setTitle('');
        setDescription('');
        setCategory('');
        setPrice('');
        setCity('');
        setImages([]);

        navigate('/profile');
      } else {
        setErrorMessage(result.message);
      }
    };
  
    if (!user) {
      return <div>Please log in to create an ad.</div>;
    }

    return (
        <>
        <SimpleHeader />
        <div className="create-ad-container">
          <h2>Create New Ad</h2>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          {successMessage && <div className="success-message">{successMessage}</div>}
          <form onSubmit={handleSubmit}>
            <div>
              <label>Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="form-input"
              />
            </div>
            <div>
              <label>Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="form-input"
              />
            </div>
            <div>
              <label>Category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="form-input"
              />
            </div>
            <div>
              <label>Price</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className="form-input"
              />
            </div>
            <div>
              <label>City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                className="form-input"
              />
            </div>
            <div>
              <label>Images</label>
              <input
                type="file"
                multiple
                onChange={handleImageChange}
                className="form-input"
              />
            </div>
            <button type="submit" className="submit-button">Create Ad</button>
          </form>
        </div>
        </>
      );
  };
  
  export default CreateUserAd;