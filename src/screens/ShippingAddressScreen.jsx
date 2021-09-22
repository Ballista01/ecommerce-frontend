/* eslint-disable max-len */
import React, { useState } from 'react';
import {
  Container, Paper, Stack, Typography, TextField, Button,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { selectCart, saveShippingAddress } from '../slices/cartSlice';
import { selectUserSignin } from '../slices/userSigninSlice';

export default function ShippingAddressScreen() {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const { userInfo } = useSelector(selectUserSignin);
  if (!userInfo) history.push(`/signin?redirect=${location.pathname}`);
  // let {shippingAddress} = useSelector(selectCart);

  const [shippingAddress, setShippingAddress] = useState(
    useSelector(selectCart).shippingAddress
      ? useSelector(selectCart).shippingAddress
      : {
        fullName: '',
        address: '',
        city: '',
        province: '',
        postalCode: '',
        country: '',
      },
  );

  // const [fullName, setFullName] = useState(shippingAddress.fullName);
  // const [address, setAddress] = useState(shippingAddress.address);
  // const [city, setCity] = useState(shippingAddress.city);
  // const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  // const [country, setCountry] = useState(shippingAddress.country);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress(shippingAddress));
    history.push('/payment');
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
        <form onSubmit={handleSubmit}>
          <Stack spacing={5} padding={5}>
            <Typography variant="h4">Shipping Address</Typography>
            <TextField
              id="name-field"
              label="Name"
              variant="outlined"
              value={shippingAddress.fullName}
              onChange={(e) => setShippingAddress((state) => ({ ...state, fullName: e.target.value }))}
              required
              autoFocus
              autoComplete="name"
            />
            <TextField
              id="address-field"
              label="address"
              variant="outlined"
              value={shippingAddress.address}
              onChange={(e) => setShippingAddress((state) => ({ ...state, address: e.target.value }))}
              autoComplete="street-address"
              required
            />
            <TextField
              id="city-field"
              label="city"
              variant="outlined"
              value={shippingAddress.city}
              onChange={(e) => setShippingAddress((state) => ({ ...state, city: e.target.value }))}
              autoComplete="address-level2"
              required
            />
            <TextField
              id="province-field"
              label="province"
              variant="outlined"
              value={shippingAddress.province}
              onChange={(e) => setShippingAddress((state) => ({ ...state, province: e.target.value }))}
              autoComplete="address-level1"
              required
            />
            <TextField
              id="postal-code-field"
              label="postal-code"
              variant="outlined"
              value={shippingAddress.postalCode}
              onChange={(e) => setShippingAddress((state) => ({ ...state, postalCode: e.target.value }))}
              autoComplete="postal-code"
              required
            />
            <TextField
              id="country-field"
              label="country"
              variant="outlined"
              value={shippingAddress.country}
              onChange={(e) => setShippingAddress((state) => ({ ...state, country: e.target.value }))}
              autoComplete="country-name"
              required
            />
            <Button variant="contained" color="secondary" type="submit">
              Confirm Address
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}
