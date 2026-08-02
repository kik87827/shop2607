import { createSlice } from "@reduxjs/toolkit";

let cart = createSlice({
  name: "cart",
  initialState: [
    { id: 0, name: "White and Black", count: 1 },
    { id: 2, name: "Grey Yordan", count: 1 },
  ],
  reducers: {
    changeCount(state, { payload }) {
      const findItem = state.find((item) => item.id === payload);
      if (findItem) findItem.count += 1;
    },
    pushProduct(state, { payload }) {
      const findId = state.findIndex((item) => item.id === payload.id);
      console.log("동일제품" + findId);
      if (findId === -1) {
        state.push({
          id: payload.id,
          name: payload.title,
          count: 1,
        });
      }
    },
    deleteProduct(state, { payload }) {
      // Redux Toolkit에서는 Immer 덕분에 원본을 수정하는 것처럼 작성할 수 있습니다.
      const index = state.findIndex((item) => item.id === payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    }
  },
});

export let { changeCount, pushProduct, deleteProduct } = cart.actions;

export default cart;
