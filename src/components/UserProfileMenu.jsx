import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { signOut, selectUserSignin } from '../slices/userSigninSlice';

export default function UserProfileMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const userSignin = useSelector(selectUserSignin);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleProfile = () => {
    setAnchorEl(null);
    if (userSignin.userInfo) history.push('/profile');
    else history.push('/signin?redirect=/profile');
  };
  const handleSignOut = () => {
    setAnchorEl(null);
    dispatch(signOut());
  };
  const handleSigninClick = () => {
    let redirect = location.pathname;
    if (redirect === '/register' || redirect === '/signin') redirect = '';
    history.push(`/signin${redirect}`);
  };
  const handleShowOrders = () => {
    setAnchorEl(null);
    if (userSignin.userInfo) history.push('/orderhistory');
    else history.push('/signin?redirect=/orderhistory');
  };

  return (
    <div>
      {userSignin.userInfo ? (
        <div>
          <Button id="user-profile" onClick={handleClick} color="inherit" variant="text">
            {userSignin.userInfo.name}
          </Button>
          <Menu
            id="user-profile-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleShowOrders}>Orders</MenuItem>
            <MenuItem onClick={handleProfile}>Profile</MenuItem>
            <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
          </Menu>
        </div>
      ) : (
        <Button type="text" color="inherit" onClick={handleSigninClick}>
          Sign In
        </Button>
      )}
    </div>
  );
}
