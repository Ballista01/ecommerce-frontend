/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';

const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : {
    cartItems: [],
    totalQty: 0,
  };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    cartUpdateItem: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.productID === item.productID);
      if (existItem) {
        state.cartItems = state.cartItems.map((x) => (x.productID === existItem.productID ? item : x));
        state.totalQty -= existItem.qty;
      } else {
        state.cartItems = [...state.cartItems, action.payload];
      }
      state.totalQty += action.payload.qty;
    },
    cartDeleteItem: (state, action) => {
      const productID = action.payload;
      let i;
      for (i = state.cartItems.length - 1; i >= 0; i -= 1) {
        if (state.cartItems[i].productID === productID) break;
      }
      state.totalQty -= state.cartItems[i].qty;
      state.cartItems.splice(i, 1);
    },
    cartSaveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
    },
    cartSavePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
    cartEmpty: (state) => {
      state.cartItems = [];
      state.totalQty = 0;
    },
  },
});

export const {
  cartUpdateItem,
  cartDeleteItem,
  cartSaveShippingAddress,
  cartSavePaymentMethod,
  cartEmpty,
} = cartSlice.actions;

export const updateCartItem = (productID, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/p/${productID}`);
  dispatch(
    cartUpdateItem({
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      productID: data._id,
      qty,
    }),
  );
  localStorage.setItem('cart', JSON.stringify(getState().cart));
};

export const deleteCartItem = (productID) => (dispatch, getState) => {
  dispatch(cartDeleteItem(productID));
  const updatedCart = getState().cart;
  localStorage.setItem('cart', JSON.stringify(updatedCart));
};

export const emptyCart = () => (dispatch, getState) => {
  dispatch(cartEmpty());
  const updatedCart = getState().cart;
  localStorage.setItem('cart', JSON.stringify(updatedCart));
};

export const saveShippingAddress = (data) => (dispatch, getState) => {
  dispatch(cartSaveShippingAddress(data));
  const updatedCart = getState().cart;
  localStorage.setItem('cart', JSON.stringify(updatedCart));
};

export const savePaymentMethod = (data) => (dispatch, getState) => {
  dispatch(cartSavePaymentMethod(data));
  const updatedCart = getState().cart;
  localStorage.setItem('cart', JSON.stringify(updatedCart));
};

export const selectCart = (state) => state.cart;

export default cartSlice.reducer;
