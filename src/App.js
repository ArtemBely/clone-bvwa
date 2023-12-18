import React, { useEffect, useState } from 'react';
import './App.css';
import { useNavigate, BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import ShoppingCart from './cartPage/ShoppingCart';
import LoginPage from './loginPage/LoginPage';
import RegisterPage from './regPage/RegistrationPage';
import ProductList from './productCard/ProductCard';
import AdminPage from './AdminPage/adminPage';
import ProductCard from './productCard/ProductCard';
import UserEdit from './userEditPage/UserEdit';
import UserPage from './userPage/UserPage';
import ErrorPage from './errorPage/error';

function App() {
  return (
    <div className="App">
      <Router>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<UserEdit />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/products" element={<ProductCard />} />
            <Route path="/useredit" element={<UserEdit />} />
            <Route path="/cart" element={<ShoppingCart />} />
            <Route path="/user" element={<UserPage />} />
            <Route path="/cart" element={<ShoppingCart />} />
            {/* Другие маршруты */}
          </Routes>
        </main>
      </Router>


    </div>
  );
}

export default App;