import { configureStore } from '@reduxjs/toolkit'
import counterReducer from "./slice/add-cart/addCartSlice"

export const store = configureStore({
    reducer: {
        counter: counterReducer,
    },
})