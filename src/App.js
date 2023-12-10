import React, { useEffect, useState } from 'react';
import './App.css';
import { useNavigate, BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import ShoppingCart from './cartPage/ShoppingCart';
import LoginPage from './loginPage/LoginPage';
import RegisterPage from './regPage/RegistrationPage';
import ProductList from './productCard/ProductCard';
import fastFoodLogo from './images/fastfoodlogo.jpg';
import AdminPage from './AdminPage/adminPage';
import ProductCard from './productCard/ProductCard';

function App() {
  return (
    <div className="App">
      <Router>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/products" element={<ProductCard />} />
            {/* Другие маршруты */}
          </Routes>
        </main>
      </Router>


    </div>
  );
}

export default App;
