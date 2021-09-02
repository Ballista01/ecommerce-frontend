/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { Box } from '@material-ui/core';
import axios from 'axios';
// import sampleData from '../resource/data';
import Products from '../components/Products';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';
import { MSGBOX_TYPE_ERROR } from '../constants/messageBoxConstants';

function HomeScreen() {
  // const { products } = sampleData;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('/api/p');
        setLoading(false);
        setProducts(data);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <Box>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox type={MSGBOX_TYPE_ERROR} message={error} />
      ) : (
        <Products products={products} />
      )}
    </Box>
  );
}

export default HomeScreen;
