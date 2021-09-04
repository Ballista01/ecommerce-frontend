/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import { Box } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import Products from '../components/Products';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';
import { listProducts, selectProductList } from '../slices/productListSlice';
import { MSGBOX_TYPE_ERROR } from '../constants/messageBoxConstants';

function HomeScreen() {
  const productList = useSelector(selectProductList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts());
  }, []);
  return (
    <Box display="grid">
      {productList.loading ? (
        <LoadingBox />
      ) : productList.error ? (
        <MessageBox type={MSGBOX_TYPE_ERROR} message={productList.error} />
      ) : (
        <Products products={productList.products} />
      )}
    </Box>
  );
}

export default HomeScreen;
