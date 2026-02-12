'use client';

import { motion } from 'framer-motion';
import styles from './page.module.css';

import Navigation from '@/components/Navigation/Navigation';
import Hero from '@/components/Hero/Hero';
import About from '@/components/About/About';
import Services from '@/components/Services/Services';
import Process from '@/components/Process/Process';
import Products from '@/components/Product/Products';
import Testimonials from '@/components/Testimonials/Testimonials';
import TechStack from '@/components/TechStack/TechStack';
import Footer from '@/components/Footer/Footer';
import WhyChooseUs from '@/components/WhyChooseUs/WhyChooseUs';

// Animation wrapper
const Section = ({ children, id, className }) => (
  <motion.section
    id={id}
    className={className}
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-100px' }}
    transition={{ duration: 0.8, ease: 'easeOut' }}
  >
    {children}
  </motion.section>
);

export default function Home() {
  return (
    <div className={styles.home}>
      <Navigation />

      <Section id="home">
        <Hero />
      </Section>

      <Section id="about">
        <About />
      </Section>

      <Section id="service">
        <Services />
      </Section>

      <Section id="product">
        <Products />
      </Section>

      <WhyChooseUs />

      <Section id="process">
        <Process />
      </Section>

      <Section>
        <Testimonials />
      </Section>

      <Section>
        <TechStack />
      </Section>

      <section id="contact">
        <Footer />
      </section>
    </div>
  );
}
