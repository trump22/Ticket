// src/services/endpoints.js

export const endpoints = {
    auth: {
        login: '/services/Authen/Login',
        register: '/services/Authen/Register',
    },
    event: {
        getAll: '/services/Event/GetEvents',
        getById: (id) => `/api/Event/GetEvent/${id}`,
    },
    // ... Thêm nếu cần
};
