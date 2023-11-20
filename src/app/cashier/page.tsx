"use client"; // necessary for useState to work
import styles from './page.module.css'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Cart from '../../components/Cart'
import CoffeeFlavored from './coffeeFlavored/page';
import FruityAndRefreshing from './fruityAndRefreshing/page';
import SweetAndCreamy from './sweetAndCreamy/page';
import SeasonalDrinks from './seasonalDrinks/page';

export default function Home() {

    // State to manage which component to display
    const [selectedComponent, setSelectedComponent] = useState('fruityAndRefreshing');

    const [cart, setCart] = useState<Drink[]>([]);
    const [orderTotal, setOrderTotal] = useState(0);

    // Define the type for the Drink
    type Drink = {
        // Define the properties of a drink
        name: string;
        price: number;
    };

    // Function to add a drink to the cart
    const addToCart = (drink: Drink): void => {
        setCart([...cart, drink]);
        setOrderTotal(prevOrderTotal => parseFloat((prevOrderTotal + Number(drink.price)).toFixed(2)));

        console.log(cart);
    };

    // Function to handle component selection
    const handleComponentSelect = (component: string) => {
        setSelectedComponent(component);
    };

    // Render the selected component
    const renderSelectedComponent = () => {
        switch (selectedComponent) {
            case 'fruityAndRefreshing':
                return <FruityAndRefreshing addToCart={addToCart} />;
            case 'sweetAndCreamy':
                return <SweetAndCreamy addToCart={addToCart} />;
            case 'coffeeFlavored':
                return <CoffeeFlavored addToCart={addToCart} />;
            case 'seasonalDrinks':
                return <SeasonalDrinks addToCart={addToCart} />;
            default:
                return null;
        }
    };
    
    return (
    <>
      <Navbar/>
      <div className={styles.main}>
        <h1>Cashier Page</h1>
        <Cart cart={cart} setParentCart={setCart} orderTotal={orderTotal} setOrderTotal={setOrderTotal}/>
        <div className={styles.container}>
            <div className={styles.pContainer}>
                <button className={styles.pItem} onClick={() => handleComponentSelect('fruityAndRefreshing')}>
                Fruity and Refreshing
                </button>
                <button className={styles.pItem} onClick={() => handleComponentSelect('sweetAndCreamy')}>
                Sweet and Creamy
                </button>/
                <button className={styles.pItem} onClick={() => handleComponentSelect('coffeeFlavored')}>
                Coffee Flavored
                </button>
                <button className={styles.pItem} onClick={() => handleComponentSelect('seasonalDrinks')}>
                Seasonal Drinks
                </button>
            </div>
        </div>
        {renderSelectedComponent()}
      </div>
      <Footer/>
    </>
  );
}
