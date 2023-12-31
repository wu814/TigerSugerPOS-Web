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
            
            
            <div className={styles.main}>
                <div className = {styles.content}>
                {session ? (
                    <h1 className={styles.user}>Welcome, {session?.user?.name}!</h1>
                ) : ( 
                    <h1 className={styles.user}>Welcome to Tiger Sugar!</h1>
                )}
                <h2>Click on one of the links above to get started.</h2>
                <br></br>
                </div>
            </div>
        </>
    )
}
