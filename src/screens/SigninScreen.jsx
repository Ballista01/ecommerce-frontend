/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import {
  Button, Paper, Stack, TextField, Link, Typography, Container,
} from '@material-ui/core';
import { Link as RouterLink, useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserSignin, signin } from '../slices/userSigninSlice';
import LoadingBox from '../components/LoadingBox';

export default function SigninScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const location = useLocation();
  const history = useHistory();
  const userSignin = useSelector(selectUserSignin);
  const { userInfo, loading, error } = userSignin;
  const dispatch = useDispatch();

  const redirect = location.search ? location.search.split('=')[1] : '/';

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [userInfo]);

  return (
    <Container
      sx={{
        marginTop: 8,
        marginBottom: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {loading ? (
        <LoadingBox />
      ) : (
        <Paper>
          <form onSubmit={handleSubmit}>
            <Stack spacing={5} padding={5}>
              <Typography variant="h4">Sign In</Typography>
              <TextField
                id="email-field"
                label="E-mail"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                autoFocus
              />
              <TextField
                id="password-field"
                label="Password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                autoComplete="current-password"
                required
              />
              {error ? <span style={{ color: 'red' }}>{error}</span> : ''}
              <Stack direction="row" alignItems="baseline" spacing={5}>
                <Link component={RouterLink} to={`/register?redirect=${redirect}`}>
                  New user? Sign up!
                </Link>
                <Button variant="contained" color="secondary" type="submit">
                  Sign In
                </Button>
              </Stack>
            </Stack>
          </form>
        </Paper>
      )}
    </Container>
  );
}
