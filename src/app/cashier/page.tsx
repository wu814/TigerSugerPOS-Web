"use client"; // necessary for useState to work
import { NextResponse } from "next/server";
import styles from './page.module.css'
import Navbar from '../../components/Navbar'
import { useState } from 'react';

export default function Home() {
  const [apiResponse, setApiResponse] = useState(null);
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
  
  return (
      <>
        <Navbar/>
        <p>Customer page (replace later)</p>
        <button onClick={placeOrder}>Test placeOrder API Endpoint</button>
    </>
  )
}
