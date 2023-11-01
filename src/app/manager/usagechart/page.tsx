import styles from './page.module.css'
import Navbar from '../../../components/Navbar'
import Link from 'next/link'

export default function Home() {
  return (
    <>
        <Navbar/>
        <div className={styles.main}>
            <h1 className={styles.mainHeading}>Manager View (Usage Chart)</h1>
        </div>

    </>
  )
}
