/* eslint-disable no-underscore-dangle */
/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Paper, Stack, Grid, Divider, Typography, Button, Container,
} from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import { selectCart } from '../slices/cartSlice';
import { selectUserSignin } from '../slices/userSigninSlice';
import CartEntry from '../components/CartEntry';
import MessageBox from '../components/MessageBox';
import { MSGBOX_TYPE_ERROR } from '../constants/messageBoxConstants';
import { createOrder, selectCreateOrder } from '../slices/createOrderSlice';

export default function PlaceOrderScreen() {
  const cart = useSelector(selectCart);
  const userSignin = useSelector(selectUserSignin);
  const order = useSelector(selectCreateOrder);
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const taxRate = 0.02;
  const shippingPrice = 10;
  const itemsPrice = cart.cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  const taxPrice = itemsPrice * taxRate;
  const totalPrice = itemsPrice + taxPrice + shippingPrice;

  if (!userSignin.userInfo) {
    history.push(`/signin?redirect=${location.pathname}`);
  } else if (cart.totalQty <= 0) {
    history.push('/');
  } else if (!cart.shippingAddress || !cart.shippingAddress.fullName) {
    history.push('/shipping');
  } else if (!cart.paymentMethod) {
    history.push('/payment');
  }

  const prerequisiteFulFilled = !userSignin.userInfo
    ? history.push(`/signin?redirect=${location.pathname}`) && false
    : !order.success && cart.totalQty <= 0
      ? history.push('/') && false
      : !cart.shippingAddress
        ? history.push('/shipping') && false
        : !cart.paymentMethod
          ? history.push('/payment') && false
          : true;

  const handlePlaceOrder = () => {
    const orderToPlace = {
      orderItems: cart.cartItems,
      shippingAddress: cart.shippingAddress,
      paymentMethod: cart.paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
      user: userSignin.userInfo.id,
      isPaid: false,
      isDelivered: false,
    };
    dispatch(createOrder(orderToPlace));
  };

  useEffect(() => {
    if (order.success) {
      history.push(`/order/${order.order._id}`);
    }
  }, [order.success]);

  return (
    <div>
      {prerequisiteFulFilled ? (
        <Grid container>
          <Grid item md={8} xs={12}>
            <Stack margin={2} spacing={2}>
              <Paper>
                <Stack spacing={2} padding={2}>
                  <Typography variant="h5">Shipping</Typography>
                  <Typography variant="p">
                    <b>Name: </b>
                    {cart.shippingAddress.fullName}
                  </Typography>
                  <Typography variant="p">
                    <b>Address: </b>
                    {cart.shippingAddress.address}
                    ,
                    {` ${cart.shippingAddress.city}`}
                    ,
                    {` ${cart.shippingAddress.province}`}
                    ,
                    {` ${cart.shippingAddress.postalCode}`}
                    ,
                    {` ${cart.shippingAddress.country}`}
                  </Typography>
                </Stack>
              </Paper>
              <Paper>
                <Stack spacing={2} padding={2}>
                  {' '}
                  <Typography variant="h5">Payment</Typography>
                  <Typography variant="p">
                    Method:
                    {` ${cart.paymentMethod}`}
                  </Typography>
                </Stack>
              </Paper>
              <Paper>
                <Stack
                  padding={2}
                  spacing={2}
                  divider={<Divider orientation="horizontal" flexItem />}
                >
                  {cart.cartItems.map((entry) => (
                    <CartEntry product={entry} key={entry.productID} />
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
                    <Typography variant="p">{`$${itemsPrice.toFixed(2)}`}</Typography>
                  </Stack>
                  <Stack direction="row" display="flex" justifyContent="space-between">
                    <Typography variant="p">
                      <b>Shipping:</b>
                    </Typography>
                    <Typography variant="p">{`$${shippingPrice.toFixed(2)}`}</Typography>
                  </Stack>
                  <Stack direction="row" display="flex" justifyContent="space-between">
                    <Typography variant="p">
                      <b>Tax:</b>
                    </Typography>
                    <Typography variant="p">{`$${taxPrice.toFixed(2)}`}</Typography>
                  </Stack>
                  <Stack direction="row" display="flex" justifyContent="space-between">
                    <Typography variant="p">
                      <b>Order Total:</b>
                    </Typography>
                    <Typography variant="p">{`$${totalPrice.toFixed(2)}`}</Typography>
                  </Stack>
                  <Button variant="contained" onClick={handlePlaceOrder} disabled={order.loading}>
                    {order.loading ? 'Submitting Order' : 'Place Order'}
                  </Button>
                  {order.error && (
                    <Typography variant="p" sx={{ color: 'red' }}>
                      {order.error}
                    </Typography>
                  )}
                </Stack>
              </Paper>
            </Container>
          </Grid>
        </Grid>
      ) : (
        <MessageBox type={MSGBOX_TYPE_ERROR} message="Incomplete order, Redirecting..." />
      )}
    </div>
  );
}
