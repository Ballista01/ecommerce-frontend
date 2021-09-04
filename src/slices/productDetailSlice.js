import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: true,
  error: false,
  product: undefined,
};

const productDetailSlice = createSlice({
  name: 'productDetail',
  initialState,
  reducers: {
    productDetailRequest: (state) => {
      state.loading = true;
    },
    productDetailFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    productDetailSuccess: (state, action) => {
      state.loading = false;
      state.product = action.payload;
    },
  },
});

// eslint-disable-next-line max-len
export const { productDetailFail, productDetailRequest, productDetailSuccess } = productDetailSlice.actions;

export const getProductDetail = (productID) => async (dispatch) => {
  dispatch(productDetailRequest);
  try {
    const { data } = await axios.get(`/api/p/${productID}`);
    dispatch(productDetailSuccess(data));
  } catch (error) {
    dispatch(
      productDetailFail(error.response.data.message ? error.response.data.message : error.message),
    );
  }
};

export const selectProductDetail = (state) => state.productDetail;

export default productDetailSlice.reducer;
