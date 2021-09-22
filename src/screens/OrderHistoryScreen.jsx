/* eslint-disable no-underscore-dangle */
/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import { Stack, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserSignin } from '../slices/userSigninSlice';
import { selectOrderHistory, fetchOrderHistory } from '../slices/orderHistorySlice';
import OrderEntry from '../components/OrderEntry';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { MSGBOX_TYPE_ERROR } from '../constants/messageBoxConstants';

export default function OrderHistoryScreen() {
  const userSignin = useSelector(selectUserSignin);
  const orderHistory = useSelector(selectOrderHistory);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userSignin.userInfo) history.push('/signin?redirect=/orderhistory');
    else dispatch(fetchOrderHistory());
  }, [dispatch]);

  return (
    <div>
      {orderHistory.loading ? (
        <LoadingBox />
      ) : orderHistory.error ? (
        <MessageBox type={MSGBOX_TYPE_ERROR} message={orderHistory.error} />
      ) : (
        <Stack margin={5} spacing={2} marginTop={10}>
          <Typography variant="h4">Order History</Typography>
          <Stack spacing={3}>
            {orderHistory.orders.map((entry) => (
              <OrderEntry order={entry} key={entry._id} />
            ))}
          </Stack>
        </Stack>
      )}
    </div>
  );
}
