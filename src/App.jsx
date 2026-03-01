import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import News from './pages/News';
import DonorFunnel from './pages/DonorFunnel';
import CookieBanner from './components/CookieBanner';
import { initializeConsent } from './utils/cookieConsent';

function App() {
  React.useEffect(() => {
    initializeConsent();
  }, []);

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navigation />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:id" element={<News />} />
            <Route path="/donor-funnel" element={<DonorFunnel />} />
          </Routes>
        </main>
        <Footer />
        <CookieBanner />
      </div>
    </Router>
  );
}

export default App;
