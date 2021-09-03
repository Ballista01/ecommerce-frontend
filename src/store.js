import { configureStore } from '@reduxjs/toolkit';
import productListReducer from './slices/productListSlice';

const store = configureStore({
  reducer: {
    productList: productListReducer,
  },
});

export default store;
