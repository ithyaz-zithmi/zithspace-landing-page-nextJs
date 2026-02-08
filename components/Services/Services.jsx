'use client';
import Image from 'next/image';
import styles from './Services.module.css';

import webImg from '@/assets/html.png';
import mobileImg from '@/assets/mobile.png';
import custimg from '@/assets/support.png';
import uiuximg from '@/assets/uiux.png';
import saasimg from '@/assets/saas.png';
import apiimg from '@/assets/api.png';

const services = [
  {
    title: 'Web Application Development',
    desc: 'Building responsive, scalable web applications with modern frameworks and cutting-edge technologies.',
    image: webImg,
    color: '#eff6ff', // Blue
  },
  {
    title: 'Mobile App Development',
    desc: 'Native and cross-platform mobile solutions for iOS and Android that deliver exceptional user experiences.',
    image: mobileImg,
    color: '#fef2f2', // Red/Pink
  },
  {
    title: 'Custom Software Solutions',
    desc: 'Tailored software development designed around your unique business challenges, workflows, and growth goals.',
    image: custimg,
    color: '#f0fdf4', // Green
  },
  {
    title: 'UI/UX Design',
    desc: 'Creating intuitive, visually refined interfaces that engage users and drive meaningful conversions.',
    image: uiuximg,
    color: '#faf5ff', // Purple
  },
  {
    title: 'Saas Product Development',
    desc: 'Creating intuitive, visually refined interfaces that engage users and drive meaningful conversions.',
    image: saasimg,
    color: '#fff7ed', // Light Orange
  },
  {
    title: 'API & System Intergration',
    desc: 'Creating intuitive, visually refined interfaces that engage users and drive meaningful conversions.',
    image: apiimg,
    color: '#f0fdfa', // Teal
  },
];

const Services = () => {
  return (
    <section id="service" className={styles.servicesSection}>
      <div className={styles.container}>
        {/* 🔹 Section Header */}
        <div className={styles.header}>
          <span className={styles.badge}>Our Services</span>
          <h2 className={styles.heading}>
            Comprehensive <span>Digital Solutions</span>
          </h2>
        </div>

        {/* 🔹 Services Grid */}
        <div className={styles.grid}>
          {services.map((service, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.content}>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
                <button className={styles.btn}>Learn more</button>
              </div>

              <div
                className={styles.imageWrapper}
                style={{ '--bg-color': service.color || '#f1f5f9' }}
              >
                <Image src={service.image} alt={service.title} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
