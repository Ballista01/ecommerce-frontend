/* eslint-disable max-len */
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = { loading: true };

const orderHistorySlice = createSlice({
  name: 'orderHistory',
  initialState,
  reducers: {
    orderHistoryRequest: (state) => {
      state.loading = true;
    },
    orderHistoryError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    orderHistorySuccess: (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    },
    orderHistoryReset: (state) => {
      state.loading = true;
      state.error = undefined;
      state.orders = undefined;
    },
  },
});

export const {
  orderHistoryError, orderHistoryRequest, orderHistorySuccess, orderHistoryReset,
} = orderHistorySlice.actions;

export const fetchOrderHistory = () => async (dispatch, getState) => {
  dispatch(orderHistoryRequest());
  const { userInfo } = getState().userSignin;
  if (!userInfo) throw new Error('user not signed in');
  try {
    const { data } = await axios.get('/api/orderhistory', {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch(orderHistorySuccess(data));
  } catch (err) {
    const message = err.response && err.response.data.message ? err.response.data.message : err.message;
    dispatch(orderHistoryError(message));
  }
};

export const selectOrderHistory = (state) => state.orderHistory;

export default orderHistorySlice.reducer;
