import { Box, Typography } from '@material-ui/core';
import React from 'react';

export default function Footer() {
  return (
    <Box sx={{ backgroundColor: '#1976d2', padding: 6 }} component="footer">
      <Typography variant="h6" align="center">
        MERN MALL
      </Typography>
      <Typography variant="h6" align="center">
        Copyright © Ballista01 All rights reserved.
      </Typography>
    </Box>
  );
}
