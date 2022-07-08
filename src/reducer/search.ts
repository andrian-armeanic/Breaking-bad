import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    user: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

async function getAllActors (url: string, thunkAPI: { rejectWithValue: (arg0: any) => any; }) {
    try {
        const response = await axios.get(`https://www.breakingbadapi.com/api/characters?name=${ url }`);
        return response.data;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.message);
    }
}

export const search: any = createAsyncThunk("search/user", getAllActors);

export const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder.addCase(search.pending, (state) => {
            state.isLoading = true;
        }).addCase(search.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        }).addCase(search.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.payload;
            state.user = [];
        });
    },
});

export default searchSlice.reducer;
