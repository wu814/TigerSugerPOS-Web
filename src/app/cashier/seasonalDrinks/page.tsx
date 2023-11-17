import styles from './page.module.css'
import Cart from '../page'

export default function Home() {
  return (
    <>
    <Cart/>
    <div className={styles.main}>
        Seasonal Drinks
    </div>
    </>
  )
}