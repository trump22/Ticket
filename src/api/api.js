// src/api/api.js
import axios from 'axios';
import { endpoints } from './endpoints';

const axiosInstance = axios.create({
    baseURL: 'http://13.239.1.215:8080',
    // hoặc URL backend của bạn
    // baseURL: 'http://localhost:5000',
});

// Hàm đăng nhập
export const login = async (email, password) => {
    const response = await axiosInstance.post(endpoints.auth.login, {
        email,
        password,
    });
    return response.data;
};

// Hàm đăng ký
export const register = async (registerData) => {
    const response = await axiosInstance.post(endpoints.auth.register, registerData);
    return response.data;
};

// Lấy danh sách sự kiện
export const getAllEvents = async () => {
    const response = await axiosInstance.get(endpoints.event.getAll);
    return response.data;
};

// Lấy chi tiết sự kiện theo id
export const getEventById = async (id) => {
    const response = await axiosInstance.get(endpoints.event.getById(id));
    return response.data;
};
