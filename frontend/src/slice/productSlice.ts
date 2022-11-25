import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import product from "../services/productService";

interface initialState {
  error: any;
  success: any;
  loading: boolean;
  msg: any;
}

const initialState: initialState = {
  error: false,
  success: false,
  loading: false,
  msg: "",
};

export const register = createAsyncThunk<Object, Object>(
  "product/register",
  async (data, ThunkApi) => {
    const response = await product.newProduct(data);
    if (response.error) ThunkApi.rejectWithValue(reportError);
    return response;
  }
);

export const update = createAsyncThunk<Object, Object>(
  "product/update",
  async (data, ThunkApi) => {
    const response = await product.updateProduct(data);
    if (response.error) ThunkApi.rejectWithValue(reportError);
    return response;
  }
);

export const order = createAsyncThunk<Object, Object>(
  "product/order",
  async (data, ThunkApi) => {
    const response = await product.order(data);
    if (response.error) ThunkApi.rejectWithValue(reportError);
    return response;
  }
);

export const updateStatus = createAsyncThunk<Object, Object>(
  "product/updateStatus",
  async (data, ThunkApi) => {
    const response = await product.updateStatus(data);
    if (response.error) ThunkApi.rejectWithValue(reportError);
    return response;
  }
);

export const slice = createSlice({
  name: "product",
  initialState,
  reducers: {
    reset: (state) => {
      (state.loading = false),
        (state.error = false),
        (state.success = false),
        (state.msg = "");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        (state.loading = true), (state.error = false);
      })
      .addCase(register.rejected, (state, action) => {
        (state.loading = false),
          (state.success = false),
          (state.error = true),
          (state.msg = action.payload);
      })
      .addCase(register.fulfilled, (state, action) => {
        (state.loading = false),
          (state.error = false),
          (state.success = true),
          (state.msg = action.payload);
      })
      .addCase(update.pending, (state) => {
        (state.loading = true), (state.error = false), (state.success = false);
      })
      .addCase(update.fulfilled, (state, action) => {
        (state.error = false),
          (state.loading = false),
          (state.success = true),
          (state.msg = action.payload);
      })
      .addCase(update.rejected, (state, action) => {
        (state.loading = false),
          (state.success = false),
          (state.error = true),
          (state.msg = action.payload);
      })
      .addCase(order.pending, (state) => {
        (state.loading = true), (state.success = false), (state.error = false);
      })
      .addCase(order.fulfilled, (state, action) => {
        (state.loading = false),
          (state.error = false),
          (state.success = true),
          (state.msg = action.payload);
      })
      .addCase(order.rejected, (state, action) => {
        (state.loading = false),
          (state.error = true),
          (state.success = false),
          (state.msg = action.payload);
      })
      .addCase(updateStatus.pending, (state) => {
        (state.loading = true), (state.success = false), (state.error = false);
      })
      .addCase(updateStatus.fulfilled, (state, action) => {
        (state.loading = false),
          (state.error = false),
          (state.success = true),
          (state.msg = action.payload);
      })
      .addCase(updateStatus.rejected, (state, action) => {
        (state.loading = false),
          (state.error = true),
          (state.success = false),
          (state.msg = action.payload);
      });
  },
});

export const { reset } = slice.actions;
export const selectMsg = (state: any) => state.msg 
export default slice.reducer;
