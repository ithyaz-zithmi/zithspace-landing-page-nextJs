import React from 'react';
import styles from './process.module.css';
import {
  FormOutlined,
  CodeSandboxOutlined,
  DiscordOutlined,
  AndroidOutlined,
  HeatMapOutlined,
  PlayCircleOutlined,
} from '@ant-design/icons';

const Process = () => {
  const steps = [
    {
      id: '01',
      title: 'Requirement Analysis',
      desc: 'Deep dive into your business needs and project goals.',
      icon: <FormOutlined style={{ color: '#ffffff' }} />,
    },
    {
      id: '02',
      title: 'UI/UX Design',
      desc: 'Crafting intuitive interfaces and user experiences.',
      icon: <CodeSandboxOutlined style={{ color: '#ffffff' }} />,
    },
    {
      id: '03',
      title: 'Agile Development',
      desc: 'Iterative development with regular updates.',
      icon: <DiscordOutlined style={{ color: '#ffffff' }} />,
    },
    {
      id: '04',
      title: 'Testing & QA',
      desc: 'Rigorous testing to ensure quality.',
      icon: <HeatMapOutlined style={{ color: '#ffffff' }} />,
    },
    {
      id: '05',
      title: 'Deployment',
      desc: 'Smooth launch with zero downtime.',
      icon: <PlayCircleOutlined style={{ color: '#ffffff' }} />,
    },
    {
      id: '06',
      title: '24/7 Support',
      desc: 'Ongoing maintenance and feature updates.',
      icon: <AndroidOutlined style={{ color: '#ffffff' }} />,
    },
  ];

  return (
    <section id="process" className={styles.container}>
      {/* LEFT CONTENT */}
      <div className={styles.header}>
        <div className={styles.badgeWrapper}>
          <span className={styles.badge}>Our Process</span>
        </div>
        <h2 className={styles.title}>
          How We <span className={styles.highlight}>Deliver Excellence</span>
        </h2>
        <p className={styles.description}>
          A transparent, proven process focused on quality, speed, and measurable results, combining
          strategic planning, user-centered design, and agile development to deliver reliable,
          high-value solutions.
        </p>
        <button
          className={styles.contactBtn}
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Get in Touch
        </button>
      </div>

      {/* RIGHT GRID - Increased width area */}
      <div className={styles.grid}>
        {steps.map((step) => (
          <div key={step.id} className={styles.card}>
            <div className={styles.iconWrapper}>{step.icon}</div>
            <h3 className={styles.cardTitle}>{step.title}</h3>
            <p className={styles.cardDesc}>{step.desc}</p>
            <span className={styles.bgNumber}>{step.id}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Process;
