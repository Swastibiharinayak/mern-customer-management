import axios from "axios";

// VITE_API_URL should be the backend ROOT, e.g. https://mern-customer-management-api.onrender.com
// We strip any trailing slash or accidental "/api/customers" so the path is never doubled.
const root = (import.meta.env.VITE_API_URL || "http://localhost:5000")
  .replace(/\/+$/, "")
  .replace(/\/api\/customers$/, "");

const API = axios.create({
  baseURL: `${root}/api/customers`,
});

export default API;
