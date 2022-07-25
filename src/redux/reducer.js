import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	orgViewReq: 0,
	email: "",
	logInData: {},
	pieProgress: null,
	pieContent: [],
};

export const appReducer = createSlice({
	name: "reducer",
	initialState,
	reducers: {
		setOrgViewReq: (state, action) => {
			state.orgViewReq = action.payload;
		},
		setEmailId: (state, action) => {
			state.email = action.payload;
		},
		setLogInData: (state, action) => {
			state.logInData = action.payload;
		},
		setPieProgress: (state, action) => {
			state.pieProgress = action.payload;
		},
		setPieContent: (state, action) => {
			state.pieContent = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { setOrgViewReq, setEmailId, setLogInData } = appReducer.actions;

export default appReducer.reducer;
