import React from 'react';
import { Link } from 'react-router-dom';
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

  return (
    <>
    <Header />
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="category-bar text-center scrollable-category-bar">
            {categories.map((category) => (
              <Link to={`/category/${category}`} key={category}>
                <button className="btn btn-outline-primary m-2">{category}</button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Home;