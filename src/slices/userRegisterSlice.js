import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { userSigninSuccess } from './userSigninSlice';

const initialState = {};

const userRegisterSlice = createSlice({
  name: 'userRegister',
  initialState,
  reducers: {
    userRegisterRequest: (state) => {
      state.loading = true;
    },
    userRegisterFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    userRegisterSuccess: (state) => {
      state.loading = false;
      state.error = undefined;
    },
  },
});

// eslint-disable-next-line max-len
export const { userRegisterFail, userRegisterRequest, userRegisterSuccess } = userRegisterSlice.actions;

export const register = (name, email, password) => async (dispatch) => {
  dispatch(userRegisterRequest());
  try {
    const { data } = await axios.post('/api/register', { name, email, password });
    dispatch(userRegisterSuccess());
    dispatch(userSigninSuccess(data));
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (err) {
    dispatch(userRegisterFail(err.response ? err.response.data.message : err.message));
  }
};

export const selectUserRegister = (state) => state.userRegister;

export default userRegisterSlice.reducer;
