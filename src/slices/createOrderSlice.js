import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { emptyCart } from './cartSlice';

const initialState = {};

const createOrderSlice = createSlice({
  name: 'orderSlice',
  initialState,
  reducers: {
    orderCreateSuccess: (state, action) => {
      state.order = action.payload;
      state.success = true;
      state.loading = false;
    },
    orderCreateFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    orderCreateRequest: (state) => {
      state.loading = true;
    },
  },
});

export const { orderCreateFail, orderCreateRequest, orderCreateSuccess } = createOrderSlice.actions;

export const createOrder = (order) => async (dispatch, getState) => {
  dispatch(orderCreateRequest());
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await axios.post('/api/order', order, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch(orderCreateSuccess(data.order));
    dispatch(emptyCart());
  } catch (err) {
    dispatch(orderCreateFail(err.response ? err.response.data.message : err.message));
  }
};

export const selectCreateOrder = (state) => state.createOrder;

export default createOrderSlice.reducer;
