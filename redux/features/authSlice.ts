import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { RootState } from "../store";
import { jwtDecode } from "jwt-decode";
interface AuthState {
  token: string | null;
  refresh_token: string | null;
}

interface DecodedUser {
  id: string;
  email: string;
  role: "SUPER_ADMIN" | "ADMIN" | "STUDENT" | "SUPERVISOR";
}

const initialState: AuthState = {
  token: null,
  refresh_token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
      Cookies.set("token", action.payload.token);
    },

    getUser: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
      Cookies.set("token", action.payload.token);
    },

    setRefreshToken: (
      state,
      action: PayloadAction<{ refresh_token: string }>
    ) => {
      state.refresh_token = action.payload.refresh_token;
    },
    logout: (state) => {
      state.token = null;
      state.refresh_token = null;
      Cookies.remove("token");
      localStorage.removeItem("token");
      // Cookies.remove("refresh_token");
      // localStorage.removeItem("refresh_token");
    },
  },
});

export const getUser = (state: RootState): DecodedUser | null => {
  const token = state.auth.token || Cookies.get("token");
  if (!token) return null;
  try {
    return jwtDecode<DecodedUser>(token);
  } catch {
    return null;
  }
};

export const { setUser, setRefreshToken, logout } = authSlice.actions;

export default authSlice.reducer;
