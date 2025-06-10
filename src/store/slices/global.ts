import { createSlice } from "@reduxjs/toolkit";

const initialState: GlobalState = {
  token: "",
  test_id: "",
  sso: false,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload as string;
    },
    setTestId: (state, action) => {
      state.test_id = action.payload as string;
    },
    setSSO: (state, action) => {
      state.sso = action.payload as boolean;
    },
  },
});

export const { setToken, setTestId, setSSO } = globalSlice.actions;
export default globalSlice.reducer;
