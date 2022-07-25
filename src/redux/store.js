import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./reducer";

export const store = configureStore({
	reducer: {
		reducer: appReducer,
	},
});
