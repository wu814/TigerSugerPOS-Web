"use client"; // necessary for useState to work
import styles from '../page.module.css'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function CoffeeFlavored({ addToCart }: { addToCart: any }) {
   
    const [menuData, setMenuData] = useState<any[]>([]); // for fetching menu data

    const fetchMenu = async () => {
        const response = await fetch('/api/manager/menuDisplay');
        const json = await response.json();
        setMenuData(json.message);
    }

    // Fetch menu data on page load
    useEffect(() => {
        fetchMenu();
    },[]);

    const handleOrderSelection = (menuItem: any) => {
        addToCart(menuItem);
    };

    const sortedMenuData = menuData.sort((a, b) => a.drink_name.localeCompare(b.drink_name)); // sort menu data alphabetically

    return (
    <>
    <div className={styles.scrollContainer}>
        <h2>Click to add to order!</h2>
        <div className={styles.drinksContainer}>
            {sortedMenuData
            .filter(menuItem => menuItem.drink_type === 'Coffee Flavored')
            .map((menuItem, index) => (
                <div className={styles.imageContainer} key={index} role='button' onClick={() => handleOrderSelection(menuItem)}>
                <div className={styles.drinkDescription}>
                    <p className={styles.drinkName}>{menuItem.drink_name}</p>
                    <p className={styles.drinkPrice}>${menuItem.price}</p>
                </div>
                </div>
            ))}
        </div>
    </div>
    </>
  );
}
