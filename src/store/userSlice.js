import { createSlice } from "@reduxjs/toolkit";

// use state 역할 : state 하나를 slice라고 부름
let user = createSlice({
  name: "user",
  initialState: { name: "kim", age: 20 },
  reducers: {
    userModify(state) {
      //return "John" + state;
      // immer.js 로 수정 가능
      state.name = "park";
    },
    changeAge(state, { payload = 1 }) {
      state.age += payload;
    },
  },
});

export let { userModify, changeAge } = user.actions;

export default user;
