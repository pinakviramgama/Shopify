import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTotalUsers = createAsyncThunk(
  "users/fetchTotal",
  async () => {
    const { data } = await axios.get("/api/auth/getUsers", {
      withCredentials: true,
    });
    return data.totalUsers;
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: { total: 0, status: "idle" },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTotalUsers.fulfilled, (state, action) => {
        state.total = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchTotalUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTotalUsers.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default usersSlice.reducer;
