"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function Home() {
  const [isDropdownOpen1, setDropdownOpen1] = useState(false);
  const [isDropdownOpen2, setDropdownOpen2] = useState(false);
  const [isDropdownOpen3, setDropdownOpen3] = useState(false);
  const [isDropdownOpen4, setDropdownOpen4] = useState(false);

  const toggleDropdown1 = () => {
    setDropdownOpen1(!isDropdownOpen1);
  };

  const toggleDropdown2 = () => {
    setDropdownOpen2(!isDropdownOpen2);
  };

  const toggleDropdown3 = () => {
    setDropdownOpen3(!isDropdownOpen3);
  };

  const toggleDropdown4 = () => {
    setDropdownOpen4(!isDropdownOpen4);
  };

  return (
    <>
    <div className={styles.container}>
        <Navbar/>
        <div className={styles.pContainer}>
          <p className={styles.pItem}><Link href="/cashier/fruityAndRefreshing">Fruity and Refreshing</Link></p>
          <p className={styles.pItem}><Link href="/cashier/sweetAndCreamy">Sweet and Creamy</Link></p>
          <p className={styles.pItem}><Link href="/cashier/coffeeFlavored">Coffee Flavored</Link></p>
          <p className={styles.pItem}><Link href="/cashier/seasonalDrinks">Seasonal Drinks</Link></p>
        </div>
    </div>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.gridContainer}>
          <div className={styles.imageContainer}>
            {/* Image 1 */}
            <Image
              src="/images/brownsugarimgj.jpg"
              alt="Boba Drink 1"
              width={500}
              height={500}
              className={styles.image}
            />
            <div className={`${styles.bobaButton} ${isDropdownOpen1 ? styles.open : ''}`}>
              <div className={styles.buttonContent}>
                <p>Boba Drink Information 1</p>
                <button className={styles.dropdownButton} onClick={toggleDropdown1}>
                  {isDropdownOpen1 ? 'Less' : 'More'}
                </button>
              </div>
              <div className={`${styles.dropdownContent} ${isDropdownOpen1 ? styles.open : ''}`}>
                {/* Add your boba drink information here for Image 1 */}
                <p>Drink Name: Bubble Tea</p>
                <p>Ingredients: Tapioca pearls, tea, milk, sugar</p>
                <p>Flavors: Various fruit flavors</p>
              </div>
            </div>
          </div>
          <div className={styles.imageContainer}>
            {/* Image 2 */}
            <Image
              src="/images/brownsugarimgj.jpg"
              alt="Boba Drink 2"
              width={500}
              height={500}
              className={styles.image}
            />
            <div className={`${styles.bobaButton} ${isDropdownOpen2 ? styles.open : ''}`}>
              <div className={styles.buttonContent}>
                <p>Boba Drink Information 2</p>
                <button className={styles.dropdownButton} onClick={toggleDropdown2}>
                  {isDropdownOpen2 ? 'Less' : 'More'}
                </button>
              </div>
              <div className={`${styles.dropdownContent} ${isDropdownOpen2 ? styles.open : ''}`}>
                {/* Add your boba drink information here for Image 2 */}
                <p>Drink Name: Your Second Drink</p>
                <p>Ingredients: Ingredients for the second drink</p>
                <p>Flavors: Various flavors for the second drink</p>
              </div>
            </div>
          </div>
          <div className={styles.imageContainer}>
            {/* Image 3 */}
            <Image
              src="/images/brownsugarimgj.jpg"
              alt="Boba Drink 3"
              width={500}
              height={500}
              className={styles.image}
            />
            <div className={`${styles.bobaButton} ${isDropdownOpen3 ? styles.open : ''}`}>
              <div className={styles.buttonContent}>
                <p>Boba Drink Information 3</p>
                <button className={styles.dropdownButton} onClick={toggleDropdown3}>
                  {isDropdownOpen3 ? 'Less' : 'More'}
                </button>
              </div>
              <div className={`${styles.dropdownContent} ${isDropdownOpen3 ? styles.open : ''}`}>
                {/* Add your boba drink information here for Image 3 */}
                <p>Drink Name: Your Third Drink</p>
                <p>Ingredients: Ingredients for the third drink</p>
                <p>Flavors: Various flavors for the third drink</p>
              </div>
            </div>
          </div>
          <div className={styles.imageContainer}>
            {/* Image 4 */}
            <Image
              src="/images/brownsugarimgj.jpg"
              alt="Boba Drink 4"
              width={500}
              height={500}
              className={styles.image}
            />
            <div className={`${styles.bobaButton} ${isDropdownOpen4 ? styles.open : ''}`}>
              <div className={styles.buttonContent}>
                <p>Boba Drink Information 4</p>
                <button className={styles.dropdownButton} onClick={toggleDropdown4}>
                  {isDropdownOpen4 ? 'Less' : 'More'}
                </button>
              </div>
              <div className={`${styles.dropdownContent} ${isDropdownOpen4 ? styles.open : ''}`}>
                {/* Add your boba drink information here for Image 4 */}
                <p>Drink Name: Your Fourth Drink</p>
                <p>Ingredients: Ingredients for the fourth drink</p>
                <p>Flavors: Various flavors for the fourth drink</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
  )
}
