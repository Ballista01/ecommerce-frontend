import { configureStore } from '@reduxjs/toolkit';
import productListReducer from './slices/productListSlice';
import productDetailReducer from './slices/productDetailSlice';

const store = configureStore({
  reducer: {
    productList: productListReducer,
    productDetail: productDetailReducer,
  },
});

export default store;
