import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import fastFoodLogo from '../images/fastfoodlogo.jpg';

const Header = ({ onLoginClick, onCartClick, onSearch, onAdminClick, isLoggedIn, userName, onUserClick }) => (
  <header className="header">
    <input
      className="search"
      type="text"
      placeholder="Searching"
      onChange={(e) => onSearch(e.target.value)}
    />
    <div className="logo">
      <img src={fastFoodLogo} alt="Fast Food Logo" class="logojpg" />
    </div>
    <button className="button cart" onClick={onCartClick}>
      Shopping cart
    </button>
    {isLoggedIn ? (
      <button className="user-name" onClick={onUserClick}>Hello, {userName}</button>
    ) : (
      <button className="button login" onClick={onLoginClick}>
        Login
      </button>
    )}
    <button className="button admin" onClick={onAdminClick}>
      Admin
    </button>
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
    <div className={'product-card-clicked'}>
      <Header
        onLoginClick={() => setShowLogin(true)}
        onCartClick={() => setShowCart(true)}
        onSearch={handleSearch}
        onAdminClick={handleAdminClick}
        isLoggedIn={isLoggedIn}
        userName={userName}
        onUserClick={handleUSerClick}
      />
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
      <div style={{
        backgroundColor: 'white',
        height: '100px',
        width: '100%',
        position: 'fixed',
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <button className="button questionsNur" onClick={() => window.location.href = 'http://localhost:8000'}>
          Chat
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
