// src/slice/ticketSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    list: []
};

const ticketSlice = createSlice({
    name: 'tickets',
    initialState,
    reducers: {
        setTickets: (state, action) => {
            state.list = action.payload;
        },
        updateTicketStatus: (state, action) => {
            const { id, status } = action.payload;
            const ticket = state.list.find(ticket => ticket.id === id);
            if (ticket) {
                ticket.status = status;
            }
        }
    }
});

export const { setTickets, updateTicketStatus } = ticketSlice.actions;
export default ticketSlice.reducer;
