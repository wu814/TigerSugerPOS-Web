"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import WeatherWidget from './WeatherWidget'; // Import the WeatherWidget component
import AccessibilityWidget from './AccessibilityWidget';
import styles from './Navbar.module.css'; // Import the CSS module
import Image from 'next/image';
import { signIn, signOut, useSession } from 'next-auth/react';
import { AppBar, Toolbar, Button, Container } from '@mui/material';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const { data: session } = useSession();
    const pathname = usePathname();
    const [isManager, setIsManager] = useState(false);
    const [isCashier, setIsCashier] = useState(false);

    useEffect(() => {
        const checkEmployeeRoles = async () => {
            const res = await fetch(`/api/roles/isEmployeeType?email=${session?.user?.email}`);
            const { is_manager, is_cashier } = await res.json();
            setIsManager(is_manager);
            setIsCashier(is_cashier);
        }

        checkEmployeeRoles();
    }, [session]);
  
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
                width={200} // Set the width and height as per your requirement
                height={100}
              />
            </div>
  
            <ul className={styles.navList}>
              <li className={`${styles.navItem} ${pathname === ('/') && styles.activeNavItem}`}>
                <Button color="inherit">
                    <Link href="/">Home</Link>
                </Button>
              </li>
              {isCashier && (
                <li className={`${styles.navItem} ${pathname.startsWith('/cashier') && styles.activeNavItem}`}>
                    <Button color="inherit">
                        <Link href="/cashier">Cashier</Link>
                    </Button>
                </li>
              )}
              {isManager && (
                <li className={`${styles.navItem} ${pathname.startsWith('/manager') && styles.activeNavItem}`}>
                    <Button color="inherit">
                        <Link href="/manager">Manager</Link>
                    </Button>
                </li>
              )}
              <li className={`${styles.navItem} ${pathname.startsWith('/customer') && styles.activeNavItem}`}>
                <Button color="inherit">
                    <Link href="/customer">Order</Link>
                </Button>
              </li>
              <li className={`${styles.navItem} ${pathname.startsWith('/menuboard') && styles.activeNavItem}`}>
                <Button color="inherit">
                    <Link href="/menuboard">Menu</Link>
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