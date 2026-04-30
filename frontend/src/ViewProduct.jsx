import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ViewProduct.css';
import { buildAssetUrl } from './services/apiClient';
import { deleteProduct, getAllProducts } from './services/productService';

function ViewProduct() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await getAllProducts();
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
                src={buildAssetUrl(product.imageUrl)}
                alt={product.name}
                onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }}
              />
              <div className="product-info">
                <h3>{product.name}</h3>
                <p>Category: <strong>{product.category}</strong></p>
                <p>₹{product.price}</p>
              </div>
              <div className="product-actions">
                <button className="btn-update" onClick={() => handleUpdate(product.id)}>Update</button>
                <button className="btn-delete" onClick={() => handleDelete(product.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ViewProduct;
