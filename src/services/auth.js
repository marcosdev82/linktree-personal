import axios from "axios";

const STORAGE_KEY = "@linktree";
const TOKEN_KEY = "@linktree:token";
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default axios.create({
    baseURL: API_BASE_URL,
})