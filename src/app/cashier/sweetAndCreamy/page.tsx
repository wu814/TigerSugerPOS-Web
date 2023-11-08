import styles from './page.module.css'
import Navbar from '../../../components/Navbar'

export default function Home() {
  return (
    <>
    <Navbar/>
    <div className={styles.main}>
        Sweet and Creamy
    </div>
    </>
  )
}