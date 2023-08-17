import {createSlice} from "@reduxjs/toolkit";
import {login} from "./thunk.js";

const initialState = {
    showModal: false,
    modeModal: "create",
    user: {},
    loading: false,
    error: {},
    isLogin: false,
}

const globalSlice = createSlice({
    name: "Global",
    initialState,
    reducers: {
        showModal(state) {
            state.showModal = true;
        },
        hideModal(state) {
            state.showModal = false;
        },
        modeModalToCreate(state) {
            state.modeModal = "create"
        },
        modeModalToUpdate(state) {
            state.modeModal = "update"
        },
        checkLogin(state){
            state.isLogin = localStorage.getItem('token') !== null
        },
        logout(state){
          localStorage.clear();
          state.isLogin = false;
        }
    },
    extraReducers:(builder) => {
        builder.addCase(login.pending, (state, action)=>{
            state.loading = true;
        })
        builder.addCase(login.fulfilled, (state, action)=>{
            state.user = action.payload.data;
            const {token, refresh_token} = action.payload
            const {name} = action.payload.data
            state.loading = false;
            localStorage.setItem('token', token)
            localStorage.setItem('refresh_token', refresh_token)
            localStorage.setItem('name', name)
            state.isLogin = true;
        })
        builder.addCase(login.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.error.message;
        })
    }
})

export const {logout, hideModal, checkLogin, modeModalToCreate, modeModalToUpdate, showModal} = globalSlice.actions

export default globalSlice.reducer