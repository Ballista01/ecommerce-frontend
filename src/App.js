/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductScreen from './screens/ProductScreen';
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import UserProfileScreen from './screens/UserProfileScreen';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main style={{ marginTop: 60 }}>
          <Switch>
            <Route path="/" component={HomeScreen} exact />
            <Route path="/p/:productID" component={ProductScreen} />
            <Route path="/cart/:productID?" component={CartScreen} />
            <Route path="/signin" component={SigninScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/shipping" component={ShippingAddressScreen} />
            <Route path="/payment" component={PaymentMethodScreen} />
            <Route path="/placeorder" component={PlaceOrderScreen} />
            <Route path="/order/:orderID" component={OrderScreen} />
            <Route path="/orderhistory" component={OrderHistoryScreen} />
            <Route path="/profile" component={UserProfileScreen} />
          </Switch>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
