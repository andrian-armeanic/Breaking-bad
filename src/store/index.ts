import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import search from "../reducer/search";

export const store = configureStore({
  reducer: { search },
  middleware: [thunkMiddleware],
});
