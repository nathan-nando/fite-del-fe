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

export const createInventory = createAsyncThunk('inventory/create', async (payload, {rejectWithValue, dispatch})=>{
    try{
        const result = await inventoryServices.createOne(payload)
        return result.data
    } catch (e) {
        return rejectWithValue(e)
    } finally {
        dispatch(fetchInventories())
    }
})
export const updateInventory = createAsyncThunk('inventory/update', async (payload, {dispatch, rejectWithValue})=>{
    try{
        const result = await inventoryServices.updateOne(payload._id, payload)
        return result.data
    } catch (e) {
        return rejectWithValue(e)
    } finally {
        await dispatch(fetchInventories())
    }
})

export const deleteInventory = createAsyncThunk('inventory/delete', async (id, {rejectWithValue, dispatch})=>{
    try{
        const result = await inventoryServices.deleteOne(id)
        return result.data
    } catch (e) {
        return rejectWithValue(e)
    } finally {
        await dispatch(fetchInventories())
    }
})