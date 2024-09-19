import React, { useState, useEffect } from 'react';
import { getProducts, addToCart, getCartItems, updateCartItem, placeOrder , removeFromCart} from '../services/api'; // Updated API calls
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
const Products = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [activeTab, setActiveTab] = useState('products');
  const [total, setTotal] = useState([])

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (activeTab === 'cart') {
      fetchCartItems();
    }
  }, [activeTab]);

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response);
      console.log(response);
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

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Product Management</h1>

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
                        // src={item.product.image}
                        alt={item.product.name}
                        className="w-24 h-24 object-cover mb-4 rounded"
                      />
                      <h3 className="text-xl font-semibold mb-2">{item.product.name}</h3>
                      <p className="text-gray-700 mb-2">Price: ${item.product.price}</p>
                      <p className="text-gray-700 mb-2">Subtotal: ${item.quantity * item.product.price}</p>
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
      </div>
    </div>
  );
};

export default Products;
