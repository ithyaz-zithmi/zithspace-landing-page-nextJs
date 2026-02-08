'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './Navigation.module.css';
import logoImage from '@/assets/logo.svg';

const menuItems = ['Home', 'About', 'Service', 'Product', 'Process', 'Contact'];

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = menuItems.map((item) => item.toLowerCase());
      const scrollPosition = window.scrollY + 150;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }

      if (window.scrollY < 100) {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContact = () => {
    const contactElement =
      document.getElementById('contact') || document.querySelector('.floatingContainer');

    if (contactElement) {
      contactElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    } else {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav className={styles.navigation}>
      <div className={styles.logoContainer}>
        <Image src={logoImage} alt="ZithSpace Logo" className={styles.logoImage} priority />
      </div>
      <ul className={styles.navList}>
        {menuItems.map((item, index) => (
          <li key={index} className={styles.navItem}>
            <a
              href={`#${item.toLowerCase()}`}
              className={`${styles.navLink} ${activeSection === item.toLowerCase() ? styles.active : ''}`}
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
      <button className={styles.contactBtn} onClick={scrollToContact}>
        Get in Touch
      </button>
    </nav>
  );
};

export default Navigation;
