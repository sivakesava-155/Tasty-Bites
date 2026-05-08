import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ViewProduct.css';
import { buildAssetUrl } from '../../services/apiClient';
import { deleteProduct, getAllProducts } from '../../services/productService';

function ViewProduct() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await getAllProducts();
      console.log(res.data);
      setProducts(res.data?.products || res.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      alert("✅ Product deleted!");
      fetchProducts();
    } catch (error) {
      console.error("Delete failed", error);
      alert("❌ Could not delete product.");
    }
  };

  const handleUpdate = (id) => {
    navigate(`/admin/update/${id}`);
  };

  return (
    <div className="view-products-container">
      <h2 className="section-title">All Products</h2>
      {products.length === 0 ? (
        <p className="no-products-msg">No products available.</p>
      ) : (
        <div className="product-grid">
          {products.map(product => (
            <div className="product-card" key={product.id}>
              <img
              src={product.image}
              alt={product.name}
              onError={(e) => {
                e.target.src = "/no-image.png";
              }}
            />
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p>Category: <strong>{product.category}</strong></p>
                <p>₹{product.price}</p>
              </div>

              <div className="card-actions">
                <button className="edit-btn" onClick={() => handleUpdate(product._id)}>Update</button>
                <button className="delete-btn" onClick={() => handleDelete(product._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ViewProduct;
