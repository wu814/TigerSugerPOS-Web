import styles from './page.module.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Image from 'next/image'


export default function Home() {

    return (
        <>
            <Navbar/>
            <div className={styles.main}>
                Welcome to Tiger Sugar! Click on one of the links above to get started.
            </div>
            <Footer/>
        </>
    )
}
