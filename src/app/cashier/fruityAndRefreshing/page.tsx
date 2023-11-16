import styles from './page.module.css'
import Cart from '../page'

export default function Home() {
  return (
    <>
    <Cart/>
    <div className={styles.main}>
        Fruity And Refreshing
    </div>
    </>
  )
}