import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddProduct.css';
import { FaArrowLeft, FaEye } from 'react-icons/fa';
import { createProduct } from '../../services/productService';

function AddProduct() {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    category: '',
    price: '',
    imageUrl: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await createProduct(product);
  //     alert("Product added successfully!");
  //     navigate("/admin/view-products");
  //   }
  //   catch (error) {
  //     console.error("Error adding product:", error);
  //     alert("Failed to add product.");
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
  
      const formData = new FormData();
  
      formData.append("name", product.name);
      formData.append("category", product.category);
      formData.append("price", product.price);
      formData.append("image", product.image);
  
      await createProduct(formData);
  
      alert("Product added successfully!");
      navigate("/admin/view-products");
  
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product.");
    }
  };
  return (
    <div className="add-product-page">
      <div className="add-product-card">
        {/* Top Buttons */}
        <div className="top-buttons">
          <button className="nav-btn" onClick={() => navigate("/admin/dashboard")}>
            <FaArrowLeft style={{ marginRight: "6px" }} />
            Back to Dashboard
          </button>
          <button className="nav-btn" onClick={() => navigate("/admin/view-products")}>
            <FaEye style={{ marginRight: "6px" }} />
            View Products
          </button>
        </div>

        <h2>Add New Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input type="text" name="name" value={product.name} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Category:</label>
            <select
              className="form-select"
              name="category"
              value={product.category}
              onChange={handleChange}
              required
            >
              <option value="">Select category</option>
              <option value="Veg">Veg</option>
              <option value="NonVeg">NonVeg</option>
              <option value="Snacks">Snacks</option>
              <option value="Drinks">Drinks</option>
            </select>
          </div>

          <div className="form-group">
            <label>Price:</label>
            <input type="number" name="price" value={product.price} onChange={handleChange} required />
          </div>

          <div className="form-group">
          <label>Product Image:</label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setProduct({
                  ...product,
                  image: e.target.files[0]
                })
              }
            />
            {/* <input type="text" name="imageUrl" value={product.imageUrl} onChange={handleChange} />  */}
          </div>

          <button type="submit" className="add-btn">Add Product</button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;




