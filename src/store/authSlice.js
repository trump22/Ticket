import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
    username: Cookies.get("username") || null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUsername: (state, action) => {
            state.username = action.payload;
        },
        clearUsername: (state) => {
            state.username = null;
        },
    },
});

export const { setUsername, clearUsername } = authSlice.actions;

// Export reducer mặc định
export default authSlice.reducer;

// Export tên slice để rootReducer dùng
export const sliceName = authSlice.name;
