import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    tokens: null,
  },
  reducers: {
    setCredentials: (state, { payload: { user, tokens } }) => {
      state.user = user;
      state.tokens = tokens;
    },
    setTokens: (state, action) => {
      state.user = state.user;
      state.tokens = action.payload;
    },
    logout: (state, action) => {
      state.user = null;
      state.tokens = null;
    },
  },
});

export const { setCredentials, setTokens, logout } = slice.actions;
export default slice.reducer;
export const selectCurrentUser = (state) => state.auth.user;
export const selectRefreshToken = (state) => state.auth.tokens.refresh;
export const selectAccessTokenExp = (state) => state.auth.tokens.access.exp;
