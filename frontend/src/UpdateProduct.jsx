import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './UpdateProduct.css';
import { getAllProducts, updateProduct } from './services/productService';

function UpdateProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    category: '',
    price: '',
    imageUrl: ''
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getAllProducts();
        const items = res.data?.products || res.data || [];
        const found = items.find((p) => p.id === id || p._id === id);
        if (found) setProduct(found);
      } catch (error) {
        console.error("Fetch failed:", error);
        alert("Failed to load product.");
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProduct(id, product);
      alert("✅ Product updated!");
      navigate('/admin/dashboard');
    } catch (error) {
      console.error("Update failed:", error);
      alert("❌ Could not update product.");
    }
  };

  return (
    <div className="update-product-container">
      <div className="update-product-card">
        <h2>Update Product</h2>
        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input name="name" value={product.name} onChange={handleChange} required />

          <label>Category</label>
          <input name="category" value={product.category} onChange={handleChange} required />

          <label>Price</label>
          <input name="price" type="number" value={product.price} onChange={handleChange} required />

          <label>Image URL</label>
          <input name="imageUrl" value={product.imageUrl} onChange={handleChange} />

          <button type="submit">Update Product</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateProduct;
