'use client';
import { useState, useRef } from 'react';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { useScroll, useMotionValueEvent } from 'framer-motion';
import styles from './WhyChooseUs.module.css';
import logoImage from '@/assets/logo.svg';

const WhyChooseUs = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const outerRef = useRef(null);

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

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const step = Math.min(Math.floor(v * features.length), features.length - 1);
    setActiveIdx(step);
  });

  const handleLogoClick = () => {
    if (!outerRef.current) return;
    if (activeIdx >= features.length - 1) return;
    const next = activeIdx + 1;
    const outerTop = outerRef.current.offsetTop;
    const scrollableHeight = outerRef.current.offsetHeight - window.innerHeight;
    // Scroll to the middle of the next segment so it reliably triggers the step
    const targetScroll = outerTop + ((next + 0.5) / features.length) * scrollableHeight;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  // Map progress to 10%..90% range to match the lineContainer's top/bottom 10%
  const progressPct = (activeIdx / (features.length - 1)) * 100;
  const logoTop = 10 + (progressPct / 100) * 80; // 10% to 90%

  return (
    <div ref={outerRef} className={styles.stickyOuter}>
      <section className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>Why Choose Us</span>
          <h2 className={styles.title}>
            What Makes <span className={styles.highlight}>Zithtech</span> Different
          </h2>
        </div>

        <div className={styles.timelineWrapper}>
          <div className={styles.lineContainer}>
            <div className={styles.growingLine} style={{ height: `${progressPct}%`, opacity: 1 }} />
          </div>

          <button
            className={styles.movingLogo}
            onClick={handleLogoClick}
            style={{ top: `${logoTop}%` }}
          >
            <div className={styles.logoInner}>
              <Image src={logoImage} alt="Zithtech Logo" className={styles.actualLogo} />
            </div>
            <div className={styles.pulseRing}></div>
          </button>

          <div className={styles.featuresList}>
            {features.slice(0, -1).map((item, index) => (
              <div
                key={index}
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

        {/* Zithtech Assure — below the timeline */}
        <div
          className={`${styles.bottomFeature} ${activeIdx === features.length - 1 ? styles.active : ''}`}
        >
          <div className={styles.iconBox}>
            <Icon icon={features[features.length - 1].icon} className={styles.featureIcon} />
          </div>
          <h3 className={styles.featureTitle}>{features[features.length - 1].title}</h3>
          <p className={styles.featureDesc}>{features[features.length - 1].desc}</p>
        </div>
      </section>
    </div>
  );
};

export default WhyChooseUs;
