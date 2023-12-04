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
import { Modal, Button, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'; 

export default function Home() {
  // State to manage which component to display
  const [selectedComponent, setSelectedComponent] = useState<string>('allDrinks');

  const [cart, setCart] = useState<any[]>([]);
  const [orderTotal, setOrderTotal] = useState<number>(0);

  // State for controlling the visibility of the modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
    fetchRecentOrders();
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const fetchRecentOrders = async () => {
    const response = await fetch('/api/cashier/recentOrders');
    const data = await response.json();
    setRecentOrders(data.message);
  }

    const formatTimestamp = (timestamp: string | number | Date) => {
        const date = new Date(timestamp);
        // Adjust the format according to your preference
        const formattedDate = date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            timeZoneName: 'short',
        });
        return formattedDate;
    };

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

        <Button variant='contained' onClick={openModal}>
          View Recent Orders
        </Button>

        <Modal
        open={isModalOpen}
        onClose={closeModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        disableScrollLock
        >
        <Paper className={styles.modalContent}>
            {/* Use Typography component for consistent typography */}
            <Typography variant="h4" id="modal-title" gutterBottom>
            Recent Orders
            </Typography>
            <Typography variant="body1" id="modal-description" paragraph>
            Here are the 100 most recent orders.
            </Typography>
            <TableContainer>
            <Table>
                <TableHead>
                <TableRow>
                    <TableCell sx={{backgroundColor: 'black', color: 'white'}}>Order ID</TableCell>
                    <TableCell sx={{backgroundColor: 'black', color: 'white'}}>Order Timestamp</TableCell>
                    <TableCell sx={{backgroundColor: 'black', color: 'white'}}>Order Items</TableCell>
                    <TableCell sx={{backgroundColor: 'black', color: 'white'}}>Order Total</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {recentOrders.map((order) => (
                    <TableRow key={order.order_id}>
                    <TableCell>{order.order_id}</TableCell>
                    <TableCell>{formatTimestamp(order.order_timestamp)}</TableCell>
                    <TableCell>{order.order_items.join(', ')}</TableCell>
                    <TableCell>${order.order_total}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
            {/* Use a more visually appealing button style */}
            <Button variant="contained" onClick={closeModal}>
            Close
            </Button>
        </Paper>
        </Modal>

        <h1>Cashier Page</h1>
        {renderButtons()}
        <div className={styles.duoContainer}>
            <OrderList orderList={cart} setParentOrderList={setCart} orderTotal={orderTotal} setOrderTotal={setOrderTotal} />
            {renderSelectedComponent()}
        </div>
      </div>
    </>
  );
}
