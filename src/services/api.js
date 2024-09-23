// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:5000'; // Replace with your actual API URL

// Login API
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Login failed:", error.response?.data);
    throw error.response?.data;
  }
};

// Login API
export const loginSeller = async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/seller/login`, {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      console.error("Login failed:", error.response?.data);
      throw error.response?.data;
    }
  };

// Signup API for Users
export const signupUser = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/register`, data, {
        headers: {
            'Content-Type': 'application/json'
          }
    });
    return response.data;
  } catch (error) {
    console.error("User Signup failed:", error.response?.data);
    throw error.response?.data;
  }
};

// Signup API for Sellers
export const signupSeller = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/seller/register`, data, {
        headers: {
            'Content-Type': 'application/json'
          }
    });
    return response;
  } catch (error) {
    console.error("Seller Signup failed:", error.response?.data);
    throw error.response?.data;
  }
};

// Fetch Products API
export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`);
    return response.data;
  } catch (error) {
    console.error("Fetching products failed:", error.response?.data);
    throw error.response?.data;
  }
};

// Add to Cart API
export const addToCart = async (productId, quantity) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/cart/add`, {
      product_id:productId,
      quantity:1,
    },
    {
      headers:{
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
    }});
    return response.data;
  } catch (error) {
    console.error("Add to cart failed:", error.response?.data);
    throw error.response?.data;
  }
};

// Fetch Cart API
export const fetchCart = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/cart`);
    return response.data;
  } catch (error) {
    console.error("Fetching cart failed:", error.response?.data);
    throw error.response?.data;
  }
};

// Fetch Cart API
export const getProducts = async (queryObj) => {
    try {
      console.log(queryObj,"queryobj")
      const response = await axios.get(`${API_BASE_URL}/products`,{
        headers:{
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }});
      return response.data;
    } catch (error) {
      console.error("Fetching cart failed:", error.response?.data);
      throw error.response?.data;
    }
  };

  // Fetch Cart API
export const getCartItems = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/cart/items`,{
      headers:{
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }});
      console.log(response.data)
    return response.data.data
  } catch (error) {
    console.error("Fetching cart failed:", error.response?.data);
    throw error.response?.data;
  }
};

export const getOrders = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/orders`,{
      headers:{
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }});
    return response.data;
  } catch (error) {
    console.error("Fetching cart failed:", error.response?.data);
    throw error.response?.data;
  }
};
export const updateCartItem = async (cartItemId, newQuantity) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/cart/quantity`,{
      cart_item_id: cartItemId, quantity: newQuantity
    },{
      headers:{
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }});
    return response.data;
  } catch (error) {
    console.error("Fetching cart failed:", error.response?.data);
    throw error.response?.data;
  }
};
export const placeOrder = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/order`,{},{
      headers:{
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }});
      console.log(response,"API")
    return response.data;
  } catch (error) {
    console.error("Fetching cart failed:", error.response?.data);
    throw error.response?.data;
  }
};
export const removeFromCart = async (cartId) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/cart/remove`,{
      cart_item_id : cartId
    },{
      headers:{
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }});
    return response.data;
  } catch (error) {
    console.error("Fetching cart failed:", error.response?.data);
    throw error.response?.data;
  }
};

export const cancelOrder = async (orderId) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/order/cancel`,{
      order_id : orderId
    },{
      headers:{
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }});
    return response.data;
  } catch (error) {
    console.error("Fetching cart failed:", error.response?.data);
    throw error.response?.data;
  }
};


