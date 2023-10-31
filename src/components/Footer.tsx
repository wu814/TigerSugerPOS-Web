import React from 'react';
import styles from './Footer.module.css';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <div className={styles.footerLogo}>
            <Image
              src="/images/tiger-sugar-logo.png"
              alt="Tiger Sugar Logo"
              width={400}
              height={200}
              className={styles.image}
            />
          </div>
          <div className={styles.footerLinks}>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/menu">Menu</a></li>
              <li><a href="/locations">Locations</a></li>
              <li><a href="/contact">Contact Us</a></li>
            </ul>
          </div>
          <div className={styles.footerSocial}>
            <ul>
              <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
              <li><a href="#"><i className="fab fa-instagram"></i></a></li>
              <li><a href="#"><i className="fab fa-twitter"></i></a></li>
            </ul>
          </div>
        </div>
        <div className={styles.footerText}>
          &copy; {new Date().getFullYear()} Tiger Sugar. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
