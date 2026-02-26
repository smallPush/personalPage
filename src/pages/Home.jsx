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
        t('seo.home.title', 'SmallPush - CiviCRM & Drupal Experts'),
        t('seo.home.description', 'Expert CiviCRM and Drupal Solutions for NGOs and Companies.'),
        {
            image: '/logo.png',
            url: window.location.href,
            keywords: t('seo.home.keywords', 'civicrm, drupal, software, development, smallpush, ngo')
        }
    );

    return (
        <div className="container px-4 px-lg-5">
            <Hero />
            <section id="about" className="py-5">
                <About />
            </section>
            <section id="services" className="py-5">
                <Services />
            </section>
            <section id="quote" className="py-5">
                <QuoteCalculator />
            </section>
            <section id="contact" className="py-5">
                <ContactForm />
            </section>
        </div>
    );
}

export default Home;
