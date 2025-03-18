// src/api/endpoints.js

export const endpoints = {
    auth: {
        login: '/api/Authen/Login',
        register: '/api/Authen/Register',
    },
    event: {
        getAll: '/api/Event/GetEvents',
        getById: (id) => `/api/Event/GetEvent/${id}`,
    },
    // ... Thêm nếu cần
};
