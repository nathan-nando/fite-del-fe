import {createSlice} from "@reduxjs/toolkit";
import {createLoan, fetchLoans, updateLoan} from "./thunk.js";

const initialState = {
    selectedLoan: {},
    searchedLoans: [],
    statusLoan: "menunggu",
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
        changeSelectedStatus(state, action){
            state.statusLoan = action.payload;
        },
        search(state, action){
            state.searchedLoans = state.Loans.filter(v => v.personName.toLowerCase().includes(action.payload.toLowerCase()))

        }

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

        builder.addCase(fetchLoans.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchLoans.fulfilled, (state, action) => {
            state.loading = false;
            state.Loans = action.payload;
            state.searchedLoans = action.payload;
        })
        builder.addCase(fetchLoans.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })

        builder.addCase(updateLoan.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(updateLoan.fulfilled, (state, action) => {
            state.loading = false;
        })
        builder.addCase(updateLoan.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
    }
});

export const {changeSelectedStatus, search, changeSelectedLoan} = slice.actions

export default slice.reducer