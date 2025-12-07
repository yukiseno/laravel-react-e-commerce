import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  token: "",
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthState(state, action) {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.user = null;
      state.token = "";
      state.isLoggedIn = false;
    },
  },
});

const userReducer = userSlice.reducer;
export const { setAuthState, logout } = userSlice.actions;
export default userReducer;
