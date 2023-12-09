import React, { useState } from 'react';
import './App.css';


import ShoppingCart from './cartPage/ShoppingCart';
import LoginPage from './loginPage/LoginPage';
import RegisterPage from './regPage/RegistrationPage';
import ProductCard from './productCard/ProductCard';
import fastFoodLogo from './images/fastfoodlogo.jpg';
import AdminPage from './AdminPage/adminPage';

const Header = ({ onLoginClick, onCartClick, onSearch, onAdminClick }) => (
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
    
  </header>
);


function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAdmin, setShowAdmin] = useState(false);

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
      
      <div style={{ backgroundColor: 'white', height: '100px', width: '100%', position: 'fixed', bottom: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {/* Добавьте вашу кнопку здесь */}
        <button className = "button questionsNur" onClick={() => window.location.href = 'http://localhost:8000'}>Chat</button>
      </div>
    </div>
  );
}

export default App;