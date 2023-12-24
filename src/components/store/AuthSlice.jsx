import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
    isLoggedIn : localStorage.getItem("isLoggedIn"),
    token : localStorage.getItem('token'),
    userEmail : localStorage.getItem('email'),
}

const authSlice = createSlice({
    name: "authentication",
    initialState: initialAuthState,
    reducers:{
        login: (state,action) => {
            console.log(action,'in loginreducer');
            state.token = action.payload.token;
            state.userEmail = action.payload.email;
            state.isLoggedIn= true;

            localStorage.setItem("token",action.payload.token);
            localStorage.setItem("email",action.payload.email);
            localStorage.setItem("isLoggedIn",true);
        },
        logOut : (state, action)=>{
            state.isLoggedIn = false;
            state.token = null;
            state.userEmail = null;
            localStorage.clear();

        }
    }
})

export const authActions = authSlice.actions;

export default authSlice;