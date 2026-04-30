import apiClient from "./apiClient";

export const getMyProfile = () => apiClient.get("/users/me");
export const updateMyProfile = (payload) => apiClient.put("/users/me", payload);
export const getAllUsers = () => apiClient.get("/users");
export const deleteUser = (id) => apiClient.delete(`/users/${id}`);
