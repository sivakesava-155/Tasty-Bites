import apiClient from "./apiClient";

export const signIn = (payload) => apiClient.post("/auth/login", payload);
export const signUp = (payload) => apiClient.post("/auth/register", payload);
