import axios from "axios";

const token = localStorage.getItem("token")
const api = new axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {  
    "Content-Type": "application/json",
    Authorization : `Bearer ${token}`
  },
});
export default api;   
