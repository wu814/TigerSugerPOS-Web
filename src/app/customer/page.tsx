"use client"
import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import CustomerCart from '@/src/components/CustomerCart';
import CoffeeFlavored from './coffeeFlavored/CoffeeFlavored';
import FruityAndRefreshing from './fruityAndRefreshing/FruityAndRefreshing';
import SweetAndCreamy from './sweetAndCreamy/SweetAndCreamy';
import SeasonalDrinks from './seasonalDrinks/SeasonalDrinks';
import AllDrinks from './allDrinks/AllDrinks';
import styles from './page.module.css';
import { useSession } from 'next-auth/react';

export default function Home() {
  // State to manage which component to display
  const { data: session } = useSession();
  const [selectedComponent, setSelectedComponent] = useState<string>('allDrinks');

  const [cart, setCart] = useState<any[]>([]);
  const [orderTotal, setOrderTotal] = useState<number>(0);

  const [previousOrders, setPreviousOrders] = useState<any[]>([]);
  const [productsMap, setProductsMap] = useState<{ [key: string]: any }>({});
  
//   useEffect (() => {
//   const fetchProductDetails = async () => {
//     try {
//       const response = await fetch('/api/manager/menuDisplay'); // Adjust the API endpoint
//       const productsData = await response.json();
//       const newProductsMap: { [key: string]: any } = {};
//       productsData.message.forEach((product: any) => {
//         newProductsMap[product.drink_name] = product;
//       });

//       setProductsMap(newProductsMap);
//   } catch (error) {
//       console.error('Error fetching product details:', error);
//     }
//   };

//   fetchProductDetails();
//  }, []);

//  useEffect(() => {
//     if(!session) return;
//     const fetchPreviousOrders = async () => {
//         const res = await fetch(`/api/customer/previousOrders?email=${session?.user?.email}`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });
//         const data = await res.json();
    
//         const prevOrderArray = data.message[0]?.order_items;
//         setPreviousOrders(prevOrderArray);
//         console.log('prevOrderArray', prevOrderArray);
//         prevOrderArray.forEach((orderItem: string | number) => {
//             const productDetails = productsMap[orderItem];
//             if (productDetails) {
//               addToCart(productDetails);
//             }
//             console.log('productDetails', productDetails);
//         }); 
//       }
//       fetchPreviousOrders();

//  }, [productsMap]);


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
        <h1>Customer Page</h1>
        {renderButtons()}
        <div className={styles.duoContainer}>
            <CustomerCart orderList={cart} setParentOrderList={setCart} orderTotal={orderTotal} setOrderTotal={setOrderTotal} />
            {renderSelectedComponent()}
        </div>
      </div>
    </>
  );
}
