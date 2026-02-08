'use client';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import styles from './ContactForm.module.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    phoneNumber: '',
    companyEmail: '',
    industry: '',
    subject: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^[0-9+\-\s()]{10,15}$/.test(formData.phoneNumber.replace(/\s/g, ''))) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }

    if (!formData.companyEmail.trim()) {
      newErrors.companyEmail = 'Company email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.companyEmail)) {
      newErrors.companyEmail = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to send message');
      }

      setSubmitSuccess(true);

      setFormData({
        companyName: '',
        phoneNumber: '',
        companyEmail: '',
        industry: '',
        subject: '',
      });

      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      setErrors({ submit: error.message || 'Failed to send message. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="contact" className={styles.floatingContainer}>
      <h2 className={styles.badge}>Get in Touch</h2>

      <div className={styles.contactCard}>
        {/* Left Section: Info */}
        <div className={styles.infoSection}>
          <h1 className={styles.mainTitle}>
            Let&apos;s Talk with <span className={styles.blueText}>Zithtech</span>
          </h1>
          <p className={styles.subText}>
            Start a conversation with Zithtech and explore how we can turn your ideas into scalable
            digital solutions.
          </p>

          <div className={styles.contactDetails}>
            <div className={styles.detailLink}>
              <Icon icon="mdi:email-outline" className={styles.icon} />
              <span>hello@zithtech.com</span>
            </div>
            <div className={styles.detailLink}>
              <Icon icon="mdi:phone-outline" className={styles.icon} />
              <span>80722 55742</span>
            </div>
          </div>

          <div className={styles.joinUsSection}>
            <h3 className={styles.joinTitle}>Join Us</h3>
            <div className={styles.socialRow}>
              <span>
                <Icon icon="mdi:linkedin" color="#0077B5" /> LinkedIn
              </span>
              <span>
                <Icon icon="mdi:instagram" color="#E4405F" /> Instagram
              </span>
            </div>
          </div>
        </div>

        {/* Right Section: Form */}
        <div className={styles.formSection}>
          {submitSuccess && (
            <div className={styles.successMessage}>
              Thank you! Your message has been sent successfully.
            </div>
          )}
          {errors.submit && (
            <div className={styles.errorMessage}>
              {errors.submit}
            </div>
          )}
          <form className={styles.gridForm} onSubmit={handleSubmit}>
            <div className={styles.inputBox}>
              <label>
                Company name <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Enter your Company name"
                className={errors.companyName ? styles.inputError : ''}
              />
              {errors.companyName && <span className={styles.errorText}>{errors.companyName}</span>}
            </div>
            <div className={styles.inputBox}>
              <label>
                Phone number <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Enter your Phone number"
                className={errors.phoneNumber ? styles.inputError : ''}
              />
              {errors.phoneNumber && <span className={styles.errorText}>{errors.phoneNumber}</span>}
            </div>
            <div className={styles.inputBox}>
              <label>
                Company Email <span className={styles.required}>*</span>
              </label>
              <input
                type="email"
                name="companyEmail"
                value={formData.companyEmail}
                onChange={handleChange}
                placeholder="Enter your Company Email"
                className={errors.companyEmail ? styles.inputError : ''}
              />
              {errors.companyEmail && (
                <span className={styles.errorText}>{errors.companyEmail}</span>
              )}
            </div>
            <div className={styles.inputBox}>
              <label>Industry</label>
              <input
                type="text"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                placeholder="Enter your Industry"
              />
            </div>
            <div className={`${styles.inputBox} ${styles.fullWidth}`}>
              <label>Subject</label>
              <textarea
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Enter Subject"
                rows="3"
              ></textarea>
            </div>
            <div className={styles.btnWrapper}>
              <button type="submit" className={styles.sendBtn} disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
