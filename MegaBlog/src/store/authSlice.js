import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData: null,
    UserData: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            const data = action.payload?.userData ?? action.payload?.UserData ?? action.payload;
            state.userData = data;
            state.UserData = data;
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
            state.UserData = null;
        }
    }
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;