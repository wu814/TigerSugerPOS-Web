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
    const AddonPair = {
        Boba: "None",
        CreamMousse: "None",
        RedBean: "None",
        Mochi: "None",
        TigerPearls: "None",
        Taro: "None",
        Pudding: "None",
    }

    const DrinkAttributePair = {
        DairyFree: "None",
        SweetnessLevel: "100%",
        IceLevel: "Normal",
        CupSize: "Regular",
        SpecialInstructions: "None",
    }
    
    const [isCartVisible, setCartVisible] = useState(false); // Show the cart if true, hide if false
    const [selectedOrders, setSelectedOrders] = useState<any[]>([]);
    const [menuData, setMenuData] = useState<any[]>([]); // for fetching menu data
    const [isAddonPopoutOpen, setIsAddonPopoutOpen] = useState<boolean[]>([]);
    const [selectedAddons, setSelectedAddons] = useState<any[]>([]); // for storing selected addons
    const [selectedDrinkAttributes, setSelectedDrinkAttributes] = useState<any[]>([]); // for storing selected drink attributes
    const [specialInstructions, setSpecialInstructions] = useState('');
    const [extraCharge, setExtraCharge] = useState<number[]>([]);
    const [orderTotal, setOrderTotal] = useState(0);


    const fetchMenu = async () => {
        const response = await fetch('/api/manager/menuDisplay');
        const json = await response.json();
        setMenuData(json.message);
    }


    // Fuctionality when click on Add to Order button
    const handleOrderSelection = (orderItem: any) => {
        setOrderTotal(prevOrderTotal => parseFloat((prevOrderTotal + Number(orderItem.price)).toFixed(2)));
        setSelectedOrders(prevOrder => [...prevOrder, orderItem]); // Add the selected order to the list
        const newAddonPair = { ...AddonPair }; // Create a new AddonPair for the item and add it to selectedAddons  
        const newDrinkAttributePair = { ...DrinkAttributePair }; // Create a new DrinkAttributePair for the item and add it to selectedDrinkAttributes      
        const newExtraCharge = [...extraCharge]; // Create a new extraCharge for the item and add it to extraCharge
        const newIsAddonPopoutOpen = [...isAddonPopoutOpen]; // Create a new isAddonPopoutOpen for the item and add it to isAddonPopoutOpen

        setSelectedAddons([...selectedAddons, newAddonPair]);
        setSelectedDrinkAttributes([...selectedDrinkAttributes, newDrinkAttributePair]);
        setExtraCharge([...newExtraCharge, 0]);
        setIsAddonPopoutOpen([...newIsAddonPopoutOpen, false]);
    };


    const toggleCart = () => {
        setCartVisible(!isCartVisible);
    };


    const toggleCustumize = (drinkIndex: number) => {
        const newIsAddonPopoutOpen = [...isAddonPopoutOpen];  // Create a copy of the isAddonPopoutOpen array
        newIsAddonPopoutOpen[drinkIndex] = !newIsAddonPopoutOpen[drinkIndex];
        setIsAddonPopoutOpen(newIsAddonPopoutOpen);
    };


    const handleAddonSelection = (drinkIndex: number, addon: string) => {
        const newSelectedAddons = [...selectedAddons];  // Create a copy of the selecteAddons array
        const newAddonPair = newSelectedAddons[drinkIndex];
        const newExtraCharge = [...extraCharge];  // Create a copy of the extraCharge array

        if (newAddonPair[addon] !== "None") {
            newAddonPair[addon] = "None";
            newExtraCharge[drinkIndex] -= 0.5; 
            setOrderTotal(prevOrderTotal => parseFloat((prevOrderTotal - 0.5).toFixed(2)));
        } 
        else {
            newAddonPair[addon] = "Added";
            newExtraCharge[drinkIndex] += 0.5;
            setOrderTotal(prevOrderTotal => parseFloat((prevOrderTotal + 0.5).toFixed(2)));
        }
        newSelectedAddons[drinkIndex] = newAddonPair;
        setSelectedAddons(newSelectedAddons);
        setExtraCharge(newExtraCharge);
    };


    const handleAttributeSelection = (drinkIndex: number, attribute: string, value: string) => {
        const newSelectedDrinkAttributes = [...selectedDrinkAttributes];  // Create a copy of the selectedDrinkAttributes array
        const newDrinkAttributePair = newSelectedDrinkAttributes[drinkIndex];  
        const newExtraCharge = [...extraCharge];  // Create a copy of the extraCharge array
        // Changing price based on cup size
        if (attribute === "CupSize"){
            // Regular to Regular Hot
            if (value === "Regular Hot" && newDrinkAttributePair["CupSize"] === "Regular"){
                newExtraCharge[drinkIndex] += 1; 
                setOrderTotal(prevOrderTotal => parseFloat((prevOrderTotal + 1).toFixed(2)));
            }
            // Regular to XL
            else if (value === "XL" && newDrinkAttributePair["CupSize"] === "Regular"){
                newExtraCharge[drinkIndex] += 2;
                setOrderTotal(prevOrderTotal => parseFloat((prevOrderTotal + 2).toFixed(2)));  
                console.log("XL to Regular"); 
            }
            // Regular Hot to Regular
            else if (value === "Regular" && newDrinkAttributePair["CupSize"] === "Regular Hot"){
                newExtraCharge[drinkIndex] -= 1; 
                setOrderTotal(prevOrderTotal => parseFloat((prevOrderTotal - 1).toFixed(2)));
            }
            // Regular Hot to XL
            else if (value === "XL" && newDrinkAttributePair["CupSize"] === "Regular Hot"){
                newExtraCharge[drinkIndex] += 1;
                setOrderTotal(prevOrderTotal => parseFloat((prevOrderTotal + 1).toFixed(2)));
            }
            // XL to Regular
            else if (value === "Regular" && newDrinkAttributePair["CupSize"] === "XL"){
                newExtraCharge[drinkIndex] -= 2;
                setOrderTotal(prevOrderTotal => parseFloat((prevOrderTotal - 2).toFixed(2)));
            }
            // XL to Regular Hot    
            else if (value === "Regular Hot" && newDrinkAttributePair["CupSize"] === "XL"){
                newExtraCharge[drinkIndex] -= 1;
                setOrderTotal(prevOrderTotal => parseFloat((prevOrderTotal - 1).toFixed(2)));
            }
        }

        if (attribute === "SpecialInstructions") {
            setSpecialInstructions(value);
        }
        if (newDrinkAttributePair[attribute] !== value) {
            newDrinkAttributePair[attribute] = value;
        } 

        newSelectedDrinkAttributes[drinkIndex] = newDrinkAttributePair;
        setSelectedDrinkAttributes(newSelectedDrinkAttributes);
        setExtraCharge(newExtraCharge);
    };


    // Functionality when click on remove button
    const removeDrink = (drinkPrice: number, drinkIndex: number) => {
            const updatedOrders = [...selectedOrders];  // Create a copy of the selectedOrders array
            // Remove the message at the specified index
            updatedOrders.splice(drinkIndex, 1);
            // Update the state to reflect the removal
            setSelectedOrders(updatedOrders);
            setOrderTotal(prevOrderTotal => parseFloat((prevOrderTotal - drinkPrice - extraCharge[drinkIndex]).toFixed(2)));
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
        <div className={`${styles.cartButton} ${isCartVisible ? styles.open : ''}`}>
            <div className={styles.cartButtonContent}>
                <p>CART</p>
                <p>Order Total: ${orderTotal.toFixed(2)}</p>
                <button className={styles.cartDropdownButton} onClick={toggleCart}>
                    {isCartVisible ? 'Hide' : 'Show'}
                </button>
            </div>
            <div className={`${styles.cartDropdownContent} ${isCartVisible ? styles.open : ''}`}>
                {selectedOrders.map((item, index) => (
                    <div key={index}>
                        <p>{item.drink_name} ${(Number(item.price)+extraCharge[index]).toFixed(2)} <br/>
                        {/* {Object.entries(selectedAddons[index])} <br/>
                        {Object.entries(selectedDrinkAttributes[index])} <br/> */}
                        <button onClick={() => toggleCustumize(index)}>Customize</button>
                        {isAddonPopoutOpen[index] && (
                            <div className={styles.addonPopout}>
                                <p>Select your addons:</p>
                                <label className="checkbox-label">
                                    <input type="checkbox" name="extraBoba" value="Boba" 
                                        onChange={()=> handleAddonSelection(index, "Boba")}
                                        checked={selectedAddons[index]["Boba"] === "Added"}
                                    />
                                    Extra Boba ($0.50)
                                </label>
                                <br/>
                                <label className="checkbox-label">
                                    <input type="checkbox" name="extraCreamMousse" value="Cream Mousse" 
                                        onChange={()=> handleAddonSelection(index, "CreamMousse")}
                                        checked={selectedAddons[index]["CreamMousse"] === "Added"}
                                    />
                                    Cream Mousse ($0.50)
                                </label>
                                <br/>
                                <label className="checkbox-label">
                                    <input type="checkbox" name="extraRedBean" value="Red Bean" 
                                        onChange={()=> handleAddonSelection(index, "RedBean")}
                                        checked={selectedAddons[index]["RedBean"] === "Added"}
                                    />
                                    Red Bean ($0.50)
                                </label>
                                <br/>
                                <label className="checkbox-label">
                                    <input type="checkbox" name="extraMochi" value="Mochi" 
                                        onChange={()=> handleAddonSelection(index, "Mochi")}
                                        checked={selectedAddons[index]["Mochi"] === "Added"}
                                    />
                                    Mochi  ($0.50)
                                </label>
                                <br/>
                                <label className="checkbox-label">
                                    <input type="checkbox" name="extraTigerPearls" value="Tiger Pearls" 
                                        onChange={()=> handleAddonSelection(index, "TigerPearls")}
                                        checked={selectedAddons[index]["TigerPearls"] === "Added"}
                                    />
                                    Tiger Pearls ($0.50)
                                </label>
                                <br/>
                                <label className="checkbox-label">
                                    <input type="checkbox" name="extraTaro" value="Taro" 
                                        onChange={()=> handleAddonSelection(index, "Taro")}
                                        checked={selectedAddons[index]["Taro"] === "Added"}
                                    />
                                    Taro ($0.50)
                                </label>
                                <br/>
                                <label className="checkbox-label">
                                    <input type="checkbox" name="extraPudding" value="Pudding" 
                                        onChange={()=> handleAddonSelection(index, "Pudding")}
                                        checked={selectedAddons[index]["Pudding"] === "Added"}
                                    />
                                    Pudding ($0.50)
                                </label>
                                <br/>
                                <br/>
                                <br/>
                                Dairy Free Alternatives
                                <br/>
                                <label>
                                    <input type="radio" name="dairyFree" value="None" defaultChecked 
                                        onChange={()=> handleAttributeSelection(index, "DairyFree", "None")}
                                        checked={selectedDrinkAttributes[index]["DairyFree"] === "None"}
                                    /> 
                                    None
                                </label>
                                <br />
                                <label>
                                    <input type="radio" name="dairyFree" value="Oat" 
                                        onChange={()=> handleAttributeSelection(index, "DairyFree", "Oat")}
                                        checked={selectedDrinkAttributes[index]["DairyFree"] === "Oat"}
                                    />
                                    Oat
                                </label>
                                <br />
                                <label>
                                    <input type="radio" name="dairyFree" value="Soy" 
                                        onChange={()=> handleAttributeSelection(index, "DairyFree", "Soy")}
                                        checked={selectedDrinkAttributes[index]["DairyFree"] === "Soy"}
                                    /> 
                                    Soy
                                </label>
                                <br />
                                <label>
                                    <input type="radio" name="dairyFree" value="Lactose Free" 
                                        onChange={()=> handleAttributeSelection(index, "DairyFree", "Lactose Free")}
                                        checked={selectedDrinkAttributes[index]["DairyFree"] === "Lactose Free"}
                                    /> 
                                    Lactose Free
                                </label>
                                <br/>
                                <br/>
                                Sweetness Level
                                <br/>
                                <label>
                                    <input type="radio" name="sweetnessLevel" value="100%" defaultChecked 
                                        onChange={()=> handleAttributeSelection(index, "SweetnessLevel", "100%")}
                                        checked={selectedDrinkAttributes[index]["SweetnessLevel"] === "100%"}
                                    /> 
                                    100%
                                </label>
                                <br/>
                                <label>
                                    <input type="radio" name="sweetnessLevel" value="50%" 
                                        onChange={()=> handleAttributeSelection(index, "SweetnessLevel", "50%")}
                                        checked={selectedDrinkAttributes[index]["SweetnessLevel"] === "50%"}
                                    /> 
                                    50%
                                </label>
                                <br/>
                                <br/>
                                Ice Level
                                <br/>
                                <label>
                                    <input type="radio" name="iceLevel" value="Normal" defaultChecked 
                                        onChange={()=> handleAttributeSelection(index, "IceLevel", "Normal")}
                                        checked={selectedDrinkAttributes[index]["IceLevel"] === "Normal"}
                                    /> 
                                    Normal
                                </label>
                                <br/>
                                <label>
                                    <input type="radio" name="iceLevel" value="Less Ice" 
                                        onChange={()=> handleAttributeSelection(index, "IceLevel", "Less Ice")}
                                        checked={selectedDrinkAttributes[index]["IceLevel"] === "Less Ice"}
                                    /> 
                                    Less Ice
                                </label>
                                <br/>
                                <label>
                                    <input type="radio" name="iceLevel" value="None" 
                                        onChange={()=> handleAttributeSelection(index, "IceLevel", "None")}
                                        checked={selectedDrinkAttributes[index]["IceLevel"] === "None"}
                                    />
                                    None
                                </label>
                                <br/>
                                <br/>
                                <label>
                                    <input type="radio" name="cupSize" value="Regular" defaultChecked 
                                        onChange={()=> handleAttributeSelection(index, "CupSize", "Regular")}
                                        checked={selectedDrinkAttributes[index]["CupSize"] === "Regular"}
                                    /> 
                                    Regular
                                </label>
                                <br/>
                                <label>
                                    <input type="radio" name="cupSize" value="Regular Hot" 
                                        onChange={()=> handleAttributeSelection(index, "CupSize", "Regular Hot")}
                                        checked={selectedDrinkAttributes[index]["CupSize"] === "Regular Hot"}
                                    /> 
                                    Regular Hot ($1.00)
                                </label>
                                <br/>
                                <label>
                                    <input type="radio" name="cupSize" value="XL" 
                                        onChange={()=> handleAttributeSelection(index, "CupSize", "XL")}
                                        checked={selectedDrinkAttributes[index]["CupSize"] === "XL"}
                                    /> 
                                    XL ($2.00)
                                </label>
                                <br/>
                                <br/>
                                <label>
                                    <input type="text" name="specialInstructions" placeholder="Add special instructions" value={specialInstructions}
                                        onChange={(event)=> handleAttributeSelection(index, "SpecialInstructions", event.target.value)}
                                    />
                                </label>
                            </div>
                        )}
                        {" "}<button id={'button${drinkIndex}' } onClick={() => removeDrink(item.price, index)}>remove</button>
                        </p>
                    </div>
                ))}
            </div>
            <button onClick={placeOrder}>Charge</button><br/>
        </div>
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
                    <button onClick={()=>handleOrderSelection(menuItem)}>Add to Order</button>
                </div>
            ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
