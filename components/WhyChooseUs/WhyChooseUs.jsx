


'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import styles from './WhyChooseUs.module.css';
import logoImage from '@/assets/logo.svg';

const WhyChooseUs = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const itemRefs = useRef([]);
  // Ref to track if we are currently scrolling via a click
  const isManualScrolling = useRef(false);

  const features = [
    { title: 'Product-Driven Mindset', desc: 'We think like product owners, not just developers.', icon: 'solar:shop-2-bold', align: 'left' },
    { title: 'Scalable Architecture', desc: 'Built to grow with your business needs.', icon: 'solar:chat-round-call-bold', align: 'right' },
    { title: 'Clean UI/UX', desc: 'Beautiful interfaces that users love.', icon: 'solar:paint-roller-bold', align: 'left' },
    { title: 'Secure & Reliable', desc: 'Enterprise-grade security for your data.', icon: 'solar:shield-check-bold', align: 'right' },
    { title: 'Long-Term Support', desc: 'Partnership that extends beyond launch.', icon: 'solar:chat-round-call-bold', align: 'left' },
    { title: 'Zithtech Assure', desc: 'Our gold standard guarantee.', icon: 'solar:star-bold', align: 'center' },
  ];

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -30% 0px', // Tightened margin for better center detection
      threshold: 0.5,
    };

    const observerCallback = (entries) => {
      // If we are currently moving via handleLogoClick, ignore observer updates
      if (isManualScrolling.current) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = itemRefs.current.indexOf(entry.target);
          if (index !== -1) {
            setActiveIdx(index);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const handleLogoClick = () => {
    const next = (activeIdx + 1) % features.length;
    
    // 1. Lock the observer so it doesn't fight the manual scroll
    isManualScrolling.current = true;
    
    // 2. Update state immediately for the logo/line UI
    setActiveIdx(next);

    // 3. Scroll to the next item
    // We use a tiny timeout to ensure the DOM has updated classes (like .active) 
    // before the browser calculates the "center" position.
    setTimeout(() => {
      itemRefs.current[next]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }, 10);

    // 4. Unlock the observer after the smooth scroll finishes (approx 800ms)
    setTimeout(() => {
      isManualScrolling.current = false;
    }, 1000); 
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
        <div className={styles.lineContainer}>
          <div
            className={styles.growingLine}
            style={{ height: `${progressHeight}%`, opacity: 1 }}
          />
        </div>

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
              ref={(el) => (itemRefs.current[index] = el)}
              className={`${styles.featureItem} ${activeIdx === index ? styles.active : ''} ${styles[item.align]}`}
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
