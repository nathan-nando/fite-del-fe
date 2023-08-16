import {createSlice} from "@reduxjs/toolkit";
import {createLoan} from "./thunk.js";

const initialState = {
    selectedLoan: {},
    Loans: [],
    loading: false,
    error: null,
}

const slice = createSlice({
    name: "Loan",
    initialState,
    reducers: {
        changeSelectedLoan(state, action) {
            state.selectedLoan = action.payload;
        },

    },
    extraReducers: (builder) => {
        builder.addCase(createLoan.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(createLoan.fulfilled, (state, action) => {
            state.loading = false;
        })
        builder.addCase(createLoan.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
    }
});

export const {changeSelectedLoan} = slice.actions

export default slice.reducer