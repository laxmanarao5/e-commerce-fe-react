// src/components/Products.js
import React, { useState, useEffect } from 'react';
import { getSellerProducts, deleteSellerProduct, addProduct, getCategories } from '../services/api'; // API calls for products, cart, and categories
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal'; // Import Modal component

Modal.setAppElement('#root'); // Set the root element for accessibility

const SellerProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [mrp, setMrp] = useState('');
  const [stock, setStock] = useState('');
  const [discount, setDiscount] = useState('');
  const [price, setPrice] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false); // State to manage modal visibility
  const [description, setDescription] = useState('');
  const [images, setImages] = useState();
  
  const fetchProducts = async () => {
    try {
      setProducts([]);
      const response = await getSellerProducts();
      setProducts(response);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await getCategories(); // Fetch categories from API
      setCategories(response);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories(); // Fetch categories when component mounts
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!name || !category || !price || !description || !stock || !mrp || !discount) {
      toast.error("Please fill in all fields");
      return;
    }
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('category', category);
      formData.append('description', description);
      formData.append('stock', stock);
      formData.append('marked_price', mrp);
      formData.append('discount', discount);
      formData.append('price', price);
      formData.append('image', images);
      await addProduct(formData); // Replace with your add product API call
      toast.success("Product added successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setName(''); // Reset form fields
      setCategory('');
      setPrice('');
      setModalIsOpen(false); // Close modal after adding product
      fetchProducts(); // Refresh product list
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await deleteSellerProduct(productId);
      toast.success("Product deleted successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Seller Products</h1>

      {/* Button to open modal */}
      <button
        onClick={() => setModalIsOpen(true)}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mb-8"
      >
        + Add Product
      </button>

      {/* Product Form Modal */}
      <Modal
    isOpen={modalIsOpen}
    onRequestClose={() => setModalIsOpen(false)}
    contentLabel="Add Product Modal"
    className="bg-white p-8 rounded-lg shadow-lg mx-auto w-50" // Removed mt-20 here
    overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >

        <form onSubmit={handleAddProduct}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Product Name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Product Description"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex mb-4">
            <div className="w-1/2 pr-2">
              <label className="block text-gray-700 mb-2">MRP</label>
              <input
                type="number"
                value={mrp}
                onChange={(e) => {
                  setPrice((100 - discount) * e.target.value / 100);
                  setMrp(e.target.value);
                }}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="MRP"
              />
            </div>
            <div className="w-1/2 pl-2">
              <label className="block text-gray-700 mb-2">Discount</label>
              <input
                type="number"
                value={discount}
                onChange={(e) => {
                  setPrice((100 - e.target.value) * mrp / 100);
                  setDiscount(e.target.value);
                }}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Discount (%)"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
                setDiscount((100 * mrp - price) / mrp);
              }}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Price"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Stock</label>
            <input
              type="number"
              value={stock}
              onChange={(e) => {
                setStock(e.target.value);
              }}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Stock"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Images</label>
            <input
              type="file"
              onChange={(e) => setImages(e.target.files[0])} // Update state with selected image file
              className="w-full p-2 border border-gray-300 rounded"
              accept="image/*" // Accept only image files
            />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Add Product
            </button>
            <button
              type="button"
              onClick={() => setModalIsOpen(false)}
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>

      {/* Product List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-6 rounded-lg shadow-md">
            <img
              src={product.images.length && product.images[0].image ? product.images[0].image : ''}
              alt={product.name}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h2 className="text-xl font-bold mb-2">{product.name}</h2>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <p className="text-gray-800 font-semibold mb-2">Price: ₹{product.price}</p>
            <p className="text-gray-600 mb-2">Stock: {product.stock}</p>
            <button
              onClick={() => handleDeleteProduct(product.id)}
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            >
              Delete Product
            </button>
          </div>
        ))}
      </div>
      
      <ToastContainer />
    </div>
  );
};

export default SellerProducts;
