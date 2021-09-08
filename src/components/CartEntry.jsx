import PropTypes from 'prop-types';
import {
  Grid, MenuItem, Select, Typography, Button,
} from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import { updateCartItem, deleteCartItem } from '../slices/cartSlice';

export default function CartEntry(props) {
  const { product } = props;
  const dispatch = useDispatch();

  const handleQtyChange = (e) => {
    dispatch(updateCartItem(product.productID, e.target.value));
  };
  const handleDelete = () => {
    dispatch(deleteCartItem(product.productID));
  };

  return (
    <Grid container alignItems="center" display="flex" direction="row" height="3rem">
      <Grid item md={1} xs={1}>
        <img
          src="https://source.unsplash.com/random"
          alt={product.image}
          style={{
            maxHeight: '3rem',
            maxWidth: '3rem',
          }}
        />
      </Grid>
      <Grid item md={5} xs={6} flex="1 1" padding={1}>
        <Typography variant="p">{product.name}</Typography>
      </Grid>
      <Grid item md={2} flex="0 1">
        <Select value={product.qty} onChange={handleQtyChange}>
          {[...Array(product.countInStock).keys()].map((x) => (
            <MenuItem value={x + 1} key={`${product.productID}qty${x + 1}`}>
              {x + 1}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid item md={2} xs={3} display="flex" justifyContent="center">
        <Typography variant="h5">
          $
          {(product.price * product.qty).toFixed(2)}
        </Typography>
      </Grid>
      <Grid item md={2} xs={2}>
        <Button onClick={handleDelete}>Delete</Button>
      </Grid>
    </Grid>
  );
}

CartEntry.propTypes = {
  product: PropTypes.shape({
    productID: PropTypes.string.isRequired,
    countInStock: PropTypes.number,
    image: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    qty: PropTypes.number,
  }).isRequired,
};
