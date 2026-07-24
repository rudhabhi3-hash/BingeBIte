import axios from "axios";

const api = axios.create({
    baseURL: "https://bingebite.onrender.com"
});

export default api;