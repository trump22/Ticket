import { configureStore } from '@reduxjs/toolkit';
// Import các reducer của bạn, ví dụ:
import tokenReducer from '../slice/tokenSlice';
import userReducer from '../slice/userSlice';
import ticketReducer from '../slice/ticketSlice';
export const store = configureStore({
    reducer: {
        auth: tokenReducer,
        // Thêm các slice khác nếu cần
        user: userReducer,
        ticket: ticketReducer,
    },
});
