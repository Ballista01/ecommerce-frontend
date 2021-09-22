/* eslint-disable no-nested-ternary */
import {
  Button, Container, Paper, Stack, TextField, Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { MSGBOX_TYPE_ERROR } from '../constants/messageBoxConstants';
import { selectUserProfile, fetchUserProfile, updateUserProfile } from '../slices/userProfileSlice';

export default function UserProfileScreen() {
  const dispatch = useDispatch();
  const { loading, error, userInfo } = useSelector(selectUserProfile);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pwdConfirm, setPwdConfirm] = useState('');
  const [pwdCheckMessage, setPwdCheckMessage] = useState('');

  useEffect(() => {
    if (!userInfo) dispatch(fetchUserProfile());
    else {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [dispatch, userInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updateInfo = { name, email };
    if (password) {
      if (pwdConfirm === password) {
        updateInfo.password = password;
      } else {
        setPwdCheckMessage("New passwords don't match!");
        return;
      }
    }
    dispatch(updateUserProfile(updateInfo));
  };

  return (
    <Container
      sx={{
        paddingTop: 5,
        paddingBottom: 5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox type={MSGBOX_TYPE_ERROR} message={error} />
      ) : (
        <Paper>
          <Stack spacing={5} padding={5}>
            <Typography variant="h4">Profile</Typography>
            <form onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  id="name-field"
                  label="name"
                  variant="outlined"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoComplete="name"
                />
                <TextField
                  id="email-field"
                  label="E-mail"
                  variant="outlined"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  required
                  autoComplete="email"
                />
                <TextField
                  id="password-field"
                  label="Password"
                  variant="outlined"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  required={Boolean(pwdConfirm)}
                  autoComplete="new-password"
                />
                <TextField
                  id="pwd-confirm-field"
                  label="Confirm Password"
                  variant="outlined"
                  type="password"
                  value={pwdConfirm}
                  onChange={(e) => {
                    setPwdConfirm(e.target.value);
                  }}
                  required={Boolean(password)}
                  autoComplete="new-password"
                />
                {pwdCheckMessage && (
                  <Typography variant="p" sx={{ color: 'red' }}>
                    {pwdCheckMessage}
                  </Typography>
                )}
                {userInfo && userInfo.updated && (
                  <Typography variant="p" sx={{ color: 'green' }}>
                    Profile updated successfully
                  </Typography>
                )}
                <Button type="submit" variant="contained" onSubmit={handleSubmit}>
                  Confirm Update
                </Button>
              </Stack>
            </form>
          </Stack>
        </Paper>
      )}
    </Container>
  );
}
