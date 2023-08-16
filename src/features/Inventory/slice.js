import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    selectedLab: 0,
    loading: false,
    error: null,
    data: []
}

const slice = createSlice({
    name: "Inventory",
    initialState,
    reducers: {
        changeSelectedLab(state, action){
            state.selectedLab = action.payload;
        }
    }
});

export const {changeSelectedLab} = slice.actions

export default slice.reducer