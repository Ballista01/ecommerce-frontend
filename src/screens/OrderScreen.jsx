/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Grid, Paper, Stack, Typography, Divider, Container,
} from '@material-ui/core';
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import CartEntry from '../components/CartEntry';
import { selectOrderDetail, fetchOrderDetail } from '../slices/orderDetailSlice';
import { selectUserSignin } from '../slices/userSigninSlice';
import LoadingBox from '../components/LoadingBox';
import { MSGBOX_TYPE_ERROR } from '../constants/messageBoxConstants';
import MessageBox from '../components/MessageBox';

export default function OrderScreen() {
  const { orderID } = useParams();
  const history = useHistory();
  const location = useLocation();
  const orderDetail = useSelector(selectOrderDetail);
  const dispatch = useDispatch();
  const userSignin = useSelector(selectUserSignin);
  const [sdkReady, setSdkReady] = useState(false);

  const handleSuccessPayment = () => {
    console.log('payment successful');
  };

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!userSignin.userInfo) {
      history.push(`/signin?redirect=${location.pathname}`);
    } else if (!orderDetail.order) {
      dispatch(fetchOrderDetail(orderID));
    } else if (!orderDetail.order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [orderID, orderDetail.order, sdkReady]);

  return (
    <div>
      {orderDetail.loading ? (
        <LoadingBox />
      ) : orderDetail.error ? (
        <MessageBox type={MSGBOX_TYPE_ERROR} message={orderDetail.error} />
      ) : (
        <Grid container>
          <Grid item md={8} xs={12}>
            <Stack margin={2} spacing={2}>
              <Paper>
                <Stack spacing={2} padding={2}>
                  <Typography variant="h5">Shipping</Typography>
                  <Typography variant="p">
                    <b>Name: </b>
                    {orderDetail.order.shippingAddress.fullName}
                  </Typography>
                  <Typography variant="p">
                    <b>Address: </b>
                    {orderDetail.order.shippingAddress.address}
                    ,
                    {` ${orderDetail.order.shippingAddress.city}`}
                    ,
                    {` ${orderDetail.order.shippingAddress.province}`}
                    ,
                    {` ${orderDetail.order.shippingAddress.postalCode}`}
                    ,
                    {` ${orderDetail.order.shippingAddress.country}`}
                  </Typography>
                  {orderDetail.order.isDelivered ? (
                    <Typography variant="p" padding={1} sx={{ color: 'green' }}>
                      Delivered
                    </Typography>
                  ) : (
                    <Typography
                      variant="p"
                      padding={1}
                      sx={{ color: 'red', backgroundColor: '#ffb76f', borderRadius: '5px' }}
                    >
                      Pending Delivery
                    </Typography>
                  )}
                </Stack>
              </Paper>
              <Paper>
                <Stack spacing={2} padding={2}>
                  <Typography variant="h5">Payment</Typography>
                  <Typography variant="p">
                    Method:
                    {` ${orderDetail.order.paymentMethod}`}
                  </Typography>
                  {orderDetail.order.isPaid ? (
                    <Typography variant="p" padding={1} sx={{ color: 'green' }}>
                      Paid
                    </Typography>
                  ) : (
                    <Typography
                      variant="p"
                      padding={1}
                      sx={{ color: 'red', backgroundColor: '#ffb76f', borderRadius: '5px' }}
                    >
                      Unpaid
                    </Typography>
                  )}
                </Stack>
              </Paper>
              <Paper>
                <Stack
                  padding={2}
                  spacing={2}
                  divider={<Divider orientation="horizontal" flexItem />}
                >
                  {orderDetail.order.orderItems.map((entry) => (
                    <CartEntry product={entry} key={entry.productID} canModify={false} />
                  ))}
                </Stack>
              </Paper>
            </Stack>
          </Grid>
          <Grid item md={4} xs={12}>
            <Container>
              <Paper>
                <Stack spacing={2} padding={2} margin={2}>
                  <Typography variant="h5">Order Summary</Typography>
                  <Stack direction="row" display="flex" justifyContent="space-between">
                    <Typography variant="p">
                      <b>Items:</b>
                    </Typography>
                    <Typography variant="p">
                      {`$${orderDetail.order.itemsPrice.toFixed(2)}`}
                    </Typography>
                  </Stack>
                  <Stack direction="row" display="flex" justifyContent="space-between">
                    <Typography variant="p">
                      <b>Shipping:</b>
                    </Typography>
                    <Typography variant="p">
                      {`$${orderDetail.order.shippingPrice.toFixed(2)}`}
                    </Typography>
                  </Stack>
                  <Stack direction="row" display="flex" justifyContent="space-between">
                    <Typography variant="p">
                      <b>Tax:</b>
                    </Typography>
                    <Typography variant="p">
                      {`$${orderDetail.order.taxPrice.toFixed(2)}`}
                    </Typography>
                  </Stack>
                  <Stack direction="row" display="flex" justifyContent="space-between">
                    <Typography variant="p">
                      <b>Order Total:</b>
                    </Typography>
                    <Typography variant="p">
                      {`$${orderDetail.order.totalPrice.toFixed(2)}`}
                    </Typography>
                  </Stack>
                  {!orderDetail.order.isPaid
                    && (!sdkReady ? (
                      <LoadingBox />
                    ) : (
                      <PayPalButton
                        amount={orderDetail.order.totalPrice}
                        onSuccess={handleSuccessPayment}
                      />
                    ))}
                </Stack>
              </Paper>
            </Container>
          </Grid>
        </Grid>
      )}
    </div>
  );
}
