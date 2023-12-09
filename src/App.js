import React, { useState } from 'react';
import './App.css';


import ShoppingCart from './cartPage/ShoppingCart';
import LoginPage from './loginPage/LoginPage';
import RegisterPage from './regPage/RegistrationPage';
import ProductCard from './productCard/ProductCard';
import fastFoodLogo from './images/fastfoodlogo.jpg';
import AdminPage from './AdminPage/adminPage';
import FeedbackForm from './FeedBackForm/FeedBackForm.js'

const Header = ({ onLoginClick, onCartClick, onSearch, onAdminClick, onQuestions }) => (
  <header className="header">
    <div className="logo">
      <img src={fastFoodLogo} alt="Fast Food Logo" />
    </div>
    <input className="search"
      type="text"
      placeholder="Searching"
      onChange={(e) => onSearch(e.target.value)}
    />
    <button className="button cart" onClick={onCartClick}>Shopping cart</button>
    <button className="button login" onClick={onLoginClick}>Login</button>
    <button className = "button admin" onClick = {onAdminClick}>Admin</button>
    <button className = "button questions" onClick = {onQuestions}>Feedback</button>
  </header>
);


function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAdmin, setShowAdmin] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);

  /* const { createProxyMiddleware } = require('http-proxy-middleware');
 
 module.exports = function(app) {
   app.use(
     '/api',
     createProxyMiddleware({
       target: 'http://localhost:8080',
       changeOrigin: true,
     })
   );
 };
 */

  const products = [
  ];

  const handleAddToCart = (selectedProduct) => {
    setCartItems([...cartItems, selectedProduct]);
  };

  const handleSearch = (searchValue) => {
    setSearchTerm(searchValue);
  };

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      {!showLogin && !showCart && !showRegister && !showAdmin && (
        <>
          <Header
            onLoginClick={() => setShowLogin(true)}
            onCartClick={() => setShowCart(true)}
            onSearch={handleSearch}
            onAdminClick={() => setShowAdmin(true)}
            onQuestions={() => setShowQuestions(true)}
          />
          <main className="main-content">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                {...product}
                onClick={handleAddToCart}
              />
            ))}
          </main>
        </>
      )}


      {showLogin && (
        <LoginPage
          onBack={() => setShowLogin(false)}
          onRegister={() => {
            setShowLogin(false);
            setShowRegister(true);
          }}
        /*onLogin={{()=>}}*/
        />
      )}

      {showCart && (
        <ShoppingCart cartItems={cartItems} onClose={() => setShowCart(false)} />
      )}

      {showRegister && (
        <RegisterPage onBack={() => setShowRegister(false)} />
      )}
      {showAdmin && (
        <AdminPage onBack={() => setShowAdmin(false)} />
      )}

      {showQuestions && (
        <FeedbackForm onBack={() => setShowQuestions(false)}/>
      )}
    </div>
  );
}

export default App;