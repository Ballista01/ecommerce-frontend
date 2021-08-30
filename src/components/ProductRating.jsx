import PropTypes from 'prop-types';
import {
  Box, Icon, Link, Typography,
} from '@material-ui/core';
// import { Star, StarOutline, StarHalf } from '@material-ui/icons';
import React from 'react';

export default function ProductRating(props) {
  const { rating, numReviews } = props;
  const numFull = Math.floor(rating);
  const numHalf = Math.floor((rating - numFull) / 0.5);
  const numEmpty = 5 - numFull - numHalf;
  const stars = [];
  for (let i = 0; i < numFull; i += 1) {
    stars.push(<Icon>star</Icon>);
  }
  if (numHalf > 0) stars.push(<Icon>star_half</Icon>);
  for (let i = 0; i < numEmpty; i += 1) {
    stars.push(<Icon>star_outline</Icon>);
  }

  return (
    <Box component="div">
      {stars}
      {/* {`${rating.toFixed(2)} / 5.00`} */}
      <Link href="#review" sx={{ textDecoration: 'underline' }}>
        <Typography>{`${numReviews} Reviews`}</Typography>
      </Link>
    </Box>
  );
}

ProductRating.propTypes = {
  rating: PropTypes.number.isRequired,
  numReviews: PropTypes.number.isRequired,
};
