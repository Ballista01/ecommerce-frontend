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
    updateItemInCart: (state, action) => {
      const item = action.payload;
      // console.log('updateItemInCart payload: ');
      // console.log(action.payload);
      const existItem = state.cartItems.find((x) => x.productID === item.productID);
      if (existItem) {
        state.cartItems = state.cartItems.map((x) => (x.productID === existItem.productID ? item : x));
        state.totalQty -= existItem.qty;
      } else {
        state.cartItems = [...state.cartItems, action.payload];
      }
      state.totalQty += action.payload.qty;
    },
    deleteItemInCart: (state, action) => {
      const productID = action.payload;
      let i;
      for (i = state.cartItems.length - 1; i >= 0; i -= 1) {
        if (state.cartItems[i].productID === productID) break;
      }
      state.totalQty -= state.cartItems[i].qty;
      state.cartItems.splice(i, 1);
    },
  },
});

export const { updateItemInCart, deleteItemInCart } = cartSlice.actions;

export const updateCartItem = (productID, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/p/${productID}`);
  dispatch(
    updateItemInCart({
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
  dispatch(deleteItemInCart(productID));
  const updatedCart = getState();
  localStorage.setItem('cart', JSON.stringify(updatedCart));
};

export const selectCart = (state) => state.cart;

export default cartSlice.reducer;
