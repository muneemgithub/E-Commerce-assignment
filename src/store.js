import { configureStore } from '@reduxjs/toolkit'
import counterReducer from "./slice/add-cart/addCartSlice"
import productReducer from "./slice/product/productSlice"

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        products: productReducer,
    },
})