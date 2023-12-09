import React, { useState, useEffect } from 'react';

const ShoppingCart = ({ onClose, cartItems }) => {

  const [products, setProducts] = useState([]);
  const token = localStorage.getItem('Bearer');

  fetch('/api/v1/products', {
    method: 'GET', // или 'POST', 'PUT' и т.д.
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
    .then(response => response.json())
    .then(data => {
      setProducts(data);
    })
    .catch(error => {
      console.error('Ошибка аутентификации:', error);
    });


  return (
    <div className="shopping-cart-container">
      <div className="shopping-cart">
        <h2>Shopping Cart</h2>
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              <div>
                <h3>{item.nazev}</h3>
                <p>Description: {item.popis}</p>
                <p>Price: ${item.cena}</p>
              </div>
            </li>
          ))}
        </ul>
        <ul>
          {products.map((item, index) => (
            <li key={index}>
              <img src={item.image} alt={item.nazev} />
              <div>
                <h3>{item.nazev}</h3>
                <p>Description: {item.popis}</p>
                <p>Price: ${item.cena}</p>
              </div>
            </li>
          ))}
        </ul>
        <button onClick={onClose} className="close-button">
          Close
        </button>
      </div>
    </div>
  );
};

export default ShoppingCart;
