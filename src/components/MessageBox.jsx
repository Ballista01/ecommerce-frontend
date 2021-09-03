import PropTypes from 'prop-types';
import { Stack, Typography } from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error';
import React from 'react';
import { MSGBOX_TYPE_ERROR } from '../constants/messageBoxConstants';

function MessageBox(props) {
  const { type, message } = props;
  return (
    <Stack spacing={2} justifySelf="center" p={2}>
      {type === MSGBOX_TYPE_ERROR ? <ErrorIcon /> : null}
      <Typography variant="h4">{message}</Typography>
    </Stack>
  );
}

MessageBox.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default MessageBox;
