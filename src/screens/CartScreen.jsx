import {
  Typography,
  Stack,
  Grid,
  Card,
  CardActions,
  Button,
  CardContent,
  Divider,
} from '@material-ui/core';
import React, { useEffect } from 'react';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateCartItem, selectCart } from '../slices/cartSlice';
import CartEntry from '../components/CartEntry';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function CartScreen() {
  const { productID } = useParams();
  const query = useQuery();
  const qty = query.get('qty') ? parseInt(query.get('qty'), 10) : 1;
  const cart = useSelector(selectCart);
  const dispatch = useDispatch();
  const history = useHistory();
  // console.log(cart);

  useEffect(() => {
    if (productID) {
      dispatch(updateCartItem(productID, qty));
    }
  }, [dispatch, productID, qty]);

  const handleCheckOut = () => {
    history.push('/signIn?redirect=shipping');
  };

  return (
    <Stack spacing={2}>
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
        <Grid item md={4} xs={12} padding={2}>
          <Card>
            <CardContent>
              <Typography variant="h5">
                Subtotal (
                {cart.totalQty}
                {' '}
                {cart.totalQty > 1 ? 'items' : 'item'}
                ): $
                {cart.cartItems.reduce((a, c) => a + c.price * c.qty, 0).toFixed(2)}
              </Typography>
            </CardContent>
            <CardActions>
              <Button onClick={handleCheckOut} variant="contained">
                Proceed to Checkout
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
}
