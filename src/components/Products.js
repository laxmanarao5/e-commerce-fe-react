import React, { useState, useEffect } from 'react';
import { getProducts, addToCart, getCartItems, updateCartItem, placeOrder , removeFromCart,getOrders, cancelOrder, getCategories} from '../services/api'; // Updated API calls
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Slider from '@mui/material/Slider';
const Products = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [categories,setCategories] =  useState([]);
  const [activeTab, setActiveTab] = useState('products');
  const [total, setTotal] = useState([])
  const [orders, setOrders] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null); // Selected category filter
  const [priceRange, setPriceRange] = useState([0, 1000]); // Price range filter

  useEffect(() => {
    fetchCategories();
    
  }, []);
  useEffect(() => {
    console.log("tst","use effect")
    const fetchProducts = async () => {
      try {
        console.log("ttttt", "fetch func")
        const response = await getProducts({ category: null, priceRange:[null,null]});
        setProducts(response);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (activeTab === 'cart') {
      fetchCartItems();
    }
    if( activeTab === 'orders'){
      fetchOrders()
    }
  }, [activeTab]);

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  

  const fetchCartItems = async () => {
    try {
      const response = await getCartItems();
      setCartItems(response);
      let total = response.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
      console.log(total)
      setTotal(total)
      console.log(response);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };
  const fetchOrders = async () => {
    try {
      const response = await getOrders();
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };
  
  const handleAddToCart = async (product) => {
    try {
      await addToCart(product.id);
      toast.success("Product added to cart", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      if (activeTab === 'cart') {
        fetchCartItems();
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  const handleQuantityChange = async (cartItemId, newQuantity) => {
    try {
      await updateCartItem(cartItemId, newQuantity);
      toast.success(`Quantity updated to ${newQuantity} successfully`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      fetchCartItems(); // Refresh cart items after update
    } catch (error) {
      console.error('Error updating cart item:', error);
    }
  };

  const handlePlaceOrder = async () => {
    try {
      await placeOrder();
      toast.success("Order placed successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setCartItems([]); // Clear cart after successful order
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };
  const handleRemoveFromCart = async (cartId) => {
    try {
      await removeFromCart(cartId);
      toast.success("Item removed successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      fetchCartItems() 
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };
  const handleCancelOrder = async ( orderId ) => {
    await cancelOrder(orderId)
    toast.success("Order cancelled successfully", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    fetchOrders()

  }
  const handleCategoryChange = async ( e ) => {
    setSelectedCategory(e.target.value);
    const response = await getProducts({category: e.target.value, priceRange: priceRange });
    setProducts(response);
  }
  const handlePriceRangeChange = async ( e,newValue ) => {
    setPriceRange(newValue);
    const response = await getProducts({category: selectedCategory, priceRange: newValue });
    setProducts(response);
  }



  return (
    <div className="bg-gray-100 min-h-screen p-8">
      {/* <h1 className="text-4xl font-bold text-center mb-8">Product Management</h1> */}

      <div className="flex justify-center space-x-4 mb-8">
        <button
          onClick={() => setActiveTab('products')}
          className={`py-2 px-4 rounded ${activeTab === 'products' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Products
        </button>
        <button
          onClick={() => setActiveTab('cart')}
          className={`py-2 px-4 rounded ${activeTab === 'cart' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Cart
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`py-2 px-4 rounded ${activeTab === 'orders' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Orders
        </button>
      </div>
      <ToastContainer />
      <div>
        {activeTab === 'products' && (
          <div>
          <div className="mb-4">
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="p-2 border rounded"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            {/* Price Range Filter */}
            <div className="mb-4">
      <label className="block mb-2">
        Price Range: ${priceRange[0]} - ${priceRange[1]}
      </label>
      <Slider
        value={priceRange}
        onChange={handlePriceRangeChange}
        valueLabelDisplay="auto"
        min={0}
        max={10000}
        step={100}
        sx={{ width: '50%' }}
      />
    </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div key={product.id} className="bg-white p-6 rounded-lg shadow-md">
                <img
                  src={product.images.length && product.images[0].image ? product.images[0].image:''}
                  alt={product.name}
                  className="w-full h-40 object-cover mb-4 rounded"
                />
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-700 mb-4"><b>₹{product.price}</b> <del>{product.marked_price}</del> <div className='text-green-700'>{product.discount}% off</div></p>
                {product.stock <=0 ? <span className="inline-block bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                                        Out of stock
                      </span>  :<button
                  onClick={() => handleAddToCart(product)}
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
                >
                  Add to Cart
                </button>
                  }
                
              </div>
            ))}
          </div>
          </div>
        )}

        {activeTab === 'cart' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Cart Items</h2>
            {cartItems.length === 0 ? (
              <p>No items in cart.</p>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
                    <div className="flex-1">
                      <img
                        src={item.product.images.length && item.product.images[0].image ? item.product.images[0].image:''}
                        alt={item.product.name}
                        className="w-24 h-24 object-cover mb-4 rounded"
                      />
                      <h3 className="text-xl font-semibold mb-2">{item.product.name}</h3>
                      <p className="text-gray-700 mb-2">Price: ₹{item.product.price}</p>
                      <p className="text-gray-700 mb-2">Subtotal: ₹{item.quantity * item.product.price}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                        className="border border-gray-300 p-2 rounded"
                      />
                      <button
                        onClick={() => handleRemoveFromCart(item.id)}
                        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
                <div className='pt-3 pl-3'>
                  <span className='highlight-text'>Total amount :</span>
                  <span className='total-amount-badge'>${total}</span>
                </div>
                <button
                  onClick={handlePlaceOrder}
                  className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 mt-4"
                >
                  Place Order
                </button>
              </div>
            )}
          </div>
        )}
        {activeTab === 'orders' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Orders</h2>
            {orders.length === 0 ? (
              <p>No orders found.</p>
            ) : (
              <div className="space-y-4">
                {orders.map((item) => (
                  <div key={item.id} className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
                    <div className="flex-1">
                      <img
                        src={item.product.images.length && item.product.images[0].image ? item.product.images[0].image:''}
                        alt={item.product.name}
                        className="w-24 h-24 object-cover mb-4 rounded"
                      />
                      <h3 className="text-xl font-semibold mb-2">{item.product.name}</h3>
                      <p className="text-gray-700 mb-2"> Quantity: { item.quantity }</p>
                      <p className="text-gray-700 mb-2"> Unit Price: ₹{ item.product.price }</p>
                      <p className="text-gray-700 mb-2">Total Price: ₹{item.total_price}</p>
                      <p className="text-gray-700 mb-2">Order placed : {item.created_at}</p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                    {!item.cancelled_at && <button
                        onClick={() => handleCancelOrder(item.id)}
                        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                      >
                        Cancel
                      </button>
                      }
                      {item.cancelled_at && (
                      <span className="inline-block bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                                        Cancelled
                      </span>
                      )}
                    </div> 
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
