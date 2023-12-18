import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import fastFoodLogo from '../images/LOGO.png';
import logousernot from '../images/logo_user_not.png';
import shipCard from '../images/shopping_cart_icon.png';

const Header = ({ 
  onLoginClick, 
  onCartClick, 
  onSearch, 
  onAdminClick, 
  isLoggedIn, 
  userName, 
  onUserClick 
}) => (
  <header className="header">
    <div className="start-head">

    </div>
    {/*<input
      className="search"
      type="text"
      placeholder="Searching"
      //onChange={(e) => onSearch(e.target.value)}
/>*/}
    <div className="logo">
      <img src={fastFoodLogo} alt="Fast Food Logo" />
    </div>
    
    <div className="popopo">
      <button className="button cart" onClick={onCartClick}>
        <img src={shipCard} alt="card"/>
      </button>

        <button className="button admin" onClick={onAdminClick}>
          Admin
        </button>

        {isLoggedIn ? (
          <button className="user-name" onClick={onUserClick}>Hello, {userName}</button>
        ) : (
          <button className="button-login ll" onClick={onLoginClick}>
            <img src={logousernot} alt = "logo"/>
            Login
          </button>
        )}
    </div>
  </header>
);

const ProductCard = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [prod, setProd] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    // Здесь должна быть логика для проверки, вошел ли пользователь
    const userToken = localStorage.getItem('Bearer');
    if (userToken) {
      setIsLoggedIn(true);
      // Замените это на получение имени пользователя из вашего источника данных
      setUserName('John Doe');
    }
  }, []);

  const handleAddToCart = (selectedProduct) => {
    setCartItems([...cartItems, selectedProduct]);
  };

  const handleSearch = (searchValue) => {
    setSearchTerm(searchValue);
  };

  const handleAdminClick = () => {
    navigate('/admin');
  };
  const handleUSerClick = () => {
    navigate('/user');
  };

  useEffect(() => {
    const token = localStorage.getItem('Bearer'); // Определяем token здесь

    try {
      fetch('/api/v1/products', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(data => {
          setProd(data);
        })
        .catch(error => {
          console.error('Ошибка аутентификации:', error);
        });
    } catch (error) {
      console.error('Ошибка запроса:', error);
    }
  }, []);


  return (
    <div >
      <Header
        onLoginClick={() => setShowLogin(true)}
        onCartClick={() => setShowCart(true)}
        onSearch={handleSearch}
        onAdminClick={handleAdminClick}
        isLoggedIn={isLoggedIn}
        userName={userName}
        onUserClick={handleUSerClick}
      />
    
    {/*down search*/}
    
      <div className="starving-section">
        <h1>Are you starving?</h1>
        <div className="search-bar-container">
          <input
            className="search"
            type="text"
            placeholder="Searching"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>

      {prod.map((item, index) => (
        <div className='products-list'>
          <li key={index} >
            <div>
              <h3>{item.nazev}</h3>
              <p>Description: {item.popis}</p>
              <p>Price: ${item.cena}</p>
            </div>
          </li>
        </div>
      ))}


      <div className="questions" >
        <button className="button questionsNur" onClick={() => window.location.href = 'http://localhost:8000'}>
          Chat
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
