import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import fastFoodLogo from '../images/LOGO.png';
import logousernot from '../images/logo_user_not.png';
import shipCard from '../images/shopping_cart_icon.png';
import im1 from '../images/image1.jpg';

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
          <button className="button-login" onClick={onUserClick}>
            <img src={logousernot} alt = "logo"/>
             {userName}
          </button>
          
        ) : (
          <button className="button-login " onClick={onLoginClick}>
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
  const [error, setError] = useState('');
  const [filteredProd, setFilteredProd] = useState([]);

  const navigate = useNavigate();


  useEffect(() => {
    // Здесь должна быть логика для проверки, вошел ли пользователь
    const userToken = localStorage.getItem('Bearer');
    if (userToken) {
      setIsLoggedIn(true);
      // Замените это на получение имени пользователя из вашего источника данных
      setUserName('Profile');
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
  const handleCartClick = () => {
    navigate('/cart');
  };



  useEffect(() => {
    // Fetch products logic here
    const token = localStorage.getItem('Bearer');
    fetch('/api/v1/products', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
       // Update product objects with image paths
       const updatedData = data.map((item, index) => ({
        ...item,
        image: im1
      }));
      setProd(updatedData);
      setFilteredProd(updatedData); // Initialize filtered products with all products
      })
      .catch(error => {
        setError(error.message);
        navigate('/error', { state: { error: error.message } });
      });
  }, []);


  useEffect(() => {
    // Search filter logic
    const filtered = prod.filter(item =>
      item.nazev.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.popis.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProd(filtered);
  }, [searchTerm, prod]);



  return (
    <div className={'product-card-clicked'}>
      <Header
        onLoginClick={() => setShowLogin(true)}

        onSearch={setSearchTerm}

        onAdminClick={handleAdminClick}
        isLoggedIn={isLoggedIn}
        userName={userName}
        onUserClick={handleUSerClick}
        onCartClick={handleCartClick}
      />

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

      <div className='products-list'>
        {filteredProd.map((item, index) => (
          <div key={index}>
      
            <h3>{item.nazev}</h3>
            <img src={item.image} alt={item.nazev} />
            <p>Description: {item.popis}</p>
            <p>Price: ₸{item.cena}</p>
            {/* Add to Cart button logic */}
          </div>
        ))}
      </div>

      <div className="questions" >
        <button className="button questionsNur" onClick={() => window.location.href = 'http://localhost:8000'}>
          Chat
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
