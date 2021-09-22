import { configureStore } from '@reduxjs/toolkit';
import productListReducer from './slices/productListSlice';
import productDetailReducer from './slices/productDetailSlice';
import cartReducer from './slices/cartSlice';
import userSigninReducer from './slices/userSigninSlice';
import userRegisterReducer from './slices/userRegisterSlice';
import createOrderReducer from './slices/createOrderSlice';
import orderDetailReducer from './slices/orderDetailSlice';
import orderHistoryReducer from './slices/orderHistorySlice';
import userProfileReducer from './slices/userProfileSlice';

const store = configureStore({
  reducer: {
    productList: productListReducer,
    productDetail: productDetailReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    createOrder: createOrderReducer,
    orderDetail: orderDetailReducer,
    orderHistory: orderHistoryReducer,
    userProfile: userProfileReducer,
  },
});

export default store;
