// src/components/Products.js
import React, { useState, useEffect } from 'react';
import { getProducts, addToCart } from '../services/api'; // API calls for products and cart

const SellerProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setProducts([])
        const response = await getProducts();
        setProducts([]);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = async (product) => {
    try {
      await addToCart(product.id);
      alert('Product added to cart');
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-4xl font-bold text-center mb-8"> Seller Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-6 rounded-lg shadow-md">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover mb-4 rounded"
            />
            <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
            <p className="text-gray-700 mb-4">${product.price}</p>
            <button
              onClick={() => handleAddToCart(product)}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SellerProducts;
