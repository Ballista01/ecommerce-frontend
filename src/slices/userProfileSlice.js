/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { signOut, userSigninSuccess } from './userSigninSlice';

const initialState = { loading: true, error: null, userInfo: null };

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    userProfileRequest: (state) => {
      state.loading = true;
    },
    userProfileError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    userProfileSuccess: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
    },
  },
});

export const { userProfileRequest, userProfileError, userProfileSuccess } = userProfileSlice.actions;

export const fetchUserProfile = () => async (dispatch, getState) => {
  dispatch(userProfileRequest());
  const { userInfo } = getState().userSignin;
  try {
    const { data } = await axios.get(`/api/user/${userInfo.id}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch(userProfileSuccess(data));
  } catch (err) {
    const message = err.response && err.response.data.message ? err.response.data.message : err.message;
    dispatch(userProfileError(message));
  }
};

export const updateUserProfile = (updateInfo) => async (dispatch, getState) => {
  dispatch(userProfileRequest());
  const { token, id } = getState().userSignin.userInfo;
  try {
    const { data } = await axios.put(`/api/user/${id}`, updateInfo, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(signOut());
    dispatch(userSigninSuccess(data));
    dispatch(userProfileSuccess({ ...data._doc, id: data.id, updated: true }));
  } catch (err) {
    const message = err.response && err.response.data.message ? err.response.data.message : err.message;
    dispatch(userProfileError(message));
  }
};

export const selectUserProfile = (state) => state.userProfile;

export default userProfileSlice.reducer;
