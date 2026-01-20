import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import QuoteCalculator from '../components/QuoteCalculator';
import ContactForm from '../components/ContactForm';

import { useTranslation } from 'react-i18next';
import useSeo from '../utils/useSeo';

function Home() {
    const { t } = useTranslation();

    useSeo(
        'SmallPush - CiviCRM & Drupal Experts',
        t('hero.subtitle', 'Expert CiviCRM and Drupal Solutions for NGOs and Companies.'),
        {
            image: '/logo.png',
            url: window.location.href,
            keywords: 'civicrm, drupal, software, development, smallpush, ngo'
        }
    );

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
