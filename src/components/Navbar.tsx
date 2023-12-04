"use client";
import Link from 'next/link';
import React from 'react';
import WeatherWidget from './WeatherWidget'; // Import the WeatherWidget component
import AccessibilityWidget from './AccessibilityWidget';
import styles from './Navbar.module.css'; // Import the CSS module
import Image from 'next/image';
import { signIn, signOut, useSession } from 'next-auth/react';
import { AppBar, Toolbar, Button, Container } from '@mui/material';
import { usePathname } from 'next/navigation';


function AuthButton() {
  const { data: session } = useSession();
  if (session) {
    return <Link href="/api/auth/signout">Sign out</Link>;
  }
  return <Link href="/api/auth/signin">Sign in</Link>;

}

export default function Navbar() {
    const { data: session } = useSession();
    const pathname = usePathname()
  
    const handleSignClick = () => {
      if (session) {
        signOut();
      } else {
        signIn();
      }
    };
  
    return (
      <>
      <div className={styles.navWidgets}>
        <AccessibilityWidget />
        <WeatherWidget />
      </div>
      <AppBar position="static" className={styles.navbar}>
        <Container>
          <Toolbar>
            <div className={styles.imageContainer}>
              <Image
                src="/images/tiger-sugar-logo.png"
                alt="Tiger Sugar Logo"
                width={100} // Set the width and height as per your requirement
                height={50}
              />
            </div>
  
            <ul className={styles.navList}>
              <li className={`${styles.navItem} ${pathname === ('/') && styles.activeNavItem}`}>
                <Button color="inherit">
                    <Link href="/">Home</Link>
                </Button>
              </li>   
              <li className={`${styles.navItem} ${pathname.startsWith('/cashier') && styles.activeNavItem}`}>
                <Button color="inherit">
                    <Link href="/cashier">Cashier</Link>
                </Button>
              </li>
              <li className={`${styles.navItem} ${pathname.startsWith('/manager') && styles.activeNavItem}`}>
                <Button color="inherit">
                    <Link href="/manager">Manager</Link>
                </Button>
              </li>
              <li className={`${styles.navItem} ${pathname.startsWith('/customer') && styles.activeNavItem}`}>
                <Button color="inherit">
                    <Link href="/customer">Customer</Link>
                </Button>
              </li>
              <li className={`${styles.navItem} ${pathname.startsWith('/menuboard') && styles.activeNavItem}`}>
                <Button color="inherit">
                    <Link href="/menuboard">Menu Board</Link>
                </Button>
              </li>
              <li className={styles.navItem}>
                <Button color="inherit" onClick={handleSignClick}>
                  {session ? 'Sign out' : 'Sign in'}
                </Button>
              </li>
            </ul>
          </Toolbar>
        </Container>
      </AppBar>
      </>
    );
}