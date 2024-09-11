// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import SellerLogin from './components/SellerLogin';
import SignupUser from './components/SignupUser';
import SignupSeller from './components/SignupSeller';
import Products from './components/Products';
import Cart from './components/Cart';
import SellerProducts from './components/SellerProducts';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/seller-login" element={<SellerLogin />} />
          <Route path="/signup/user" element={<SignupUser />} />
          <Route path="/signup/seller" element={<SignupSeller />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/seller/products" element={<SellerProducts />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
