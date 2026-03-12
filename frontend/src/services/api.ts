import axios from "axios";

const API_URL = "http://localhost:5000/api"; // Your backend URL

export const api = axios.create({
  baseURL: API_URL,
});

// Login function
export const login = async (email: string, password: string) => {
  const response = await api.post("/auth/login", { email, password });
  return response.data; // Should include token
};