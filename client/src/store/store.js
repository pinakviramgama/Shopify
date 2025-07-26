import { configureStore } from "@reduxjs/toolkit";
import adminProductsSlice from "./admin/product-slices";
import authReducer from "./auth-slice"; // adjust path if needed

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductsSlice,
  },
});

export default store;
