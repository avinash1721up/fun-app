import React from 'react';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/form');
  };

  return (
    <div className="home-page">
      <h1>Just for FUN'</h1>
      <button className="start-fun-btn"  onClick={handleClick}>Start Fun</button>
      <Footer />
    </div>
  );
}

export default HomePage;
