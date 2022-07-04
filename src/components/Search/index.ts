import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const searchService = createAsyncThunk("search/user", async (url: void, thunkAPI) => {
    try {
        const response = await axios.get(`https://www.breakingbadapi.com/api/characters?name=${url}`);
        return response.data;
    } catch (error: any) {
      console.log(error?.message);
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchService.pending, (state) => {state.isLoading = true;})
      .addCase(searchService.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(searchService.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      });
  },
});

export default searchSlice.reducer;
