import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  token: null,
  userId: null,
  expiryDate: null,
  user: null,
  error: null,
  isSubmitting: false,
  disableButton: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthData: (state, action) => {
      const { token, userId, expiryDate } = action.payload;
      state.token = token;
      state.userId = userId;
      state.expiryDate = expiryDate;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setAuthError: (state, action) => {
      state.authError = action.payload;
    },
    setAuth: (state, action) => {
      state.isAuth = action.payload;
    },
    setSubmitting: (state, action) => {
      state.isSubmitting = action.payload;
    },
    setDisableButton: (state, action) => {
      state.disableButton = action.payload;
    },
    clearAuthData: (state) => {
      state.token = null;
      state.userId = null;
      state.expiryDate = null;
      state.error = null;
      state.success = null;
    },
  },
});

export const {
  setAuthData,
  setAuth,
  setAuthError,
  setUser,
  setSubmitting,
  setDisableButton,
  clearAuthData,
} = authSlice.actions;
export default authSlice.reducer;
