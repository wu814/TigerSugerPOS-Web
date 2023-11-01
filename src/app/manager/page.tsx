import styles from './page.module.css'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Link from 'next/link'

export default function Home() {
  return (
    <>
        <Navbar/>
        <div className={styles.main}>
            <h1 className={styles.mainHeading}>Manager View</h1>

            <div className={styles.horizontalContainer}>
                <div className={`${styles.verticalContainer} ${styles.buttonContainer}`}>
                    <Link role="link" className={styles.button} href="/manager/menu">
                        Edit Menu
                    </Link>
                    <Link role="link" className={styles.button} href="/manager/inventory">
                        View Inventory
                    </Link>
                </div>

                <div className={`${styles.verticalContainer} ${styles.buttonContainer}`}>
                    <Link role="link" className={styles.button} href="/manager/salesreport">
                        Sales Report
                    </Link>
                    <Link role="link" className={styles.button} href="/manager/restockreport">
                        Restock Report
                    </Link>
                    <Link role="link" className={styles.button} href="/manager/popularpairs">
                        Popular Pairs
                    </Link>
                    <Link role="link" className={styles.button} href="/manager/usagechart">
                        Usage Chart
                    </Link>
                </div>
            </div>
        </div>
        <Footer/>
    </>
  )
}
