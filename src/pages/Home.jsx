import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import QuoteCalculator from '../components/QuoteCalculator';
import ContactForm from '../components/ContactForm';

function Home() {
    return (
        <>
            <Hero />
            <About />
            <Services />
            <QuoteCalculator />
            <ContactForm />
        </>
    );
}

export default Home;
