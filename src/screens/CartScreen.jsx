import {
  Typography, Stack, Grid, Button, Divider, Paper,
} from '@material-ui/core';
import React, { useEffect } from 'react';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateCartItem, selectCart } from '../slices/cartSlice';
import { selectUserSignin } from '../slices/userSigninSlice';
import CartEntry from '../components/CartEntry';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function CartScreen() {
  const { productID } = useParams();
  const query = useQuery();
  const qty = query.get('qty') ? parseInt(query.get('qty'), 10) : 1;
  const cart = useSelector(selectCart);
  const userSignin = useSelector(selectUserSignin);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (productID) {
      dispatch(updateCartItem(productID, qty));
    }
  }, [dispatch, productID, qty]);

  const handleCheckOut = () => {
    if (!userSignin.userInfo) history.push('/signin?redirect=shipping');
    else history.push('/shipping');
  };

  return (
    <Stack spacing={2} margin={2}>
      <Typography variant="h5" padding="1rem 1rem 0 1rem">
        Shopping Cart
      </Typography>
      <Grid container>
        <Grid item md={8} xs={12}>
          <Stack padding={2} spacing={2} divider={<Divider orientation="horizontal" flexItem />}>
            {cart.cartItems.map((entry) => (
              <CartEntry product={entry} key={entry.productID} />
            ))}
          </Stack>
        </Grid>
        <Grid item md={4} xs={12}>
          <Paper>
            <Stack spacing={2} padding={2}>
              <Stack direction="row" display="flex" justifyContent="space-between">
                <Typography variant="h6">
                  Subtotal (
                  {cart.totalQty}
                  {' '}
                  {cart.totalQty > 1 ? 'items' : 'item'}
                  ):
                </Typography>
                <Typography variant="h6">
                  $
                  {cart.cartItems.reduce((a, c) => a + c.price * c.qty, 0).toFixed(2)}
                </Typography>
              </Stack>
              <Button onClick={handleCheckOut} disabled={cart.totalQty <= 0} variant="contained">
                {cart.totalQty > 0 ? 'Proceed to Checkout' : 'No Item In Cart'}
              </Button>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Stack>
  );
}
