import { CircularProgress, Stack, Typography } from '@material-ui/core';
import React from 'react';

function LoadingBox() {
  return (
    <Stack spacing={2} direction="column">
      <CircularProgress />
      <Typography type="h4">Loading...</Typography>
    </Stack>
  );
}

export default LoadingBox;
