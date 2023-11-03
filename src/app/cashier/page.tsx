"use client"; // necessary for useState to work
import { NextResponse } from "next/server";
import styles from './page.module.css'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function Home() {
    const [isDropdownOpen1, setDropdownOpen1] = useState(false);
    const [isDropdownOpen2, setDropdownOpen2] = useState(false);
    const [isDropdownOpen3, setDropdownOpen3] = useState(false);
    const [isDropdownOpen4, setDropdownOpen4] = useState(false);

    const [isCartVisible, setCartVisible] = useState(false); // Show the cart if true, hide if false
    const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
    
    const [menuData, setMenuData] = useState<any[]>([]); // for fetching menu data
    
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
    
    const [apiResponse, setApiResponse] = useState(null);

    const fetchMenu = async () => {
        const response = await fetch('/api/menuDisplay');
        const json = await response.json();
        setMenuData(json.message);
    }

    const handleOrderSelection = (order: string) => {
        order = order + "\n";
        setSelectedOrders(prevOrder => [...prevOrder, order]); // Add the selected order to the list
    };

    const toggleCart = () => {
        setCartVisible(!isCartVisible);
    };

    const removeDrink = (drinkIndex: number) => {
        // Create a copy of the selectedOrders array
        const updatedOrders = [...selectedOrders];
        // Remove the message at the specified index
        updatedOrders.splice(drinkIndex, 1);
        // Update the state to reflect the removal
        setSelectedOrders(updatedOrders);
      };

    const placeOrder = async () => {
        const orderData = { // Define orderData as an object
            order_timestamp: "2023-10-29 14:33:00",
            employee_id: 1,
            customer_id: 2,
            order_items: ["item1", "item2"],
            order_total: 25.00,
            drink_attributes: ["item1", "item2"],
            drink_addons: ["item1", "item2"],
        };
        
        try{
        const response = await fetch("/api/placeOrder", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(orderData),
        });

        if (response.ok) {
            // If the response status is OK (200), parse the JSON response
            const data = await response.json();
            alert(`Order added successfully. Order ID: ${data.order_id}`);
        } else {
            const errorData = await response.json();
            console.error("Error from API:", errorData);
            alert(`Error: ${errorData.error}`);
        }
        }catch(error){
            console.error('Error fetching API:', error);
        }
    }

    useEffect(() => {
        fetchMenu();
    },[]);    

    return (
    <>
      <Navbar/>
      <div className={styles.main}>
        <h1>Cashier Page</h1>
        <button onClick={placeOrder}>Test placeOrder API Endpoint</button><br/>
        <div className={`${styles.cartButton} ${isCartVisible ? styles.open : ''}`}>
            <div className={styles.cartButtonContent}>
                <p>CART</p>
                <button className={styles.dropdownButton} onClick={toggleCart}>
                {isCartVisible ? 'Hide' : 'Show'}
                </button>
            </div>
            <div className={`${styles.cartDropdownContent} ${isCartVisible ? styles.open : ''}`}>
                {selectedOrders.map((drinkName, drinkIndex) => (
                    <div key={drinkIndex}>
                        {drinkName}
                        <button id={'button${drinkIndex}' } onClick={() => removeDrink(drinkIndex)}>remove</button>
                    </div>
                ))}
            </div>
        </div>
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
                    <button onClick={() => handleOrderSelection("Bubble Tea")}>Add to Order</button>
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
            <div className={styles.pContainer}>
              <p className={styles.pItem}><Link href="/cashier/fruityAndRefreshing">Fruity and Refreshing</Link></p>
              <p className={styles.pItem}><Link href="/cashier/sweetAndCreamy">Sweet and Creamy</Link></p>
              <p className={styles.pItem}><Link href="/cashier/coffeeFlavored">Coffee Flavored</Link></p>
              <p className={styles.pItem}><Link href="/cashier/seasonalDrinks">Seasonal Drinks</Link></p>
            </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

