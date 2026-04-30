import apiClient from "./apiClient";

export const getAllProducts = (params = {}) => apiClient.get("/products", { params });
export const getProductById = (id) => apiClient.get(`/products/${id}`);
export const getProductsByCategory = (category) =>
  apiClient.get(`/products/category/${category}`);
export const createProduct = (payload) => apiClient.post("/products", payload);
export const updateProduct = (id, payload) => apiClient.put(`/products/${id}`, payload);
export const deleteProduct = (id) => apiClient.delete(`/products/${id}`);
