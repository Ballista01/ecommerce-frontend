/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import sampleData from './resource/data';
import Products from './components/Products';

function App() {
  const { products } = sampleData;
  console.log('sampleData.products');
  console.log(products);
  return (
    <div className="App">
      <Header />
      <main>
        <Products products={products} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
