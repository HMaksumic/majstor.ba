import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext'; 
import Header from '../components/header/Header';

function Profile() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <Header />
      <h1>Welcome, {user.name}!</h1>
    </div>
  );
}

export default Profile;