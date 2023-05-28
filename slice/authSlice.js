import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import $api from "../http";

const initialState = {
  isFetching: false,
  isAuth: false,
  isError: false,
  userInfo: {},
  token: '',
  errorMessage: '',
}

export const signupUser = createAsyncThunk(
  'loginUser',
  async ({login, password}, thunkAPI) => {
    try {
      const response = await $api.post('/auth/login', {login, password})
      return thunkAPI.fulfillWithValue({
        "userInfo": response.data,
        "status": response.status,
        "accessToken": response.data.token
      });
    } catch (error) {
      console.log('It is error');
      if (error?.response?.data?.message) {
        return thunkAPI.rejectWithValue({"message": error.response.data.message, "status": error.response.status});
      } else {
        return thunkAPI.rejectWithValue({"message": "Произошла непредвиденная ошибка. Повторите попытку позже."});
      }
    }
  }
)

export const registrationUser = createAsyncThunk(
  'regUser',
  async (
    {name, surname, lastname, login, password, email, phone, age, education},
    thunkAPI
  ) => {
    try {
      const response = await $api.post('/auth/registration', {
        name, surname, lastname, login, password, email, phone, age, education
      })
      const dataUser = Object.values(response.data)
      const refreshToken = response.data?.refreshToken;
      const accessToken = response.data?.accessToken;

      return thunkAPI.fulfillWithValue({"userInfo": dataUser[0], "status": response.status, "accessToken": accessToken})
    } catch (error) {
      return thunkAPI.rejectWithValue({"message": error.response.data, "status": error.response.status})
    }
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearErrorMessage: (state) => {
      state.isError = false;
      state.errorMessage = '';
    },
    logOut: (state) => {
      state.isAuth = false;
      state.token = '';
      state.userInfo = ''
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.fulfilled, (state, {payload}) => {
        state.isFetching = false;
        state.isAuth = true;
        state.userInfo = payload.userInfo;
        state.token = payload.accessToken;

        state.isError = false;
        state.errorMessage = '';
      })
      .addCase(signupUser.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(signupUser.rejected, (state, {payload}) => {
        state.isFetching = false;
        state.isError = true;
        state.errorMessage = payload.message;
      })

      .addCase(registrationUser.fulfilled, (state, {payload}) => {
        state.token = payload.accessToken;
        state.isFetching = false;
        state.isError = false;
        state.errorMessage = '';
      })
      .addCase(registrationUser.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(registrationUser.rejected, (state, {payload}) => {
        state.isFetching = false;
        state.isError = true;
        state.errorMessage = payload.message;
      })
  }
})


export default authSlice;
export const {clearErrorMessage, logOut} = authSlice.actions;
