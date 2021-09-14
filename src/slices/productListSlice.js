import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: true,
  error: false,
  products: [],
};

const productListSlice = createSlice({
  name: 'productList',
  initialState,
  reducers: {
    productListRequest: (state) => {
      state.loading = true;
    },
    productListFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    productListSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
  },
});

export const { productListRequest, productListFail, productListSuccess } = productListSlice.actions;

export const listProducts = () => async (dispatch) => {
  dispatch(productListRequest());
  try {
    const { data } = await axios.get('/api/p');
    dispatch(productListSuccess(data));
  } catch (error) {
    dispatch(productListFail(error));
  }
};

export const selectProductList = (state) => state.productList;
export default productListSlice.reducer;
