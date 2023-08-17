import {createAsyncThunk} from "@reduxjs/toolkit";
import {authServices} from "../../api/auth.js";
import {checkLogin} from "./slice.js";

export const login = createAsyncThunk('global/Login', async (payload, {rejectWithValue, dispatch}) => {
    try {
        const result = await authServices.login(payload)
        return result.data;
    } catch (e) {
        return rejectWithValue(e)
    } finally {
        dispatch(checkLogin())
    }
})


export const register = createAsyncThunk('global/register', async (payload, {rejectWithValue, dispatch}) => {
    try {
        const result = await authServices.register(payload)
        return result.data.data;
    } catch (e) {
        return rejectWithValue(e)
    } finally {
    }
})

export const refreshToken = createAsyncThunk('global/register', async (_, {rejectWithValue, dispatch}) => {
    try {
        const result = await authServices.refreshToken();
        return result.data;
    } catch (e) {
        return rejectWithValue(e)
    } finally {
    }
})