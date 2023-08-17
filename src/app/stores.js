import {configureStore} from "@reduxjs/toolkit";

import globalReducer from "../features/Root/slice.js"
import inventoryReducer from "../features/Inventory/slice.js"
import loanReducer from "../features/Peminjaman/slice.js"

export const stores = configureStore({
    reducer: {
        inventoryState: inventoryReducer,
        globalState: globalReducer,
        loanState: loanReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
});
