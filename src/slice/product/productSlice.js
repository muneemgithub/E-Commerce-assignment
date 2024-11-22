import { createSlice } from "@reduxjs/toolkit";
// import reducer from "../add-cart/addCartSlice";

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    isToast: false,
    isProductAdded: false, 
  },
  reducers: {
    addProduct: (state, action) => {
      const isExist = state.items.find((item) => item.id === action.payload.id);

      if (isExist) {
        state.isToast = true;
      } else {
        state.isToast = false;        
        state.isProductAdded = true;        
        state.items.push({ ...action.payload, quantity: 1 });
        
        // setTimeout(() => {
        // state.isProductAdded = false;        
        // }, 3000);

      }
    },
    increaseQuantity: (state, action) => {
      const product = state.items.find((item) => item.id === action.payload.id);
      if (product) {
        product.quantity += 1;
      }
      console.log(product, "productmatch");
    },
    decreaseQuantity: (state, action) => {
      const product = state.items.find((item) => item.id === action.payload.id);
      if (product && product.quantity > 1) {
        product.quantity -= 1;
      } else {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item)=>item.id !== action.payload.id)
    },
  },
});

export const { addProduct, increaseQuantity, decreaseQuantity, removeItem } =
  productSlice.actions;
export default productSlice.reducer;
