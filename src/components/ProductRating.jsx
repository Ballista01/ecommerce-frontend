/* eslint-disable no-nested-ternary */
import PropTypes from 'prop-types';
import { Box, Icon, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import { Star, StarOutline, StarHalf } from '@material-ui/icons';
import React from 'react';

export default function ProductRating(props) {
  const { rating, numReviews, productID } = props;
  const history = useHistory();
  const handleClick = () => {
    history.push(`/p/${productID}#review`);
  };

  return (
    <Box component="div">
      {/* {stars} */}
      <Icon>{rating < 0.25 ? 'star_outline' : rating < 0.75 ? 'star_half' : 'star'}</Icon>
      <Icon>{rating - 1 < 0.25 ? 'star_outline' : rating - 1 < 0.75 ? 'star_half' : 'star'}</Icon>
      <Icon>{rating - 2 < 0.25 ? 'star_outline' : rating - 2 < 0.75 ? 'star_half' : 'star'}</Icon>
      <Icon>{rating - 3 < 0.25 ? 'star_outline' : rating - 3 < 0.75 ? 'star_half' : 'star'}</Icon>
      <Icon>{rating - 4 < 0.25 ? 'star_outline' : rating - 4 < 0.75 ? 'star_half' : 'star'}</Icon>
      {`${rating.toFixed(2)} / 5.00`}
      <Typography onClick={handleClick}>{`${numReviews} Reviews`}</Typography>
    </Box>
  );
}

ProductRating.propTypes = {
  rating: PropTypes.number.isRequired,
  numReviews: PropTypes.number.isRequired,
  productID: PropTypes.string.isRequired,
};
