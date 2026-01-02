import React from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import QuoteCalculator from './components/QuoteCalculator';
import Footer from './components/Footer';

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navigation />
      <Hero />
      <About />
      <Services />
      <QuoteCalculator />
      <Footer />
    </div>
  );
}

export default App;
