// Backward-compat wrapper. Prefer importing from ./services/productService directly.
export {
  getAllProducts as fetchAllProducts,
  getProductsByCategory as fetchProductByCategory,
  createProduct,
  updateProduct,
  deleteProduct
} from './services/productService';
