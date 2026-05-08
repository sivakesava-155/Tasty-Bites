import apiClient from "./apiClient";

export const getAllProducts = () =>
  apiClient.get("/products/getProducts");

export const createProduct = (formData) =>
  apiClient.post("/products/saveProduct", 
    formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  }); 
export const createAllProducts = (payload) =>
  apiClient.post("/products/saveAllProducts", payload);


export const updateProduct = (id, formData) =>
  apiClient.put(
    `/products/updateProduct/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  );

  export const deleteProduct = (id) =>
    apiClient.delete(
      `/products/deleteProduct/${id}`
    );
    export const getProductsByCategory = (category) =>
      apiClient.get(`/products/category/${category}`);



















export const getProductById = (id) => apiClient.get(`/products/${id}`);


// export const updateProduct = (id, payload) => apiClient.put(`/products/${id}`, payload);
// export const deleteProduct = (id) => apiClient.delete(`/products/${id}`);
