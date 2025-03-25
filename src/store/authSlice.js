import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
    username: Cookies.get("username") || null,
    imgUrl: Cookies.get("imgUrl") || null, // Lấy từ Cookies nếu có
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
        setImgUrl: (state, action) => {
            state.imgUrl = action.payload;
        },
        clearImgUrl: (state) => {
            state.imgUrl = null;
        },
    },
});

export const { setUsername, clearUsername, setImgUrl, clearImgUrl } = authSlice.actions;

export default authSlice.reducer;

export const sliceName = authSlice.name;
