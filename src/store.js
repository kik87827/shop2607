import { configureStore, createSlice } from "@reduxjs/toolkit";
import user from "./store/userSlice";
import cart from "./store/userCart";


/* let storage = createSlice({
  name: 'storage',
  initialState : [10,11,12]
})
 */

export default configureStore({
  // 여기에 등록해야 사용가능
  reducer: {
    user: user.reducer,
    cart: cart.reducer,
  },
});
