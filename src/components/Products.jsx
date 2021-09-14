/* eslint-disable no-underscore-dangle */
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import React from 'react';
import ProductCard from './ProductCard';

export default function Products(props) {
  const { products } = props;
  const productList = products.map((product) => (
    <Grid item key={product._id} xs={12} sm={6} md={4} lg={3} xl={2}>
      <ProductCard product={product} />
    </Grid>
  ));

  return (
    <Grid container spacing={2} padding={5}>
      {productList}
    </Grid>
  );
}

Products.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
};
