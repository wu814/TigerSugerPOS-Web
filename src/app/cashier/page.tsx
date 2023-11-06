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

    const [isCartVisible, setCartVisible] = useState(false); // Show the cart if true, hide if false
    const [selectedOrders, setSelectedOrders] = useState<any[]>([]);
    const [menuData, setMenuData] = useState<any[]>([]); // for fetching menu data
    const [isAddonPopoutOpen, setIsAddonPopoutOpen] = useState(false);
    const [orderTotal, setOrderTotal] = useState(0);


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

    const toggleCart = () => {
        setCartVisible(!isCartVisible);
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
        <h1>Cashier Page</h1>
        <button onClick={placeOrder}>Test placeOrder API Endpoint</button><br/>
        <div className={`${styles.cartButton} ${isCartVisible ? styles.open : ''}`}>
            <div className={styles.cartButtonContent}>
                <p>CART</p>
                <p>Order Total: ${Number(orderTotal)}</p>
                <button className={styles.cartDropdownButton} onClick={toggleCart}>
                    {isCartVisible ? 'Hide' : 'Show'}
                </button>
            </div>
            <div className={`${styles.cartDropdownContent} ${isCartVisible ? styles.open : ''}`}>
                {selectedOrders.map((item, index) => (
                    <div key={index}>
                        <p>{item.drink_name} ${item.price} <button id={'button${drinkIndex}' } onClick={() => removeDrink(item.price, index)}>remove</button></p>
                    </div>
                ))}
            </div>
        </div>
        <button>Charge</button>
        <div className={styles.container}>

            <div className={styles.pContainer}>
              <p className={styles.pItem}><Link href="/cashier/fruityAndRefreshing">Fruity and Refreshing</Link></p>
              <p className={styles.pItem}><Link href="/cashier/sweetAndCreamy">Sweet and Creamy</Link></p>
              <p className={styles.pItem}><Link href="/cashier/coffeeFlavored">Coffee Flavored</Link></p>
              <p className={styles.pItem}><Link href="/cashier/seasonalDrinks">Seasonal Drinks</Link></p>
            </div>
        </div>
        <div className={styles.container}>
            {menuData.map((menuItem, index) => (
                <div className={styles.imageContainer} key={index}>
                    {/* Wrap the Image inside a Link so it's clickable */}
                    <Link href={`http://localhost:3000/cashier`}>
                        <Image
                            src="/images/brownsugarimgj.jpg"
                            alt={`Boba Drink ${index + 1}`}
                            width={300}
                            height={300}
                            className={styles.image}
                        />
                    </Link>
                    <p>Boba Drink {index + 1}</p>
                    <p>Drink Name: {menuItem.drink_name}</p>
                    {/* <button onClick={() => handleOrderSelection(menuItem.drink_name)}>Add to Order</button> */}
                    <button onClick={toggleCustumize}>Customize</button>
                        {isAddonPopoutOpen && (
                            <div className={styles.addonPopout}>
                                {/* Here, render your addon options */}
                                <p>Select your addons:</p>
                                {/* Add checkboxes, dropdowns, or other inputs for addon selection */}
                                <label className="checkbox-label">
                                    <input type="checkbox" name="addon1" value="Addon 1" />
                                    Extra Boba
                                </label>
                                <br/>
                                <label className="checkbox-label">
                                    <input type="checkbox" name="addon2" value="Addon 2" />
                                    Cream Mousse
                                </label>
                                <br/>
                                <label className="checkbox-label">
                                    <input type="checkbox" name="addon3" value="Addon 3" />
                                    Red Bean
                                </label>
                                <br/>
                                <label className="checkbox-label">
                                    <input type="checkbox" name="addon4" value="Addon 4" />
                                    Mochi
                                </label>
                                <br/>
                                <label className="checkbox-label">
                                    <input type="checkbox" name="addon5" value="Addon 5" />
                                    Tiger Pearls
                                </label>
                                <br/>
                                <label className="checkbox-label">
                                    <input type="checkbox" name="addon6" value="Addon 6" />
                                    Taro
                                </label>
                                <br/>
                                <label className="checkbox-label">
                                    <input type="checkbox" name="addon7" value="Addon 7" />
                                    Pudding
                                </label>
                                <br/>
                            </div>
                        )}
                        <br/>
                    <button onClick={()=>handleOrderSelection(menuItem)}>Add to Order</button>
                </div>
            ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
