import React, { useState } from 'react';
import {
  Container,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  Typography,
  Stack,
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { selectCart, savePaymentMethod } from '../slices/cartSlice';
import { PAYMENT_WITH_PAYPAL, PAYMENT_WITH_STRIPE } from '../constants/paymentConstants';

export default function PaymentMethodScreen() {
  const cart = useSelector(selectCart);
  const history = useHistory();
  const location = useLocation();
  if (!cart.shippingAddress) {
    history.push(`/shipping?redirect=${location.pathname}`);
  }
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState(PAYMENT_WITH_PAYPAL);

  const handleChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push('/placeorder');
  };

  return (
    <Container
      sx={{
        padding: 5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Paper>
        <Stack spacing={2} padding={5}>
          <Typography variant="h4">Payment Method</Typography>
          <form onSubmit={handleSubmit}>
            <FormControl component="fieldset">
              <FormLabel>Select a payment method</FormLabel>
              <RadioGroup name="payment-method" value={paymentMethod} onChange={handleChange}>
                <FormControlLabel value={PAYMENT_WITH_PAYPAL} control={<Radio />} label="Paypal" />
                <FormControlLabel
                  value={PAYMENT_WITH_STRIPE}
                  disabled
                  control={<Radio />}
                  label="Stripe"
                />
              </RadioGroup>
              <FormHelperText sx={{ color: 'red' }}>ONLY FOR DEMO USE</FormHelperText>
              <Button variant="contained" type="submit">
                Continue
              </Button>
            </FormControl>
          </form>
        </Stack>
      </Paper>
    </Container>
  );
}
