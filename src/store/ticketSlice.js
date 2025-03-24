import { createSlice } from "@reduxjs/toolkit";

const ticketsSlice = createSlice({
    name: "tickets",
    initialState: {
        tickets: [],
        eventsList: [],
    },
    reducers: {
        setTickets: (state, action) => {
            state.tickets = action.payload;
        },
        setEventsList: (state, action) => {
            state.eventsList = action.payload;
        },
        cancelTicket: (state, action) => {
            const ticketId = action.payload;
            const index = state.tickets.findIndex((t) => t.id === ticketId);
            if (index !== -1) {
                state.tickets[index].status = "Đã huỷ";
            }
        },
    },
});

export const { setTickets, setEventsList, cancelTicket } = ticketsSlice.actions;
export default ticketsSlice.reducer;
export const sliceName = ticketsSlice.name;