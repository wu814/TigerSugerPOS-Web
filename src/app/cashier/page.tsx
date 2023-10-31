import styles from './page.module.css'
import Navbar from '../../components/Navbar'

export default function Home() {
  return (
    <div className={styles.container}>
        <Navbar/>
        <div className={styles.pContainer}>
          <p className={styles.pItem}>Fruity and Refreshing</p>
          <p className={styles.pItem}>Sweet and Creamy</p>
          <p className={styles.pItem}>Coffee Flavored</p>
          <p className={styles.pItem}>Seasonal Drinks</p>
        </div>
    </div>
  )
}
