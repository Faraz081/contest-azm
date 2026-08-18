import { createSlice } from '@reduxjs/toolkit';
import { normalizeRole } from '../utils/roles';

const savedUser = localStorage.getItem('smartsociety_user');
const parsedUser = savedUser ? JSON.parse(savedUser) : null;
const savedToken = localStorage.getItem('token');
const storedRole = parsedUser ? normalizeRole(parsedUser.role) : null;

const initialState = {
  user: storedRole ? parsedUser : null,
  role: storedRole,
  token: savedToken || null,
  isAuthenticated: Boolean(storedRole && savedToken),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.role = normalizeRole(action.payload.user.role);
      state.token = action.payload.token;
      state.isAuthenticated = Boolean(state.role);

      if (state.role) {
        localStorage.setItem('smartsociety_user', JSON.stringify(action.payload.user));
        localStorage.setItem('token', action.payload.token);
      } else {
        state.user = null;
        state.token = null;
        localStorage.removeItem('smartsociety_user');
        localStorage.removeItem('token');
      }
    },
    logout: (state) => {
      state.user = null;
      state.role = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('smartsociety_user');
      localStorage.removeItem('token');
    }
  }
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
