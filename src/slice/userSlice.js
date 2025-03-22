// src/features/user/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    id: null,
    name: null,
    phoneNumber: null,
    address: null,
    email: null,
    dob: null,
    hashPassword: null,
    createAt: null,
    isDelete: false,
    isVerify: false,
    role: null,
    imageUrl: null,
    gender: null,
    events: [],
    orderDetails: []
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserInfo: (state, action) => {
            // Cập nhật thông tin người dùng từ payload
            return { ...state, ...action.payload };
        },
        clearUserInfo: () => initialState
    },
});

export const { setUserInfo, clearUserInfo } = userSlice.actions;
export default userSlice.reducer;
