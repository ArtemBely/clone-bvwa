import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import fastFoodLogo from '../images/LOGO.png';

const Header = ({ onLoginClick, onCartClick, onSearch, onAdminClick, isLoggedIn, userName, onUserClick }) => (
  <header className="header">
    <input
      className="search"
      type="text"
      placeholder="Searching"
      onChange={(e) => onSearch(e.target.value)}
    />
    <div className="logo">
      <img src={fastFoodLogo} alt="Fast Food Logo" />
    </div>
    <button className="button cart" onClick={onCartClick}>
      Shopping cart
    </button>
    {isLoggedIn ? (
      <button className="user-name" onClick={onUserClick}> {userName}</button>
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
        image: `..src/images/image${index + 1}.jpg` // Пример пути к изображению
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
