import { createSlice } from "@reduxjs/toolkit";

let cart = createSlice({
  name: "cart",
  initialState: [
    { id: 0, name: "White and Black", count: 2 },
    { id: 1, name: "Grey Yordan", count: 1 },
  ],
  reducers: {
    changeCount(state, { payload }) {
      const findItem = state.find(item => item.id === payload);
      findItem.count += 1;
    },
    pushProduct(state, { payload }) {
      state.push({
        id: state.length,
        name: payload.title,
        count : 0
      });
      console.log(state);
    },
  },
});

export let { changeCount, pushProduct } = cart.actions;

export default cart;
