import Link from 'next/link';
import React from 'react';
import styles from './Navbar.module.css'; // Import the CSS module
import Image from 'next/image';

const Navbar: React.FC = () => {
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
              </ul>
          </nav>
          </>
  );
};

export default Navbar;