import { createSlice } from "@reduxjs/toolkit";

const safeParse = (value) => {

  try {

    return value
      ? JSON.parse(value)
      : null;

  } catch {

    return null;
  }
};

const initialState = {

  user: safeParse(
    localStorage.getItem("user")
  ),

  access:
    localStorage.getItem("access")
    || null,

  refresh:
    localStorage.getItem("refresh")
    || null,

  role:
    localStorage.getItem("role")
    || null,
};

const authSlice = createSlice({

  name: "auth",

  initialState,

  reducers: {

    setCredentials: (

      state,
      action

    ) => {

      const {

        access,
        refresh,
        user,
        role,

      } = action.payload;

      state.access = access;
      state.refresh = refresh;
      state.user = user;
      state.role = role;

      localStorage.setItem(
        "access",
        access
      );

      localStorage.setItem(
        "refresh",
        refresh
      );

      localStorage.setItem(
        "role",
        role
      );

      if (user) {

        localStorage.setItem(

          "user",

          JSON.stringify(user)
        );
      }
    },

    logout: (state) => {

      state.user = null;

      state.access = null;

      state.refresh = null;

      state.role = null;

      localStorage.removeItem(
        "access"
      );

      localStorage.removeItem(
        "refresh"
      );

      localStorage.removeItem(
        "role"
      );

      localStorage.removeItem(
        "user"
      );
    },
  },
});

export const {

  setCredentials,
  logout,

} = authSlice.actions;

export default authSlice.reducer;