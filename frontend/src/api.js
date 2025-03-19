import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

// API gọi đăng nhập
export const login = (userData) => API.post("/auth/login", userData);

// API gọi đăng ký
export const signup = (userData) => API.post("/auth/register", userData);

export default API;
