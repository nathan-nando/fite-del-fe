import {configureStore} from "@reduxjs/toolkit";

import inventoryReducer from "../features/Inventory/slice.js"

export const stores = configureStore({
    reducer:{
        inventoryState: inventoryReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
});
