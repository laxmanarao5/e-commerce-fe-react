// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-500 to-teal-500">
      <div className="bg-white p-10 rounded-lg shadow-xl text-center">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">Welcome to Our Store</h1>
        {/* <img src="path_to_logo.png" alt="Logo" className="w-40 mx-auto mb-8" /> */}

        <div className="space-y-4">
          <Link to="/login">
            <button className="w-full bg-blue-600 text-white py-3 px-5 rounded-md font-medium hover:bg-blue-700 transition duration-300 mb-4">
              User Login
            </button>
          </Link>
          <Link to="/seller-login">
            <button className="w-full bg-green-600 text-white py-3 px-5 rounded-md font-medium hover:bg-green-700 transition duration-300 mb-4">
              Seller Login
            </button>
          </Link>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">New to our platform?</h2>
          <div className="space-y-4">
            <Link to="/signup/user">
              <button className="w-full bg-purple-500 text-white py-3 px-5 rounded-md font-medium hover:bg-purple-600 transition duration-300 mb-4">
                Sign Up as User
              </button>
            </Link>
            <Link to="/signup/user">
              <button className="w-full bg-yellow-500 text-white py-3 px-5 rounded-md font-medium hover:bg-yellow-600 transition duration-300 mb-4">
                Sign Up as Seller
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
