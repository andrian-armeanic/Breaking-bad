import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "../reducer/searchSlice";
import thunkMiddleware from "redux-thunk";

export const store = configureStore({
  reducer: { search: searchReducer },
  middleware: [thunkMiddleware],
});
