import styles from './page.module.css'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export default function Home() {
  return (
    <>
        <Navbar/>
        <div className={styles.main}>
            Customer page
        </div>
        <Footer/>
    </>
  )
}
