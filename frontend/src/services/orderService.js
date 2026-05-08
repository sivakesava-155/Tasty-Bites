import apiClient from "./apiClient";
// services/orderService.js
export const getMyOrders = (userId) =>
  apiClient.get(`/orders/user/${userId}`);

export const getOrders = () =>
  apiClient.get("/orders");

export const getOrderById = (id) =>
  apiClient.get(`/orders/${id}`);

export const getAllOrders = () =>
  apiClient.get("/orders");

export const checkoutOrder = (payload) =>
  apiClient.post("/orders", payload);

export const updateOrderStatus = (id, status) =>
  apiClient.put(`/orders/${id}/status`, { status });

export const deleteOrder = (id) =>
  apiClient.delete(`/orders/${id}`);


//   apiClient.put(`/orders/${id}/status`, { status });

export const getAnalyticsSummary = () => apiClient.get("/analytics/summary");
export const getDailyRevenue = () => apiClient.get("/analytics/daily-revenue");
export const getWeeklyRevenue = () => apiClient.get("/analytics/weekly-revenue");
