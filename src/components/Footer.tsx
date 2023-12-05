import React from 'react';
import styles from './Footer.module.css';
import Image from 'next/image';

const Footer = () => {
    return (
        <footer className={styles.footer}>
        <div className={styles.container}>
                <Image src="/images/tiger-sugar-logo-small.png" alt="Tiger Sugar Logo" width={100} height={100} />
            <div className={styles.footerContent}>
            <div className={styles.footerLinks}>
                <ul className={styles.footerList}>
                <li><a href="/">Home</a></li>
                <li><a href="/menu">Menu</a></li>
                <li><a href="/locations">Locations</a></li>
                <li><a href="/contact">Contact Us</a></li>
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
