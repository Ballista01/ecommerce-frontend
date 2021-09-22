import PropTypes from 'prop-types';
import {
  Grid, MenuItem, Select, Typography, Button,
} from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import { updateCartItem, deleteCartItem } from '../slices/cartSlice';

export default function CartEntry(props) {
  const { product, canModify } = props;
  const dispatch = useDispatch();

  const handleQtyChange = (e) => {
    dispatch(updateCartItem(product.productID, e.target.value));
  };
  const handleDelete = () => {
    dispatch(deleteCartItem(product.productID));
  };

  return (
    <Grid
      container
      alignItems="center"
      display="flex"
      direction="row"
      justifyContent="space-between"
    >
      <Grid item md={1} sm={1} xs={2}>
        <img
          src="https://source.unsplash.com/random"
          alt={product.image}
          style={{
            maxHeight: '3rem',
            maxWidth: '3rem',
          }}
        />
      </Grid>
      <Grid item md={5} sm={5} xs={8} padding={1}>
        <Typography variant="p">{product.name}</Typography>
      </Grid>
      <Grid item md={2} sm={1} xs={2} display="flex" justifyContent="center">
        {canModify ? (
          <Select value={product.qty} onChange={handleQtyChange}>
            {[...Array(product.countInStock).keys()].map((x) => (
              <MenuItem value={x + 1} key={`${product.productID}qty${x + 1}`}>
                {x + 1}
              </MenuItem>
            ))}
          </Select>
        ) : (
          <Typography variant="h6">
            {product.qty}
            {' '}
            {product.qty === 1 ? 'pc' : 'pcs'}
          </Typography>
        )}
      </Grid>

      <Grid item md={4} sm={4} xs={12} display="flex" justifyContent="space-evenly">
        <Typography
          variant="h5"
          flexGrow={1}
          display="flex"
          justifyContent={canModify ? 'flex-start' : 'flex-end'}
        >
          $
          {(product.price * product.qty).toFixed(2)}
        </Typography>
        {canModify && <Button onClick={handleDelete}>Delete</Button>}
      </Grid>
    </Grid>
  );
}

CartEntry.defaultProps = {
  canModify: true,
};
CartEntry.propTypes = {
  canModify: PropTypes.bool,
  product: PropTypes.shape({
    productID: PropTypes.string.isRequired,
    countInStock: PropTypes.number,
    image: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    qty: PropTypes.number,
  }).isRequired,
};
