import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import instance from "../services/axios.js";
export const fetchAllEvents = createAsyncThunk(
    'event/fetchAllEvents',
    async () => {
        const response = await instance.get('/api/Event/GetAllEvent');
        console.log(response.data);
        return response.data;
    }
);
const eventSlice = createSlice({
    name: "event",
    initialState: {
        allEvents: [],
    },
    reducers: {
        setAllEvents: (state, action) => {
            state.allEvents = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllEvents.fulfilled, (state, action) => {
            state.allEvents = action.payload;
        });
    },
});


export const { setAllEvents } = eventSlice.actions;
export default eventSlice.reducer;
export const sliceName = eventSlice.name;