import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    showModal: false,
    modeModal: "create",
    user: {},
    loading: false,
    error: null
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
        }
    }
})

export const {hideModal, modeModalToCreate, modeModalToUpdate, showModal} = globalSlice.actions

export default globalSlice.reducer