import {createAsyncThunk} from "@reduxjs/toolkit";
import {inventoryServices} from "../../api/inventory.js";

export const fetchInventories = createAsyncThunk('inventory/FetchAll', async (_, {rejectWithValue})=>{
    try{
        const result = await inventoryServices.getAll()
        return result.data.data
    } catch (e) {
        return rejectWithValue(e)
    }
})

export const fetchInventoryByID = createAsyncThunk('inventory/FetchByID', async (id, {rejectWithValue})=>{
    try{
        const result = await inventoryServices.getByID(id)
        return result.data
    } catch (e) {
        return rejectWithValue(e)
    }
})

export const createInventory = createAsyncThunk('inventory/create', async (_, payload, {rejectWithValue})=>{
    try{
        const result = await inventoryServices.createOne(payload)
        return result.data
    } catch (e) {
        return rejectWithValue(e)
    }
})

export const updateInventory = createAsyncThunk('inventory/update', async (param, {rejectWithValue})=>{
    const id = param.id;
    const payload = param.payload;
    try{
        const result = await inventoryServices.updateOne(id, payload)
        return result.data
    } catch (e) {
        return rejectWithValue(e)
    }
})

export const deleteInventory = createAsyncThunk('inventory/delete', async (id, {rejectWithValue})=>{
    try{
        const result = await inventoryServices.deleteOne(id)
        return result.data
    } catch (e) {
        return rejectWithValue(e)
    }
})