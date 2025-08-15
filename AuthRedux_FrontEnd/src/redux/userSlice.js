import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: null,
    userInfo: {
      firstname: '',
      lastname: '',
      username: '',
    },
    isAuthenticated: false,
  },
  reducers: {
    setUser(state, action) {
      state.token = action.payload.token;
      state.userInfo = action.payload.userInfo;
      state.isAuthenticated = true;
    },
    updateUserInfo(state, action) {
      state.userInfo = { ...state.userInfo, ...action.payload };
    },
    logout(state) {
      state.token = null;
      state.userInfo = {};
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, updateUserInfo, logout } = userSlice.actions;
export default userSlice.reducer;
