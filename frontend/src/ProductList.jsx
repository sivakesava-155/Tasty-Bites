// src/components/ProductList.jsx
import React, { useEffect, useState } from 'react';
import { getProductsByCategory } from './services/productService';
import { buildAssetUrl } from './services/apiClient';

function ProductList({ category }) {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProductsByCategory(category)
    .then(res => setProducts(res.data))
    .catch(err => console.error("Error fetching products:", err));
  }, [category]);

  return (
    <div>
      <h2>{category} Items</h2>
      <ul>
        {products.map(prod => (
          <li key={prod.id}>
            <strong>{prod.name}</strong> - ₹{prod.price}
            <br />
            <img src={buildAssetUrl(prod.imageUrl || prod.image)} alt={prod.name} width="100" />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
