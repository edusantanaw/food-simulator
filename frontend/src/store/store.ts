import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slice/userSlice";
import productSlice from "../slice/productSlice";
import cartSlice from "../slice/cartSlice";

const store =  configureStore({
  reducer: {
    user: userReducer,
    product: productSlice,
    cart: cartSlice
  },
});

export default store