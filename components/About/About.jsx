'use client';
import Image from 'next/image';
import styles from './About.module.css';
import aboutImage from '@/assets/logo.svg';

const About = () => {
  return (
    <section id="about" className={styles.aboutSection}>
      <div className={styles.aboutCard}>
        {/* Grid overlay */}
        <div className={styles.gridOverlay} />

        {/* Content */}
        <div className={styles.content}>
          <h2 className={styles.title}>
            Zithtech Transforming <br />
            Ideas Into <span>Digital Excellence</span>
          </h2>

          <p className={styles.description}>
            Zithtech is a forward-thinking IT services and product company dedicated to building
            scalable, modern digital solutions. We combine cutting-edge technology with creative
            innovation to deliver exceptional results for businesses worldwide.
          </p>

          <p className={styles.description}>
            Our dual focus on client services and proprietary products allows us to understand both
            sides of the digital landscape, bringing unique insights to every project we undertake.
          </p>

          <button className={styles.ctaButton}>Book Free Consultation</button>
        </div>

        {/* Image */}
        <div className={styles.imageWrapper}>
          <Image src={aboutImage} alt="Zithtech Logo" />
        </div>
      </div>
    </section>
  );
};

export default About;
