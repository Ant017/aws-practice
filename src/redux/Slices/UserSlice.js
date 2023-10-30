import { createSlice } from "@reduxjs/toolkit";

const savedUser = JSON.parse(localStorage.getItem("user"));

const initialState = savedUser
    ? savedUser
    : {
        _id: "",
        email: "",
        token: "",
    };

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUser: (state, action) => {
            state._id = action.payload._id
            state.email = action.payload.email;
            state.token = action.payload.token;

            localStorage.setItem("user", JSON.stringify(action.payload));
        },
        logoutUser: (state) => {
            state.email = "";
            state.token = "";
            localStorage.removeItem('user');
        },
    },
});

export const { addUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;