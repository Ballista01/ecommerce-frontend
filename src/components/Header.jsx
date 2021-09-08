import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Link, Badge } from '@material-ui/core';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCart } from '../slices/cartSlice';

export default function Header() {
  const numItemsInCart = useSelector(selectCart).totalQty;
  const history = useHistory();

  const handleCartClick = () => {
    history.push('/cart');
  };

  return (
    <header className="App-header">
      <AppBar position="sticky" color="primary">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" flexGrow={1}>
            <Link
              to="/"
              component={RouterLink}
              sx={{ textDecoration: 'none', color: 'text.primary' }}
            >
              MERN Mall
            </Link>
          </Typography>
          <IconButton edge="end" color="inherit" aria-label="cart" onClick={handleCartClick}>
            <Badge badgeContent={numItemsInCart} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
    </header>
  );
}
