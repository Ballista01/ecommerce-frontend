/* eslint-disable react/forbid-prop-types */
import {
  Grid, Paper, Stack, Typography, Link,
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';
import CartEntry from './CartEntry';

export default function OrderEntry(props) {
  const {
    order: {
      orderItems,
      createdAt,
      totalPrice,
      shippingAddress: { fullName },
      _id,
      isPaid,
    },
  } = props;
  const orderDate = new Date(createdAt);

  return (
    <Link to={`/order/${_id}`} component={RouterLink} sx={{ textDecoration: 'none' }}>
      <Paper>
        <Stack spacing={2} padding={3}>
          <Grid container>
            <Grid item sm={3} xs={5}>
              <Stack>
                <Typography variant="p">ORDER PLACED</Typography>
                <Typography variant="p">{orderDate.toDateString()}</Typography>
              </Stack>
            </Grid>
            <Grid item sm={2} xs={3}>
              <Stack>
                <Typography variant="p">TOTAL</Typography>
                <Typography variant="p">{`$${totalPrice.toFixed(2)}`}</Typography>
              </Stack>
            </Grid>
            <Grid item sm={2} xs={4}>
              <Stack>
                <Typography variant="p">SHIP TO</Typography>
                <Typography variant="p">{fullName}</Typography>
              </Stack>
            </Grid>
            <Grid item sm={5} xs={12} display="flex" justifyContent="flex-end">
              <Stack>
                <Typography variant="p">
                  ORDER #
                  {_id}
                </Typography>
                {isPaid ? (
                  <Typography variant="p" display="flex" justifyContent="flex-end">
                    Paid
                  </Typography>
                ) : (
                  <Typography
                    variant="p"
                    display="flex"
                    justifyContent="flex-end"
                    sx={{ color: 'red' }}
                  >
                    Unpaid
                  </Typography>
                )}
              </Stack>
            </Grid>
          </Grid>
          {orderItems.map((entry) => (
            <CartEntry canModify={false} product={entry} key={`${_id}${entry.productID}`} />
          ))}
        </Stack>
      </Paper>
    </Link>
  );
}

OrderEntry.propTypes = {
  order: PropTypes.shape({
    orderItems: PropTypes.arrayOf(Object).isRequired,
    createdAt: PropTypes.instanceOf(Date).isRequired,
    totalPrice: PropTypes.number.isRequired,
    isPaid: PropTypes.bool.isRequired,
    shippingAddress: PropTypes.shape({
      fullName: PropTypes.string.isRequired,
    }),
    _id: PropTypes.object.isRequired,
  }).isRequired,
};
