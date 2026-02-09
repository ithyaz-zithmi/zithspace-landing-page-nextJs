'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import styles from './Navigation.module.css';
import logoImage from '@/assets/logo.svg';

const menuItems = [
  { name: 'Home', icon: 'solar:home-2-bold' },
  { name: 'About', icon: 'solar:user-bold' },
  { name: 'Service', icon: 'solar:widget-5-bold' },
  { name: 'Product', icon: 'solar:box-bold' },
  { name: 'Process', icon: 'solar:chart-bold' },
  { name: 'Contact', icon: 'solar:letter-bold' }
];

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = menuItems.map((item) => item.name.toLowerCase());
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

  const scrollToSection = (sectionName) => {
    const section = document.getElementById(sectionName.toLowerCase());
    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

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
    <>
      {/* Desktop Navigation */}
      <nav className={styles.navigation}>
        <div className={styles.logoContainer}>
          <Image src={logoImage} alt="ZithSpace Logo" className={styles.logoImage} priority />
        </div>
<div className={styles.mobileBrand}>
  <h3 style={{ fontFamily: "-apple-system" }}>Zithtech</h3>
</div>


        <ul className={styles.navList}>
          {menuItems.map((item, index) => (
            <li key={index} className={styles.navItem}>
              <a
                href={`#${item.name.toLowerCase()}`}
                className={`${styles.navLink} ${activeSection === item.name.toLowerCase() ? styles.active : ''}`}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>

        <button className={styles.contactBtn} onClick={scrollToContact}>
          Get in Touch
        </button>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className={styles.bottomNav}>
        {menuItems.map((item, index) => (
          <button
            key={index}
            className={`${styles.bottomNavItem} ${activeSection === item.name.toLowerCase() ? styles.bottomNavActive : ''}`}
            onClick={() => scrollToSection(item.name)}
          >
            <Icon icon={item.icon} className={styles.bottomNavIcon} />
            <span className={styles.bottomNavLabel}>{item.name}</span>
          </button>
        ))}
      </nav>
    </>
  );
};

export default Navigation;
