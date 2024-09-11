// src/components/Cart.js
import React, { useState, useEffect } from 'react';
import { fetchCart } from '../services/api';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const data = await fetchCart();
        setCartItems(data);
      } catch (error) {
        alert('Failed to load cart');
      }
    };

    loadCart();
  }, []);

  return (
    <div>
      <h2>Your Cart</h2>
      <div className="cart-list">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <h3>{item.product.name}</h3>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ${item.product.price}</p>
              <button>Remove</button>
            </div>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
    </div>
  );
};

export default Cart;
