import axios from "axios";

const instance = axios.create({
    baseURL: `${import.meta.env.VITE_TIKET_SHOP}`
});

console.log("✅ Toàn bộ biến môi trường:", import.meta.env);
console.log("👉 BaseURL đang dùng là:", import.meta.env.VITE_TIKET_SHOP);

export default instance;
