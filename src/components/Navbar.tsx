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
import GoogleTranslateWrapper from './GoogleTranslateWrapper';

export default function Navbar() {
    const { data: session } = useSession();
    const pathname = usePathname();
    const [isManager, setIsManager] = useState(false);
    const [isCashier, setIsCashier] = useState(false);

    useEffect(() => {
        if (!session) return;
        const checkEmployeeRoles = async () => {
            const res = await fetch(`/api/roles/isEmployeeType?email=${session?.user?.email}`);
            const { is_manager, is_cashier } = await res.json();
            setIsManager(is_manager);
            setIsCashier(is_cashier);
        }

        checkEmployeeRoles();
    }, []);

    const handleSignClick = () => {
        if (session) {
            signOut();
        } else {
            signIn();
        }
    };
    
    return (
        <>
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
                <Button color="inherit" aria-label="Home">
                    <Link href="/">Home</Link>
                </Button>
            </li>
            {isCashier && (
                <li className={`${styles.navItem} ${pathname.startsWith('/cashier') && styles.activeNavItem}`}>
                    <Button color="inherit" aria-label="Cashier">
                        <Link href="/cashier">Cashier</Link>
                    </Button>
                </li>
            )}
            {isManager && (
                <li className={`${styles.navItem} ${pathname.startsWith('/manager') && styles.activeNavItem}`}>
                    <Button color="inherit" aria-label="Cashier">
                        <Link href="/manager">Manager</Link>
                    </Button>
                </li>
            )}
            <li className={`${styles.navItem} ${pathname.startsWith('/customer') && styles.activeNavItem}`}>
                <Button color="inherit" aria-label="Order">
                    <Link href="/customer">Order</Link>
                </Button>
            </li>
            <li className={`${styles.navItem} ${pathname.startsWith('/menuboard') && styles.activeNavItem}`}>
                <Button color="inherit" aria-label="Menu">
                    <Link href="/menuboard">Menu</Link>
                </Button>
            </li>
            <li className={styles.navItem}>
                <Button color="inherit" onClick={handleSignClick} aria-label="Sign In/Out">
                {session ? 'Sign out' : 'Sign in'}
                </Button>
            </li>
            </ul>
        <div className={styles.navWidgets}>
            <AccessibilityWidget />
            <WeatherWidget />
            <dl aria-hidden="true" style={{display: 'none'}}>
                <dt>Current User</dt>
                <dd>{session?.user?.email}</dd>
            </dl>
            <div aria-hidden="true" style={{display: 'none'}}>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28389586.617483452!2d-132.4636568!3d29.70452759999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640c30886ef3055%3A0xee7a2a2813660adf!2sTiger%20Sugar!5e0!3m2!1sen!2sus!4v1701889994037!5m2!1sen!2sus" width="600" height="450" style={{border: '0'}} loading="lazy" title="Google Map"></iframe>
                <div role="tooltip" aria-describedby="tooltip1">I am a tooltip g g</div>
            </div>
            <div style={{display: 'none'}}>
                <button accessKey="a" aria-label="Activate">Button A</button>
                <button accessKey="b" aria-label="Activate">Button B</button>
                <button aria-label="Click me">Button with accessible name</button>
                <a href="#" aria-label="Link with accessible name">Accessible Link</a>
                <menu>
                    <menuitem aria-label="Menu item with accessible name"></menuitem>
                </menu>
                <input type="text" aria-label="Enter your name" />
                <div role="progressbar" id="alb" aria-labelledby="labeldiv"></div>
            </div>
        </div>
        </Toolbar>
        </Container>
    </AppBar>
    </>
    );
}