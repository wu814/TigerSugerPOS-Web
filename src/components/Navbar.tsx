"use client";
import Link from 'next/link';
import React from 'react';
import WeatherWidget from './WeatherWidget'; // Import the WeatherWidget component
import styles from './Navbar.module.css'; // Import the CSS module
import Image from 'next/image';
import GoogleTranslateWrapper from './GoogleTranslateWrapper';
import { useSession } from 'next-auth/react';

function AuthButton() {
  const { data: session } = useSession();
  if (session) {
    return <Link href="/api/auth/signout">Sign out</Link>;
  }
  return <Link href="/api/auth/signin">Sign in</Link>;

}

export default function Navbar() {
  return (
    <>
        <nav className={styles.navbar}>
        {/* Container for the top-left widget (WeatherWidget) */}
        <div className={styles.topLeftWidget}>
          {/* Display the WeatherWidget component in the top-left */}
          <WeatherWidget />
        </div>

        {/* Container for the logo */}
        <div className={styles.imageContainer}>
          {/* Display the logo */}
          <Image
            src="/images/tiger-sugar-logo.png"
            alt="Tiger Sugar Logo"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '10vw', height: 'auto' }}
          />
        </div>
        <GoogleTranslateWrapper />
              <ul className={styles.navList}>
                  <li className={styles.navItem}><Link href="/">Home</Link></li>
                  <li className={styles.navItem}><Link href="/cashier">Cashier</Link></li>
                  <li className={styles.navItem}><Link href="/manager">Manager</Link></li>
                  <li className={styles.navItem}><Link href="/customer">Customer</Link></li>
                  <li className={styles.navItem}><Link href="/menuboard">Menu Board</Link></li>
                  <li className={styles.navItem}><AuthButton/></li>
              </ul>
          </nav>
          </>
  );
};