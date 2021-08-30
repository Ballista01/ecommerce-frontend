/* eslint-disable no-underscore-dangle */
import PropTypes from 'prop-types';
import {
  Card, CardContent, CardMedia, Link, Typography,
} from '@material-ui/core';
import React from 'react';
import ProductRating from './ProductRating';

export default function ProductCard(props) {
  const { product } = props;
  const tempImg = 'https://source.unsplash.com/random';
  return (
    <Link href="product.html" sx={{ textDecoration: 'none' }}>
      <Card key={product._id} className="card" sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardMedia component="img" image={tempImg} alt={product.name} height={300} />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h5">{product.name}</Typography>
          <ProductRating rating={product.rating} numReviews={product.numReviews} />
          <Typography>{`$${product.price}`}</Typography>
        </CardContent>
      </Card>
    </Link>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    // img: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.string,
    rating: PropTypes.string,
    numReviews: PropTypes.number.isRequired,
  }).isRequired,
};