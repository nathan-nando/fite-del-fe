import {createSlice} from "@reduxjs/toolkit";
import {fetchInventories} from "./thunk.js";

const initialState = {
    selectedLab: 0,
    selectedInventory: {},
    searchedInventory: [],
    inventories: [],
    form: {},
    loading: false,
    error: null,
}

const slice = createSlice({
    name: "Inventory",
    initialState,
    reducers: {
        changeSelectedLab(state, action) {
            state.selectedLab = action.payload;
        },
        changeSelectedInventory(state, action) {
            state.selectedInventory = action.payload;
        },
        handlerForm(state, action) {
            state.form = Object.assign(state.form, action.payload);
        },
        clearForm(state) {
            state.form = {}
        },
        search(state, action){
            state.searchedInventory = state.inventories.filter(v => v.name.toLowerCase().includes(action.payload.toLowerCase()) );
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchInventories.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchInventories.fulfilled, (state, action) => {
            // state.inventories = [...state.inventories, ...action.payload];
            state.inventories = action.payload;
            state.searchedInventory = action.payload;
            state.loading = false;
        })
        builder.addCase(fetchInventories.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
});

export const {search, handlerForm, clearForm, changeSelectedLab, changeSelectedInventory} = slice.actions

export default slice.reducer