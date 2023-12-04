"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import OrderList from '../../components/OrderList';
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
      case 'allDrinks':
        return <AllDrinks addToCart={addToCart} />;
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

  const renderButtons = (): JSX.Element => {
    const buttonData = [
      { label: 'All Drinks', value: 'allDrinks' },
      { label: 'Fruity and Refreshing', value: 'fruityAndRefreshing' },
      { label: 'Sweet and Creamy', value: 'sweetAndCreamy' },
      { label: 'Coffee Flavored', value: 'coffeeFlavored' },
      { label: 'Seasonal Drinks', value: 'seasonalDrinks' },
    ];
  
    return (
      <ul className={styles.container}>
        {buttonData.map((button) => (
          <li className={styles.pContainer} key={button.value}>
            <button
              className={`${styles.pItem} ${selectedComponent === button.value ? styles.activeDrinkType : ''}`}
              onClick={() => handleComponentSelect(button.value)}
            >
              {button.label}
            </button>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <Navbar />
      <div className={styles.main}>
        <h1>Cashier Page</h1>
        {renderButtons()}
        <OrderList orderList={cart} setParentOrderList={setCart} orderTotal={orderTotal} setOrderTotal={setOrderTotal} />
        {renderSelectedComponent()}
      </div>
    </>
  );
}
