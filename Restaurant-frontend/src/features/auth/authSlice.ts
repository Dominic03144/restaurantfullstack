// src/features/auth/authSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface User {
  userId: number;
  userName: string;
  email: string;
  userType: string;
  token?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

const getStoredUser = (): User | null => {
  try {
    const data = localStorage.getItem("user");
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

const initialState: AuthState = {
  user: getStoredUser(),
  isAuthenticated: !!getStoredUser(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

// ✅ These are what you need to import elsewhere
export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
