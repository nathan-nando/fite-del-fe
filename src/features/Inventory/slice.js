import {createSlice} from "@reduxjs/toolkit";
import {createInventory, deleteInventory, fetchInventories, updateInventory} from "./thunk.js";

const initialState = {
    selectedLab: 0,
    selectedInventory: {},
    searchedInventory: [],
    inventories: [],
    form: {},
    loading: false,
    error: null,
    formLab: {}
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
        setFormUpdate(state, action){
            state.formLab = action.payload;
        },
        handlerForm(state, action) {
            state.form = Object.assign(state.form, action.payload);
        },
        handlerFormLab(state,action){
            state.formLab = Object.assign(state.formLab, action.payload);
        },
        clearForm(state) {
            state.form = {}
        },
        clearFormLab(state){
            state.formLab = {}
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
            state.inventories = action.payload;
            state.searchedInventory = action.payload;
            state.loading = false;
        })
        builder.addCase(fetchInventories.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        builder.addCase(createInventory.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(createInventory.fulfilled, (state, action) => {
            state.loading = false;
        })
        builder.addCase(createInventory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        builder.addCase(deleteInventory.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(deleteInventory.fulfilled, (state, action) => {
            state.loading = false;
        })
        builder.addCase(deleteInventory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        builder.addCase(updateInventory.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(updateInventory.fulfilled, (state, action) => {
            state.loading = false;
        })
        builder.addCase(updateInventory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
});

export const {setFormUpdate, clearFormLab, handlerFormLab, search, handlerForm, clearForm, changeSelectedLab, changeSelectedInventory} = slice.actions

export default slice.reducer