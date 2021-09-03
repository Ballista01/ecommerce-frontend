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
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import ProductRating from '../components/ProductRating';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { MSGBOX_TYPE_ERROR } from '../constants/messageBoxConstants';

function ProductScreen() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [product, setProduct] = useState({});
  // const { products } = sampleData;
  const { productID } = useParams();
  // const product = products.find((entry) => entry._id === productId);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/p/${productID}`);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchProduct();
  }, []);

  return (
    <Box flexDirection="column">
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox type={MSGBOX_TYPE_ERROR} message={error} />
      ) : (
        <Stack p={1}>
          <Link to="/">
            <Typography variant="h6">Back to Result</Typography>
          </Link>
          <Grid container flexDirection="row" spacing={2} marginTop={-1}>
            <Grid item lg={4} xs={12} sx={{ width: '100%' }}>
              <img
                src="https://source.unsplash.com/random"
                alt={product.name}
                style={{ maxHeight: '100%', maxWidth: '100%' }}
              />
            </Grid>
            <Grid item lg={4} xs={12}>
              <Typography variant="h3">{product.name}</Typography>
              <ProductRating
                rating={product.rating}
                numReviews={product.numReviews}
                productID={productID}
              />
              <Typography variant="h4">{`$ ${product.price.toFixed(2)}`}</Typography>
              <Typography variant="h5">Description:</Typography>
              <Typography variant="p">{product.description}</Typography>
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
                      {product.price.toFixed(2)}
                    </Typography>
                    <Typography variant="h5" sx={{ justifySelf: 'left' }}>
                      Status:
                    </Typography>
                    <Typography variant="h5" sx={{ justifySelf: 'right' }}>
                      {product.countInStock > 0 ? 'In Stock' : 'Sold Out'}
                    </Typography>
                  </Grid>
                </CardContent>
                <CardActions>
                  <Button disabled={product.countInStock <= 0} sx={{ flexGrow: 1 }}>
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
