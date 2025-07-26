import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
};

// ✅ Add product
export const addNewProduct = createAsyncThunk(
  "products/addNewProduct",
  async (formData) => {
    const response = await axios.post(
      "http://localhost:5000/api/admin/products/add",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  }
);

// ✅ Get all products
export const getAllProducts = createAsyncThunk("products/getAll", async () => {
  const response = await axios.get(
    "http://localhost:5000/api/admin/product/getAll"
  );
  return response.data; // response: { success: true, data: [...] }
});

// ✅ Update product
export const updateProduct = createAsyncThunk(
  "products/update",
  async ({ id, formData }) => {
    const response = await axios.put(
      `http://localhost:5000/api/admin/product/edit/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  }
);

// ✅ Delete product
export const deleteProduct = createAsyncThunk("products/delete", async (id) => {
  const response = await axios.delete(
    `http://localhost:5000/api/admin/product/delete/${id}`
  );
  return response.data;
});

const AdminProducts = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;

        // ✅ FIXED: Use only the `data` from API response
        state.productList = action.payload.data;
      })
      .addCase(getAllProducts.rejected, (state) => {
        state.isLoading = false;
        state.productList = [];
      });
  },
});

export default AdminProducts.reducer;
