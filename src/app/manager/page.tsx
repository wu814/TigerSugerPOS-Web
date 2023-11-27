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
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={styles.svgContainer}
                            fill="currentColor"
                            overflow="hidden"
                            viewBox="0 0 47.94 47.94"
                            xmlSpace="preserve"
                            >
                            <path
                                d="M26.285 2.486l5.407 10.956a2.58 2.58 0 001.944 1.412l12.091 1.757c2.118.308 2.963 2.91 1.431 4.403l-8.749 8.528a2.582 2.582 0 00-.742 2.285l2.065 12.042c.362 2.109-1.852 3.717-3.746 2.722l-10.814-5.685a2.585 2.585 0 00-2.403 0l-10.814 5.685c-1.894.996-4.108-.613-3.746-2.722l2.065-12.042a2.582 2.582 0 00-.742-2.285L.783 21.014c-1.532-1.494-.687-4.096 1.431-4.403l12.091-1.757a2.58 2.58 0 001.944-1.412l5.407-10.956c.946-1.919 3.682-1.919 4.629 0z"
                            ></path>
                        </svg>
                    </Link>
                    <Link role="link" className={styles.button} href="/manager/inventory">
                        Edit Inventory
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={styles.svgContainer}
                            fill="currentColor"
                            overflow="hidden"
                            viewBox="0 0 1024 1024"
                            >
                            <path d="M684.963 915.58c-101.894 0-184.495-82.602-184.495-184.494 0-101.894 82.6-184.495 184.495-184.495 101.893 0 184.493 82.601 184.493 184.495 0 101.892-82.6 184.494-184.493 184.494zm104.308-280.238l-138.612 138.61-81.535-81.536-32.614 32.614L650.66 839.18l171.226-171.224-32.614-32.614zm-252.058-65.688H246.792v46.123h252.137c-13.04 20.994-22.747 44.25-28.094 69.184H246.792v46.125h219.086c0 42.367 12.227 81.785 33.05 115.308h-298.26c-25.474 0-46.124-20.65-46.124-46.124V154.543c0-25.473 20.65-46.123 46.123-46.123h472.767L777.21 212.198v320.376c-28.067-13.068-59.245-20.575-92.246-20.575-57.016 0-108.774 21.962-147.75 57.655zm-290.421-69.187h438.172v-46.122H246.792v46.122zm0-115.307h438.172v-46.124H246.792v46.124zm345.923-161.433H246.792v46.124h345.924v-46.124zm57.655-92.246v103.777h103.778L650.37 131.481z"></path>
                        </svg>
                    </Link>
                </div>

                <div className={`${styles.verticalContainer} ${styles.buttonContainer}`}>
                    <Link role="link" className={styles.button} href="/manager/salesreport">
                        Sales Report
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={styles.svgContainer}
                            fill="currentColor"
                            overflow="hidden"
                            viewBox="0 0 1024 1024"
                            >
                            <path d="M128.256 624.192a32 32 0 00-32 32v192a32 32 0 0064 0v-192a32 32 0 00-32-32zm256-224.064a32 32 0 00-32 32v416a32 32 0 0064 0v-416a32 32 0 00-32-32zm256 224.064a32 32 0 00-32 32v192a32 32 0 0064 0v-192a32 32 0 00-32-32zm256-224.064a32 32 0 00-32 32v416a32 32 0 0064 0v-416a32 32 0 00-32-32z"></path>
                            <path d="M907.392 146.432a32.768 32.768 0 00-15.872-2.24H768.256a32 32 0 000 64h47.616L639.744 384.256 408.896 153.408a33.472 33.472 0 00-25.088-9.536 33.024 33.024 0 00-24.704 9.472l-253.696 253.76a33.152 33.152 0 0046.784 46.848l231.232-231.296 231.168 231.168c6.848 6.848 16 9.92 25.088 9.472a32.96 32.96 0 0025.088-9.472L864.192 254.4v49.728a32 32 0 0064 0v-128a31.68 31.68 0 00-20.8-29.696z"></path>
                        </svg>
                    </Link>
                    <Link role="link" className={styles.button} href="/manager/restockreport">
                        Restock Report
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={styles.svgContainer}
                            fill="currentColor"
                            overflow="hidden"
                            viewBox="0 0 1024 1024"
                            >
                            <path d="M128.256 624.192a32 32 0 00-32 32v192a32 32 0 0064 0v-192a32 32 0 00-32-32zm256-224.064a32 32 0 00-32 32v416a32 32 0 0064 0v-416a32 32 0 00-32-32zm256 224.064a32 32 0 00-32 32v192a32 32 0 0064 0v-192a32 32 0 00-32-32zm256-224.064a32 32 0 00-32 32v416a32 32 0 0064 0v-416a32 32 0 00-32-32z"></path>
                            <path d="M907.392 146.432a32.768 32.768 0 00-15.872-2.24H768.256a32 32 0 000 64h47.616L639.744 384.256 408.896 153.408a33.472 33.472 0 00-25.088-9.536 33.024 33.024 0 00-24.704 9.472l-253.696 253.76a33.152 33.152 0 0046.784 46.848l231.232-231.296 231.168 231.168c6.848 6.848 16 9.92 25.088 9.472a32.96 32.96 0 0025.088-9.472L864.192 254.4v49.728a32 32 0 0064 0v-128a31.68 31.68 0 00-20.8-29.696z"></path>
                        </svg>
                    </Link>
                    <Link role="link" className={styles.button} href="/manager/excessreport">
                        Excess Report
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={styles.svgContainer}
                            fill="currentColor"
                            overflow="hidden"
                            viewBox="0 0 1024 1024"
                            >
                            <path d="M128.256 624.192a32 32 0 00-32 32v192a32 32 0 0064 0v-192a32 32 0 00-32-32zm256-224.064a32 32 0 00-32 32v416a32 32 0 0064 0v-416a32 32 0 00-32-32zm256 224.064a32 32 0 00-32 32v192a32 32 0 0064 0v-192a32 32 0 00-32-32zm256-224.064a32 32 0 00-32 32v416a32 32 0 0064 0v-416a32 32 0 00-32-32z"></path>
                            <path d="M907.392 146.432a32.768 32.768 0 00-15.872-2.24H768.256a32 32 0 000 64h47.616L639.744 384.256 408.896 153.408a33.472 33.472 0 00-25.088-9.536 33.024 33.024 0 00-24.704 9.472l-253.696 253.76a33.152 33.152 0 0046.784 46.848l231.232-231.296 231.168 231.168c6.848 6.848 16 9.92 25.088 9.472a32.96 32.96 0 0025.088-9.472L864.192 254.4v49.728a32 32 0 0064 0v-128a31.68 31.68 0 00-20.8-29.696z"></path>
                        </svg>
                    </Link>
                    <Link role="link" className={styles.button} href="/manager/popularpairs">
                        Popular Pairs
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={styles.svgContainer}
                            fill="currentColor"
                            overflow="hidden"
                            viewBox="0 0 1024 1024"
                            >
                            <path d="M128.256 624.192a32 32 0 00-32 32v192a32 32 0 0064 0v-192a32 32 0 00-32-32zm256-224.064a32 32 0 00-32 32v416a32 32 0 0064 0v-416a32 32 0 00-32-32zm256 224.064a32 32 0 00-32 32v192a32 32 0 0064 0v-192a32 32 0 00-32-32zm256-224.064a32 32 0 00-32 32v416a32 32 0 0064 0v-416a32 32 0 00-32-32z"></path>
                            <path d="M907.392 146.432a32.768 32.768 0 00-15.872-2.24H768.256a32 32 0 000 64h47.616L639.744 384.256 408.896 153.408a33.472 33.472 0 00-25.088-9.536 33.024 33.024 0 00-24.704 9.472l-253.696 253.76a33.152 33.152 0 0046.784 46.848l231.232-231.296 231.168 231.168c6.848 6.848 16 9.92 25.088 9.472a32.96 32.96 0 0025.088-9.472L864.192 254.4v49.728a32 32 0 0064 0v-128a31.68 31.68 0 00-20.8-29.696z"></path>
                        </svg>
                    </Link>
                    <Link role="link" className={styles.button} href="/manager/usagechart">
                        Usage Chart
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={styles.svgContainer}
                            fill="currentColor"
                            overflow="hidden"
                            viewBox="0 0 1024 1024"
                            >
                            <path d="M128.256 624.192a32 32 0 00-32 32v192a32 32 0 0064 0v-192a32 32 0 00-32-32zm256-224.064a32 32 0 00-32 32v416a32 32 0 0064 0v-416a32 32 0 00-32-32zm256 224.064a32 32 0 00-32 32v192a32 32 0 0064 0v-192a32 32 0 00-32-32zm256-224.064a32 32 0 00-32 32v416a32 32 0 0064 0v-416a32 32 0 00-32-32z"></path>
                            <path d="M907.392 146.432a32.768 32.768 0 00-15.872-2.24H768.256a32 32 0 000 64h47.616L639.744 384.256 408.896 153.408a33.472 33.472 0 00-25.088-9.536 33.024 33.024 0 00-24.704 9.472l-253.696 253.76a33.152 33.152 0 0046.784 46.848l231.232-231.296 231.168 231.168c6.848 6.848 16 9.92 25.088 9.472a32.96 32.96 0 0025.088-9.472L864.192 254.4v49.728a32 32 0 0064 0v-128a31.68 31.68 0 00-20.8-29.696z"></path>
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
        <Footer/>
    </>
  )
}
