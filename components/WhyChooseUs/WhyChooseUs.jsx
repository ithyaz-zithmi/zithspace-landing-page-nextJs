'use client';
import { useState, useRef } from 'react';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import styles from './WhyChooseUs.module.css';
import logoImage from '@/assets/logo.svg';

const WhyChooseUs = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const itemRefs = useRef([]);

  const features = [
    {
      title: 'Product-Driven Mindset',
      desc: 'We think like product owners, not just developers.',
      icon: 'solar:shop-2-bold',
      align: 'left',
    },
    {
      title: 'Scalable Architecture',
      desc: 'Built to grow with your business needs.',
      icon: 'solar:chat-round-call-bold',
      align: 'right',
    },
    {
      title: 'Clean UI/UX',
      desc: 'Beautiful interfaces that users love.',
      icon: 'solar:paint-roller-bold',
      align: 'left',
    },
    {
      title: 'Secure & Reliable',
      desc: 'Enterprise-grade security for your data.',
      icon: 'solar:shield-check-bold',
      align: 'right',
    },
    {
      title: 'Long-Term Support',
      desc: 'Partnership that extends beyond launch.',
      icon: 'solar:chat-round-call-bold',
      align: 'left',
    },
    {
      title: 'Zithtech Assure',
      desc: 'Our gold standard guarantee.',
      icon: 'solar:star-bold',
      align: 'center',
    },
  ];

  const handleLogoClick = () => {
    setActiveIdx((prev) => {
      const next = (prev + 1) % features.length;

      // scroll to that feature
      itemRefs.current[next]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });

      return next;
    });
  };

  const progressHeight = (activeIdx / (features.length - 1)) * 100;

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <span className={styles.badge}>Why Choose Us</span>
        <h2 className={styles.title}>
          What Makes <span className={styles.highlight}>Zithtech</span> Different
        </h2>
      </div>

      <div className={styles.timelineWrapper}>
        {/* PROGRESS LINE */}
        <div className={styles.lineContainer}>
          <div
            className={styles.growingLine}
            style={{
              height: activeIdx > 0 ? `${progressHeight}%` : 0,
              opacity: activeIdx > 0 ? 1 : 0,
            }}
          />
        </div>

        {/* CLICKABLE LOGO BUTTON */}
        <button
          className={styles.movingLogo}
          onClick={handleLogoClick}
          style={{ top: `${progressHeight}%` }}
        >
          <div className={styles.logoInner}>
            <Image src={logoImage} alt="Zithtech Logo" className={styles.actualLogo} />
          </div>
          <div className={styles.pulseRing}></div>
        </button>

        <div className={styles.featuresList}>
          {features.map((item, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) itemRefs.current[index] = el;
              }}
              className={`
      ${styles.featureItem}
      ${activeIdx === index ? styles.active : ''}
      ${styles[item.align]}
    `}
            >
              <div className={styles.iconBox}>
                <Icon icon={item.icon} className={styles.featureIcon} />
              </div>
              <h3 className={styles.featureTitle}>{item.title}</h3>
              <p className={styles.featureDesc}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
