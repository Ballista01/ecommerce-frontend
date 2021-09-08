/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductScreen from './screens/ProductScreen';
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Switch>
            <Route path="/" component={HomeScreen} exact />
            <Route path="/p/:productID" component={ProductScreen} />
            <Route path="/cart/:productID?" component={CartScreen} />
          </Switch>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
