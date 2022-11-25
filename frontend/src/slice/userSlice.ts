import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../services/userServices";

const user = JSON.parse(localStorage.getItem("@App:user") || "{}");

interface initial {
  user: any;
  error: Boolean | unknown;
  success: Boolean;
  loading: Boolean;
  logged: Boolean;
}
type FetchTodosError = {
  message: string;
};

interface update {
  id: string;
  options: Object;
  data: any;
}

const initialState: initial = {
  user: user ? user : null,
  error: false,
  success: false,
  loading: false,
  logged: user.firstName ? true : false,
};

export const signout = createAsyncThunk<
  object,
  object,
  { rejectValue: FetchTodosError }
>("user/signout", async (user, thunkAPI) => {
  const response = await userService.createUser(user);
  if (response.error) return thunkAPI.rejectWithValue(response.error);
  return response;
});

export const sign = createAsyncThunk<
  object,
  object,
  { rejectValue: FetchTodosError }
>("user/sign", async (user, thunkAPI) => {
  const response = await userService.signin(user);

  if (response.error) return thunkAPI.rejectWithValue(response.error);
  return response;
});

export const logout = createAsyncThunk("user/logout", async () => {
  await userService.logout();
});

export const update = createAsyncThunk<
  any,
  any,
  { rejectValue: FetchTodosError }
>("user/update", async (data, thunkAPI) => {
  const response = await userService.update(data);
  if (response.error) return thunkAPI.rejectWithValue(response.error);
  return response;
});

export const slice: any = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state) => {
      (state.loading = false), (state.error = false), (state.success = false);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signout.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(signout.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.success = true;
        state.user = action.payload;
        state.logged = true;
      })
      .addCase(signout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
        state.logged = false;
      })
      .addCase(sign.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(sign.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.user = action.payload;
        state.success = true;
        state.logged = true;
      })
      .addCase(sign.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.user = false;
        state.error = action.payload;
        state.logged = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.user = null;
        state.error = false;
        state.logged = false;
      })
      .addCase(update.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.success = true;
        state.error = false;
      });
  },
});
export const { reset } = slice.actions;

export const selectUser = (state: any) => state.user;
export default slice.reducer;
