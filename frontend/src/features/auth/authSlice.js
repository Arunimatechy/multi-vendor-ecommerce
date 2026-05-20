
import { createSlice } from "@reduxjs/toolkit";

// ================= SAFE JSON PARSE =================
const safeParse = (value) => {
  try {
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
};

// ================= INITIAL STATE =================
const initialState = {
  user: safeParse(localStorage.getItem("user")),
  access: localStorage.getItem("access") || null,
  refresh: localStorage.getItem("refresh") || null,
  role: localStorage.getItem("role") || null,
};

// ================= SLICE =================
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    
    // ================= LOGIN =================
    setCredentials: (state, action) => {
      const { access, refresh, user, role } = action.payload;

      state.access = access || null;
      state.refresh = refresh || null;
      state.user = user || null;
      state.role = role || null;

      if (access) localStorage.setItem("access", access);
      if (refresh) localStorage.setItem("refresh", refresh);
      if (role) localStorage.setItem("role", role);

      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      }
    },

    // ================= LOGOUT =================
   logout: (state) => {
  state.user = null;
  state.access = null;
  state.refresh = null;
  state.role = null;

  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  localStorage.removeItem("role");
  localStorage.removeItem("user");
}, 
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;