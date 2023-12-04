"use client"; // necessary for useState to work
import { NextResponse } from "next/server";
import styles from './page.module.css'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { type } from "os";

export default function Home() {

    const [selectedOrders, setSelectedOrders] = useState<any[]>([]);
    const [menuData, setMenuData] = useState<any[]>([]); // for fetching menu data
    const [isAddonPopoutOpen, setIsAddonPopoutOpen] = useState(false);
    const [orderTotal, setOrderTotal] = useState(0);

    const sortedMenuData = menuData.sort((a, b) => a.drink_name.localeCompare(b.drink_name));


    const fetchMenu = async () => {
        const response = await fetch('/api/manager/menuDisplay');
        const json = await response.json();
        setMenuData(json.message);
    }

    // Fuctionality when click on Add to Order button
    const handleOrderSelection = (orderItem: any) => {
        // Making sure the price is a number
        setOrderTotal(prevOrderTotal => prevOrderTotal + Number(orderItem.price));
        setSelectedOrders(prevOrder => [...prevOrder, orderItem]); // Add the selected order to the list
    };

    const toggleCustumize = () => {
        setIsAddonPopoutOpen(!isAddonPopoutOpen);
    }

    // Functionality when click on remove button
    const removeDrink = (drinkPrice: number, drinkIndex: number) => {
        // Create a copy of the selectedOrders array
        const updatedOrders = [...selectedOrders];
        // Remove the message at the specified index
        updatedOrders.splice(drinkIndex, 1);
        // Update the state to reflect the removal
        setSelectedOrders(updatedOrders);
        setOrderTotal(prevOrderTotal => prevOrderTotal - Number(drinkPrice));
      };
    
    // Functionality when click on place order button
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

    // Fetch menu data on page load
    useEffect(() => {
        fetchMenu();
    },[]);    

    return (
    <>
      <Navbar/>
      <div className={styles.main}>
        <h1>Menu Board</h1>
        {/* <div className={styles.container}>

            <div className={styles.pContainer}>
              <p className={styles.pItem}><Link href="/cashier/fruityAndRefreshing">Fruity and Refreshing</Link></p>
              <p className={styles.pItem}><Link href="/cashier/sweetAndCreamy">Sweet and Creamy</Link></p>
              <p className={styles.pItem}><Link href="/cashier/coffeeFlavored">Coffee Flavored</Link></p>
              <p className={styles.pItem}><Link href="/cashier/seasonalDrinks">Seasonal Drinks</Link></p>
            </div>
        </div> */}
        <div className={styles.container}>
            {sortedMenuData.map((menuItem, index) => (
                <div className={styles.drinksContainer} key={index}>
                    <Image
                        src={`/images/${menuItem.image_url}`}
                        alt={`Boba Drink ${index + 1}`}
                        width={300}
                        height={300}
                        className={styles.image}
                    />
                    <p className={styles.drinkName}>{menuItem.drink_name}</p>
                    <p className={styles.drinkPrice}>${menuItem.price}</p>
                    <p className={styles.drinkDescription}>{menuItem.description}</p>
                    {/* <button onClick={() => handleOrderSelection(menuItem.drink_name)}>Add to Order</button> */}
                </div>
            ))}
        </div>
      </div>
    </>
  );
}
