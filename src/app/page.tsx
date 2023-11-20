"use client"
import styles from './page.module.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Image from 'next/image'
import { useSession } from 'next-auth/react';


export default function Home() {

    const { data: session } = useSession();

    return (
        <>
            <Navbar/>
            {session && <h1 className={styles.user}>Welcome, {session?.user?.name}!</h1>}
            <div className={styles.main}>
                Welcome to Tiger Sugar! Click on one of the links above to get started.
            </div>
            <Footer/>
        </>
    )
}
