/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
  Button,
  Stack,
} from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { selectProductDetail, getProductDetail } from '../slices/productDetailSlice';
import ProductRating from '../components/ProductRating';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { MSGBOX_TYPE_ERROR } from '../constants/messageBoxConstants';

function ProductScreen() {
  const { productID } = useParams();
  const productDetail = useSelector(selectProductDetail);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductDetail(productID));
  }, [productID]);

  return (
    <Box display="grid">
      {productDetail.loading ? (
        <LoadingBox />
      ) : productDetail.error ? (
        <MessageBox type={MSGBOX_TYPE_ERROR} message={productDetail.error} />
      ) : (
        <Stack p={1}>
          <Link to="/">
            <Typography variant="h6">Back to Result</Typography>
          </Link>
          <Grid container flexDirection="row" spacing={2} marginTop={-1}>
            <Grid item lg={4} xs={12} sx={{ width: '100%' }}>
              <img
                src="https://source.unsplash.com/random"
                alt={productDetail.product.name}
                style={{ maxHeight: '100%', maxWidth: '100%' }}
              />
            </Grid>
            <Grid item lg={4} xs={12}>
              <Typography variant="h3">{productDetail.product.name}</Typography>
              <ProductRating
                rating={productDetail.product.rating}
                numReviews={productDetail.product.numReviews}
                productID={productID}
              />
              <Typography variant="h4">{`$ ${productDetail.product.price.toFixed(2)}`}</Typography>
              <Typography variant="h5">Description:</Typography>
              <Typography variant="p">{productDetail.product.description}</Typography>
            </Grid>
            <Grid item lg={4} xs={12}>
              <Card>
                <CardContent>
                  <Grid
                    container
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gridTemplateRows: '1fr 1fr',
                    }}
                  >
                    <Typography variant="h5" sx={{ justifySelf: 'left' }}>
                      Price:
                    </Typography>
                    <Typography variant="h5" sx={{ justifySelf: 'right' }}>
                      $
                      {productDetail.product.price.toFixed(2)}
                    </Typography>
                    <Typography variant="h5" sx={{ justifySelf: 'left' }}>
                      Status:
                    </Typography>
                    <Typography variant="h5" sx={{ justifySelf: 'right' }}>
                      {productDetail.product.countInStock > 0 ? 'In Stock' : 'Sold Out'}
                    </Typography>
                  </Grid>
                </CardContent>
                <CardActions>
                  <Button disabled={productDetail.product.countInStock <= 0} sx={{ flexGrow: 1 }}>
                    Add To Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Stack>
      )}
    </Box>
  );
}

export default ProductScreen;
