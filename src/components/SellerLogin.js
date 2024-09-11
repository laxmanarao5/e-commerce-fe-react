// src/components/SellerLogin.js
import React, { useState } from 'react';
import {loginSeller} from '../services/api'
import { useNavigate } from 'react-router-dom'
const SellerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = await loginSeller(email,password)
    localStorage.setItem('access_token', res.access_token)
    localStorage.setItem('user_name', res.seller.name)
    navigate('/seller/products')
    console.log(res.access_token)
    // API call for seller login
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-bold text-gray-700 mb-4">Seller Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default SellerLogin;
