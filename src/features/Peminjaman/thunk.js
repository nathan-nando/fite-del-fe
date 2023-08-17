import {createAsyncThunk} from "@reduxjs/toolkit";
import {loanServices} from "../../api/Loan.js";
import {fetchInventories} from "../Inventory/thunk.js";

export const createLoan = createAsyncThunk('loan/Create', async (payload, {rejectWithValue, dispatch}) => {
    try {
        console.log(payload)
        const result = await loanServices.createOne(payload);
        return result.data.data;
    } catch (e) {
        return rejectWithValue(e)
    } finally {
        dispatch(fetchInventories())
    }
})

export const fetchLoans = createAsyncThunk('loan/FetchAll', async (_, {rejectWithValue})=>{
    try{
        const result = await loanServices.getAll()
        return result.data.data
    } catch (e) {
        return rejectWithValue(e)
    }
})