import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
};

const userSigninSlice = createSlice({
  name: 'userSignin',
  initialState,
  reducers: {
    userSigninRequest: (state) => {
      state.loading = true;
    },
    userSigninSuccess: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
      state.error = undefined;
    },
    userSigninFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    userSignOut: (state) => {
      state.userInfo = null;
    },
  },
});

export const {
  userSigninFail, userSigninRequest, userSigninSuccess, userSignOut,
} = userSigninSlice.actions;

export const selectUserSignin = (state) => state.userSignin;

export const signin = (email, password) => async (dispatch) => {
  dispatch(userSigninRequest());
  try {
    const { data } = await axios.post('/api/signin', { email, password });
    dispatch(userSigninSuccess(data));
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (err) {
    dispatch(userSigninFail(err.response ? err.response.data.message : err.message));
  }
};
export const signOut = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch(userSignOut());
};

export default userSigninSlice.reducer;
