import React, { useState, useContext } from 'react';
import './CreateUserAd.css';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext'; 
import SimpleHeader from '../../components/header/SimpleHeader';

const CreateUserAd = () => {
    const { user, createUserAd } = useContext(AuthContext);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [price, setPrice] = useState('');
    const [city, setCity] = useState('');
    const [filteredCities, setFilteredCities] = useState([]);
    const [images, setImages] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

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

    const cities = [
        "Sarajevo", "Banja Luka", "Tuzla", "Zenica", "Bijeljina", "Mostar", "Prijedor", "Brčko", "Doboj", "Ilidža", "Cazin", "Zvornik", "Živinice", "Bihać", "Travnik", "Gradiška", "Gračanica", "Lukavac", "Tešanj", "Sanski Most", "Velika Kladuša", "Visoko", "Srebrenik", "Gradačac", "Teslić", "Kakanj", "Zavidovići", "Prnjavor", "Laktaši", "Livno", "Kalesija", "Tomislavgrad", "Bugojno", "Žepče", "Trebinje", "Široki Brijeg", "Ljubuški", "Derventa", "Jajce", "Novi Grad", "Čapljina", "Vitez", "Modriča", "Bosanska Krupa", "Konjic", "Hadžići", "Novi Travnik", "Maglaj", "Banovići", "Kozarska Dubica", "Gornji Vakuf-Uskoplje", "Pale", "Goražde", "Kiseljak", "Posušje"
    ];

    const normalizeString = (str) => {
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    };

    const handleCategoryChange = (e) => {
        const value = e.target.value;
        setCategory(value);
        if (value) {
            const filtered = categories.filter((cat) =>
                normalizeString(cat).toLowerCase().includes(normalizeString(value).toLowerCase())
            );
            setFilteredCategories(filtered);
        } else {
            setFilteredCategories(categories);
        }
    };

    const handleCategorySelect = (category) => {
        setCategory(category);
        setFilteredCategories([]);
    };

    const handleCityChange = (e) => {
        const value = e.target.value;
        setCity(value);
        if (value) {
            const filtered = cities.filter((city) =>
                normalizeString(city).toLowerCase().includes(normalizeString(value).toLowerCase())
            );
            setFilteredCities(filtered);
        } else {
            setFilteredCities(cities);
        }
    };

    const handleCitySelect = (city) => {
        setCity(city);
        setFilteredCities([]);
    };

    const handleImageChange = (e) => {
      setImages([...e.target.files]);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setErrorMessage('');
      setSuccessMessage('');

      if (!categories.includes(category)) {
        setErrorMessage('Please select a valid category from the list.');
        return;
      }

      if (price < 0) {
        setErrorMessage('Price cannot be negative.');
        return;
      }

      if (images.length === 0) {
        setErrorMessage('Please upload at least one image.');
        return;
      }

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

    const handleBlur = () => {
        setTimeout(() => {
            setFilteredCategories([]);
            setFilteredCities([]);
        }, 200);
    };
  
    if (!user) {
      return <div>Please log in to create an ad.</div>;
    }

    return (
        <>
        <SimpleHeader />
        <div className="create-ad-container">
          <h2>Objavi oglas!</h2>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          {successMessage && <div className="success-message">{successMessage}</div>}
          <form onSubmit={handleSubmit}>
            <div>
              <label>Titula</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="form-input"
              />
            </div>
            <div>
              <label>Opis</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="form-input"
              />
            </div>
            <div>
              <label>Kategorija</label>
              <input
                type="text"
                value={category}
                onChange={handleCategoryChange}
                onFocus={() => setFilteredCategories(categories)}
                onBlur={handleBlur}
                required
                className="form-input"
              />
              {filteredCategories.length > 0 && (
                <ul className="suggestions-list">
                  {filteredCategories.map((cat, index) => (
                    <li key={index} onClick={() => handleCategorySelect(cat)}>
                      {cat}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div>
              <label>Grad</label>
              <input
                type="text"
                value={city}
                onChange={handleCityChange}
                onFocus={() => setFilteredCities(cities)}
                onBlur={handleBlur}
                required
                className="form-input"
              />
              {filteredCities.length > 0 && (
                <ul className="suggestions-list">
                  {filteredCities.map((city, index) => (
                    <li key={index} onClick={() => handleCitySelect(city)}>
                      {city}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div>
              <label>Cjena</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                min="0"
                required
                className="form-input"
              />
            </div>
            <div>
              <label>Slike</label>
              <input
                type="file"
                multiple
                onChange={handleImageChange}
                className="form-input"
                required
              />
            </div>
            <button type="submit" className="submit-button">Otvori oglas</button>
          </form>
        </div>
        </>
      );
  };
  
  export default CreateUserAd;