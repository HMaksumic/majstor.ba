import React from 'react';
import { useParams } from 'react-router-dom';

const CategoryPage = () => {
  const { categoryName } = useParams();

  return (
    <div className="container">
      <h1>{categoryName}</h1>
      <p>Content for {categoryName} will be displayed here.</p>
    </div>
  );
};

export default CategoryPage;