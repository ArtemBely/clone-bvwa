import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import fastFoodLogo from '../images/LOGO.png';
import logousernot from '../images/logo_user_not.png';
import shipCard from '../images/shopping_cart_icon.png';
import ShoppingCart from '../cartPage/ShoppingCart';

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
    <div className="start-head"></div>
    <div className="logo">
      <img src={fastFoodLogo} alt="Fast Food Logo" />
    </div>
    <div className="popopo">
      <button className="button cart" onClick={onCartClick}>
        <img src={shipCard} alt="card" />
      </button>
      <button className="button admin" onClick={onAdminClick}>
        Admin
      </button>
      {isLoggedIn ? (
        <button className="button-login" onClick={onUserClick}>
          <img src={logousernot} alt="logo" />
          {userName}
        </button>
      ) : (
        <button className="button-login " onClick={onLoginClick}>
          <img src={logousernot} alt="logo" />
          Login
        </button>
      )}
    </div>
  </header>
);

const ProductCard = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [prod, setProd] = useState([]);
  const [error, setError] = useState('');
  const [filteredProd, setFilteredProd] = useState([]);
  const [photoUrls, setPhotoUrls] = useState({});
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem('Bearer');
    if (userToken) {
      setIsLoggedIn(true);
      setUserName('Profile');
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('Bearer');
    if (token) {
      setIsLoggedIn(true);
      setUserName('Profile');
      fetchProducts(token);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('Bearer'); // Удаляем токен аутентификации
    localStorage.removeItem('UserEmail'); // Удаляем email пользователя
    navigate('/'); // Перенаправляем на страницу логина
  };

  const fetchProducts = async (token) => {
    try {
      const response = await fetch('/api/v1/products', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const productsData = await response.json();
      setProd(productsData);
      setFilteredProd(productsData);
      productsData.forEach((product) => {
        fetchProductImage(product.id, token);
      });
    } catch (error) {
      setError(error.message);
      navigate('/error', { state: { error: error.message } });
    }
  };

  const fetchProductImage = async (itemId, token) => {
    try {
      const response = await fetch(`/api/v1/products/${itemId}/photo`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch product photo');
      }
      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setPhotoUrls((prevUrls) => ({
        ...prevUrls,
        [itemId]: imageUrl
      }));
    } catch (error) {
      console.error('Error fetching photo:', error.message);
    }
  };

  useEffect(() => {
    const filtered = prod.filter((item) =>
      item.nazev.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.popis.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProd(filtered);
  }, [searchTerm, prod]);

  const handleCartClick = () => {
    setIsCartModalOpen(!isCartModalOpen);
  };

  const handleAdminClick = () => {
    navigate('/admin');
  };

  const handleUserClick = () => {
    navigate('/user');
  };

  const addToCart = (item) => {
    console.log(item.nazev);
    setCartItems((prevItems) => [...prevItems, item]);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  return (
    <div className={'product-card-clicked'}>
      <Header
        onLoginClick={() => setShowLogin(true)}
        onSearch={handleSearch}
        onAdminClick={handleAdminClick}
        isLoggedIn={isLoggedIn}
        userName={userName}
        onUserClick={handleUserClick}
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
      <div>
        {filteredProd.map((item, index) => (
          <div key={index} className='products-list'>
            <h3>{item.nazev}</h3>
            <img src={photoUrls[item.id]} alt={`${item.nazev}`} />
            <p>Description: {item.popis}</p>
            <p>Price: ₸{item.cena}</p>
            <button onClick={() => addToCart(item)}>Add to cart</button>
          </div>
        ))}
      </div>
      {isCartModalOpen && (
        <ShoppingCart
          cartItems={cartItems}
          closeCart={() => setIsCartModalOpen(false)}
        />
      )}
      <div className="questions">
        <button
          className="button questionsNur"
          onClick={() => window.location.href = 'http://localhost:8000'}
        >
          Chat
        </button>
        <button
          className="button logout"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
