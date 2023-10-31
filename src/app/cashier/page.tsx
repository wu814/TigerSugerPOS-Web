import Link from 'next/link';
import styles from './page.module.css'
import Navbar from '../../components/Navbar'

export default function Home() {
  return (
    <div className={styles.container}>
        <Navbar/>
        <div className={styles.pContainer}>
          <p className={styles.pItem}><Link href="/cashier/fruityAndRefreshing">Fruity and Refreshing</Link></p>
          <p className={styles.pItem}><Link href="/cashier/sweetAndCreamy">Sweet and Creamy</Link></p>
          <p className={styles.pItem}><Link href="/cashier/coffeeFlavored">Coffee Flavored</Link></p>
          <p className={styles.pItem}><Link href="/cashier/seasonalDrinks">Seasonal Drinks</Link></p>
        </div>
    </div>
  )
}