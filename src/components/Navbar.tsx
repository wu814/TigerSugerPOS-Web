import Link from 'next/link';
import React from 'react';
import styles from './Navbar.module.css'; // Import the CSS module

const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
        <ul>
        <li><p>Obviously we won't have a nav bar for types of personas lol, when they log in to OAuth, we will check what type they are. This is for example</p></li>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/cashier">Cashier</Link></li>
        <li><Link href="/manager">Manager</Link></li>
        <li><Link href="/customer">Customer</Link></li>
        </ul>
    </nav>
  );
};

export default Navbar;