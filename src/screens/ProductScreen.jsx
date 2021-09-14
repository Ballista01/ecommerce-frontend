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
  Select,
  MenuItem,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useHistory } from 'react-router-dom';
import { selectProductDetail, getProductDetail } from '../slices/productDetailSlice';
import ProductRating from '../components/ProductRating';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { MSGBOX_TYPE_ERROR } from '../constants/messageBoxConstants';

function ProductScreen() {
  const { productID } = useParams();
  const productDetail = useSelector(selectProductDetail);
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const history = useHistory();

  useEffect(() => {
    dispatch(getProductDetail(productID));
  }, [productID]);

  const addToCartHandler = () => {
    history.push(`/cart/${productID}?qty=${qty}`);
  };

  return (
    <Box display="grid">
      {productDetail.loading ? (
        <LoadingBox />
      ) : productDetail.error ? (
        <MessageBox type={MSGBOX_TYPE_ERROR} message={productDetail.error} />
      ) : (
        <Stack p={2}>
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
                  <Stack spacing={1}>
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="h5">Price:</Typography>
                      <Typography variant="h5">
                        $
                        {productDetail.product.price.toFixed(2)}
                      </Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="h5" sx={{ justifySelf: 'left' }}>
                        Status:
                      </Typography>
                      <Typography variant="h5" sx={{ justifySelf: 'right' }}>
                        {productDetail.product.countInStock > 0 ? 'In Stock' : 'Sold Out'}
                      </Typography>
                    </Box>
                    {productDetail.product.countInStock > 0 && (
                      <Box display="flex" justifyContent="space-between">
                        <Typography variant="h5">Qty:</Typography>
                        <Select value={qty} onChange={(e) => setQty(e.target.value)}>
                          {[...Array(productDetail.product.countInStock).keys()].map((x) => (
                            <MenuItem value={x + 1} key={`${productID}qty${x + 1}`}>
                              {x + 1}
                            </MenuItem>
                          ))}
                        </Select>
                      </Box>
                    )}
                  </Stack>
                </CardContent>
                <CardActions>
                  <Button
                    disabled={productDetail.product.countInStock <= 0}
                    sx={{ flexGrow: 1 }}
                    onClick={addToCartHandler}
                  >
                    {productDetail.product.countInStock <= 0 ? 'Out of Stock' : 'Add To Cart'}
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
