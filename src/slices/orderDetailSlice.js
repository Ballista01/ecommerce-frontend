/* eslint-disable max-len */
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = { loading: true };

const orderDetailSlice = createSlice({
  name: 'orderDetail',
  initialState,
  reducers: {
    orderDetailRequest: (state) => {
      state.loading = true;
    },
    orderDetailFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    orderDetailSuccess: (state, action) => {
      state.loading = false;
      state.order = action.payload;
    },
  },
});

export const { orderDetailFail, orderDetailRequest, orderDetailSuccess } = orderDetailSlice.actions;

export const fetchOrderDetail = (orderID) => async (dispatch, getState) => {
  dispatch(orderDetailRequest());
  const {
    userSignin: {
      userInfo: { token },
    },
  } = getState();
  try {
    const { data } = await axios.get(`/api/order/${orderID}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(orderDetailSuccess(data));
  } catch (err) {
    const errMsg = err.response && err.response.data.message ? err.response.data.message : err.message;
    dispatch(orderDetailFail(errMsg));
  }
};

export const selectOrderDetail = (state) => state.orderDetail;

export default orderDetailSlice.reducer;
