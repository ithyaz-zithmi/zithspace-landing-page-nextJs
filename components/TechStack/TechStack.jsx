'use client';
import { Icon } from '@iconify/react';
import styles from './TechStack.module.css';

const row1 = [
  { icon: 'logos:java' },
  { icon: 'logos:nodejs-icon' },
  { icon: 'logos:python' },
  { icon: 'logos:vue' },
  { icon: 'logos:php' },
  { icon: 'logos:github-icon' },
  { icon: 'logos:html-5' },
  { icon: 'logos:css-3' },
  { icon: 'logos:javascript' },
];
const row2 = [
  { icon: 'logos:bootstrap' },
  { icon: 'logos:wordpress-icon' },
  { icon: 'logos:c-plusplus' },
  { icon: 'logos:aws' },
  { icon: 'logos:nextjs-icon' },
  { icon: 'logos:typescript-icon' },
  { icon: 'logos:c-sharp' },
  { icon: 'logos:mysql-icon' },
  { icon: 'logos:git-icon' },
];
const row3 = [
  { icon: 'logos:react' },
  { icon: 'logos:laravel' },
  { icon: 'logos:postman-icon' },
  { icon: 'logos:postgresql' },
  { icon: 'logos:redis' },
  { icon: 'logos:google-cloud' },
  { icon: 'logos:azure' },
  { icon: 'logos:mongodb-icon' },
];
const row4 = [
  { icon: 'logos:figma' },
  { icon: 'logos:adobe-photoshop' },
  { icon: 'logos:adobe-illustrator' },
  { icon: 'logos:adobe-after-effects' },
  { icon: 'logos:adobe-premiere' },
  { icon: 'logos:flutter' },
  { icon: 'logos:dart' },
  { icon: 'logos:firebase' },
  { icon: 'logos:kotlin-icon' },
];

const MarqueeRow = ({ techs, reverse = false }) => (
  <div className={`${styles.marquee} ${reverse ? styles.reverse : ''}`}>
    <div className={styles.marqueeContent}>
      {[...techs, ...techs].map((tech, index) => (
        <div key={index} className={styles.techItem}>
          <Icon icon={tech.icon} className={styles.icon} />
        </div>
      ))}
    </div>
  </div>
);

const TechStack = () => {
  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <span className={styles.badge}>Technologies</span>
        <h2 className={styles.title}>
          Powered by Modern <span className={styles.highlight}>Tech Stack</span>
        </h2>
      </div>

      <div className={styles.rowsWrapper}>
        <MarqueeRow techs={row1} />
        <MarqueeRow techs={row2} reverse={true} />
        <MarqueeRow techs={row3} />
        <MarqueeRow techs={row4} reverse={true} />
      </div>
    </section>
  );
};

export default TechStack;
