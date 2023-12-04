"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Cart from '../../components/Cart';
import CoffeeFlavored from './coffeeFlavored/CoffeeFlavored';
import FruityAndRefreshing from './fruityAndRefreshing/FruityAndRefreshing';
import SweetAndCreamy from './sweetAndCreamy/SweetAndCreamy';
import SeasonalDrinks from './seasonalDrinks/SeasonalDrinks';
import AllDrinks from './allDrinks/AllDrinks';
import styles from './page.module.css';

export default function Home() {
  // State to manage which component to display
  const [selectedComponent, setSelectedComponent] = useState<string>('allDrinks');

  const [cart, setCart] = useState<any[]>([]);
  const [orderTotal, setOrderTotal] = useState<number>(0);


  // Function to add a drink to the cart
  const addToCart = (drink: any): void => {
    setCart([...cart, drink]);
    setOrderTotal((prevOrderTotal) => parseFloat((prevOrderTotal + Number(drink.price)).toFixed(2)));
  };

  // Function to handle component selection
  const handleComponentSelect = (component: string): void => {
    setSelectedComponent(component);
  };

  // Render the selected component
  const renderSelectedComponent = (): JSX.Element | null => {
    switch (selectedComponent) {
      case 'fruityAndRefreshing':
        return <FruityAndRefreshing addToCart={addToCart} />;
      case 'sweetAndCreamy':
        return <SweetAndCreamy addToCart={addToCart} />;
      case 'coffeeFlavored':
        return <CoffeeFlavored addToCart={addToCart} />;
      case 'seasonalDrinks':
        return <SeasonalDrinks addToCart={addToCart} />;
      case 'allDrinks':
        return <AllDrinks addToCart={addToCart} />;
      default:
        return null;
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.main}>
        <h1>Customer Page</h1>
        <Cart cart={cart} setParentCart={setCart} orderTotal={orderTotal} setOrderTotal={setOrderTotal} />
        <ul className={styles.container}>
          <li className={styles.pContainer}>
            <button className={styles.pItem} onClick={() => handleComponentSelect('fruityAndRefreshing')}>
              Fruity and Refreshing
            </button>
          </li>
          <li className={styles.pContainer}>
            <button className={styles.pItem} onClick={() => handleComponentSelect('sweetAndCreamy')}>
              Sweet and Creamy
            </button>
          </li>
          <li className={styles.pContainer}>
            <button className={styles.pItem} onClick={() => handleComponentSelect('coffeeFlavored')}>
              Coffee Flavored
            </button>
          </li>
          <li className={styles.pContainer}>
            <button className={styles.pItem} onClick={() => handleComponentSelect('seasonalDrinks')}>
              Seasonal Drinks
            </button>
          </li>
          <li className={styles.pContainer}>
            <button className={styles.pItem} onClick={() => handleComponentSelect('allDrinks')}>
              All Drinks
            </button>
          </li>
        </ul>
        {renderSelectedComponent()}
      </div>
    </>
  );
}
