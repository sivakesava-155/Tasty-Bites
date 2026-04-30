import apiClient from "./apiClient";

export const getMyOrders = () => apiClient.get("/orders/my");
export const getOrders = () => apiClient.get("/orders");
export const getOrderById = (id) => apiClient.get(`/orders/${id}`);
export const getAllOrders = () => apiClient.get("/orders/all");
export const checkoutOrder = (payload) => apiClient.post("/orders/place", payload);
export const updateOrderStatus = (id, status) =>
  apiClient.put(`/orders/${id}/status`, { status });

export const getAnalyticsSummary = () => apiClient.get("/analytics/summary");
export const getDailyRevenue = () => apiClient.get("/analytics/daily-revenue");
export const getWeeklyRevenue = () => apiClient.get("/analytics/weekly-revenue");
