'use client';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import styles from './Footer.module.css';
import logoImage from '@/assets/logo.svg';
import ContactForm from '../Contact/ContactForm';

const Footer = () => {
  return (
    <footer className={styles.footerContainer}>
      <div style={{ paddingTop: '100px', marginTop: '-100px' }}>
        <ContactForm />
      </div>

      {/* MAIN FOOTER */}
      <div className={styles.mainFooter}>
        {/* NEW TOP ROW: Logo and Email side by side */}
        <div className={styles.topRow}>
          <div className={styles.logoRow}>
            <Image src={logoImage} alt="ZithSpace Logo" className={styles.logosquar} />
            <h1 className={styles.brandName}>Zithtech</h1>
          </div>

          <div className={styles.newsletter}>
            <input type="email" placeholder="Enter your Company Email" />
            <button>Send</button>
          </div>
        </div>

        <div className={styles.contentWrapper}>
          {/* Brand Column */}
          <div className={styles.brandCol}>
            <p className={styles.brandDesc}>
              Partner with Zithtech to transform your business with next-gen AI and smart IT
              solutions.
            </p>
            <div className={styles.contactLinks}>
              <div className={styles.contactItem}>
                <Icon icon="mdi:email-outline" /> hello@zithtech.com
              </div>
              <div className={styles.contactItem}>
                <Icon icon="mdi:phone-outline" /> 80722 55742
              </div>
              <div className={styles.contactItem}>
                <Icon icon="mdi:phone-outline" /> 88387 82347
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.linkCol}>
            <h4>Quick Link</h4>
            <ul>
              <li>Home</li>
              <li>About Us</li>
              <li>Service</li>
              <li>Product</li>
              <li>Process</li>
              <li>Contact Us</li>
            </ul>
          </div>

          {/* Socials */}
          <div className={styles.linkCol}>
            <h4>Join Us</h4>
            <div className={styles.socialLink}>
              <Icon icon="mdi:linkedin" color="#0077B5" /> LinkedIn
            </div>
            <div className={styles.socialLink}>
              <Icon icon="mdi:instagram" color="#E4405F" /> Instagram
            </div>
          </div>

          {/* Location */}
          <div className={styles.locationCol}>
            <h4>Company Location</h4>
            <div className={styles.flagRow}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://flagcdn.com/w40/in.png" alt="India" />
            </div>
            <p className={styles.address}>
              No 37,Balaji Towers,Ground Floor,Ram Nagar South,8th Cross Street,2nd Main
              Road,Madipakkam,Chennai-600091
            </p>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <p>Copyright © {new Date().getFullYear()} Zithtech | All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
