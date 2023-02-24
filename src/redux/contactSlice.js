import { createSlice } from "@reduxjs/toolkit";

const initstate = {
  edit: {},
  addnew: {},
};

const contactSlice = createSlice({
  name: "contactSlice",
  initialState: initstate,
  reducers: {
    setedit(state, action) {
      state.edit = action.payload;
    },
    setaddnew(state, action) {
      state.addnew = action.payload;
    },
  },
});

export const { setedit, setaddnew } = contactSlice.actions;

export default contactSlice.reducer;
