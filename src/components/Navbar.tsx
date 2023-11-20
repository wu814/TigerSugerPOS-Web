"use client";
import Link from 'next/link';
import React from 'react';
import styles from './Navbar.module.css'; // Import the CSS module
import Image from 'next/image';
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
            <div className={styles.imageContainer}>
                <Image
                    src="/images/tiger-sugar-logo.png"
                    alt="Tiger Sugar Logo"
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: '10vw', height: 'auto' }}
                />
            </div>
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