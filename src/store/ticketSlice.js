import { createSlice } from '@reduxjs/toolkit';

const ticketsSlice = createSlice({
    name: 'tickets',
    initialState: {
        list: [],
    },
    reducers: {
        setTickets: (state, action) => {
            state.list = action.payload;
        },
        cancelTicket: (state, action) => {
            state.list = state.list.map(ticket =>
                ticket.id === action.payload ? { ...ticket, status: "Đã hủy" } : ticket
            );
        },
    },
});

export const { setTickets, cancelTicket } = ticketsSlice.actions;
