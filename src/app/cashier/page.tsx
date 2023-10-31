"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import Navbar from '../../components/Navbar';

export default function Home() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <Image
          src="/images/brownsugarimgj.jpg"
          alt="Boba Drink"
          width={500}
          height={300}
          className={styles.image}
        />
        <div className={styles.buttonContainer}>
          <div className={`${styles.bobaButton} ${isDropdownOpen ? styles.open : ''}`}>
            <div className={styles.buttonContent}>
              <p>Boba Drink Information</p>
              <button className={styles.dropdownButton} onClick={toggleDropdown}>
                {isDropdownOpen ? 'Close' : 'Open'}
              </button>
            </div>
            {isDropdownOpen && (
              <div className={styles.dropdownContent}>
                {/* Add your boba drink information here */}
                <p>Drink Name: Bubble Tea</p>
                <p>Ingredients: Tapioca pearls, tea, milk, sugar</p>
                <p>Flavors: Various fruit flavors</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <p>Cashier page (replace later)</p>
    </>
  );
}
