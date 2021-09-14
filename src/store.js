import { configureStore } from '@reduxjs/toolkit';
import productListReducer from './slices/productListSlice';
import productDetailReducer from './slices/productDetailSlice';
import cartReducer from './slices/cartSlice';
import userSigninReducer from './slices/userSigninSlice';
import userRegisterReducer from './slices/userRegisterSlice';

const store = configureStore({
  reducer: {
    productList: productListReducer,
    productDetail: productDetailReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
  },
});

export default store;
