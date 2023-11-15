"use client"; // necessary for useState to work
import { NextResponse } from "next/server";
import styles from './page.module.css'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { type } from "os";
import { clear } from "console";

export default function Home() {
    const AddOnPair = {
        "Extra Boba": "None",
        "Cream Mousse": "None",
        "Red Bean": "None",
        "Mochi": "None",
        "Tiger Pearls": "None",
        "Taro": "None",
        "Pudding": "None",
    }

    const DrinkAttributePair = {
        "Dairy Free Alternative": "None",
        "Sweetness Level": "100%",
        "Ice Level": "Normal",
        "Cup Size": "Regular",
        "Special Instructions": "None",
    }
    
    const [isCartVisible, setCartVisible] = useState(false); // Show the cart if true, hide if false
    const [selectedOrders, setSelectedOrders] = useState<any[]>([]);
    const [menuData, setMenuData] = useState<any[]>([]); // for fetching menu data
    const [isAddOnPopoutOpen, setIsAddOnPopoutOpen] = useState<boolean[]>([]);
    const [selectedAddOns, setSelectedAddOns] = useState<any[]>([]); // for storing selected add ons
    const [selectedDrinkAttributes, setSelectedDrinkAttributes] = useState<any[]>([]); // for storing selected drink attributes
    const [specialInstructions, setSpecialInstructions] = useState<string[]>([]);
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
        setSelectedAddOns(prevAddOn => [...prevAddOn, AddOnPair]);
        setSelectedDrinkAttributes(prevDrinkAttribute => [...prevDrinkAttribute, DrinkAttributePair]);
        setExtraCharge(prevExtraCharge => [...prevExtraCharge, 0]);
        setIsAddOnPopoutOpen(prevIsAddOnPopoutOpen => [...prevIsAddOnPopoutOpen, false]);
    };


    const toggleCart = () => {
        setCartVisible(!isCartVisible);
    };


    const toggleCustumize = (drinkIndex: number) => {
        const newIsAddOnPopoutOpen = [...isAddOnPopoutOpen];  // Create a copy of the isAddonPopoutOpen array
        newIsAddOnPopoutOpen[drinkIndex] = !newIsAddOnPopoutOpen[drinkIndex];
        setIsAddOnPopoutOpen(newIsAddOnPopoutOpen);
    };


    const handleAddOnSelection = (drinkIndex: number, addOn: string) => {
        const newSelectedAddOns = [...selectedAddOns];  // Create a copy of the selecteAddons array
        const newAddOnPair = newSelectedAddOns[drinkIndex];
        const newExtraCharge = [...extraCharge];  // Create a copy of the extraCharge array

        if (newAddOnPair[addOn] !== "None") {
            newAddOnPair[addOn] = "None";
            newExtraCharge[drinkIndex] -= 0.5; 
            setOrderTotal(prevOrderTotal => parseFloat((prevOrderTotal - 0.5).toFixed(2)));
        } 
        else {
            newAddOnPair[addOn] = "Added";
            newExtraCharge[drinkIndex] += 0.5;
            setOrderTotal(prevOrderTotal => parseFloat((prevOrderTotal + 0.5).toFixed(2)));
        }
        newSelectedAddOns[drinkIndex] = newAddOnPair;
        setSelectedAddOns(newSelectedAddOns);
        setExtraCharge(newExtraCharge);
    };


    const handleAttributeSelection = (drinkIndex: number, attribute: string, value: string) => {
        const newSelectedDrinkAttributes = [...selectedDrinkAttributes];  // Create a copy of the selectedDrinkAttributes array
        const newDrinkAttributePair = newSelectedDrinkAttributes[drinkIndex];  
        const newSpecialInstruction = [...specialInstructions];  // Create a copy of the specialInstructions array
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
            newSpecialInstruction[drinkIndex] = value;
            setSpecialInstructions(newSpecialInstruction);
        }

        // update the drink attribute pair
        newDrinkAttributePair[attribute] = value;

        newSelectedDrinkAttributes[drinkIndex] = newDrinkAttributePair;
        setSelectedDrinkAttributes(newSelectedDrinkAttributes);
        setExtraCharge(newExtraCharge);
    };


    // Functionality when click on remove button
    const removeDrink = (drinkPrice: number, drinkIndex: number) => {
            const updatedOrders = [...selectedOrders];  // Create a copy of the selectedOrders array
            const updateAddOns = [...selectedAddOns];  // Create a copy of the selectedAddOns array
            const updateDrinkAttributes = [...selectedDrinkAttributes];  // Create a copy of the selectedDrinkAttributes array
            const updateExtraCharge = [...extraCharge];  // Create a copy of the extraCharge array
            const updateIsAddOnPopoutOpen = [...isAddOnPopoutOpen];  // Create a copy of the isAddonPopoutOpen array
            const updateSpecialInstruction = [...specialInstructions];  // Create a copy of the specialInstructions array
            // Remove the message at the specified index
            updatedOrders.splice(drinkIndex, 1);
            // Make sure all the state variables are back to default values
            updateAddOns[drinkIndex] = AddOnPair;
            updateDrinkAttributes[drinkIndex] = DrinkAttributePair;
            updateExtraCharge[drinkIndex] = 0;
            updateIsAddOnPopoutOpen[drinkIndex] = false;
            updateSpecialInstruction[drinkIndex] = "None";
            // Update the state to reflect the removal
            setOrderTotal(prevOrderTotal => parseFloat((prevOrderTotal - drinkPrice - extraCharge[drinkIndex]).toFixed(2)));
            setSelectedOrders(updatedOrders);
            setSelectedAddOns(updateAddOns);
            setSelectedDrinkAttributes(updateDrinkAttributes);
            setExtraCharge(updateExtraCharge);
            setIsAddOnPopoutOpen(updateIsAddOnPopoutOpen);
            setSpecialInstructions(updateSpecialInstruction);
    };
    

    const clearCart = () => {
        setSelectedOrders([]);
        setSelectedAddOns([]);
        setSelectedDrinkAttributes([]);
        setExtraCharge([]);
        setIsAddOnPopoutOpen([]);
        setSpecialInstructions([]);
        setOrderTotal(0);
    };


    const getCurrentTimestamp = () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const hours = String(currentDate.getHours()).padStart(2, '0');
        const minutes = String(currentDate.getMinutes()).padStart(2, '0');
        const seconds = String(currentDate.getSeconds()).padStart(2, '0');
      
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      };


    // Functionality when click on place order button
    const placeOrder = async () => {
        const orderItemArray = []; // for converting an array of order items to a string
        const drinkAddOnsArray = []; // for converting an array of drink add ons to a string
        const drinkAttributesArray = []; // for converting an array of drink attributes to a string
        const currentTimeStamp = getCurrentTimestamp(); // get the current timestamp
        for (let i = 0; i < selectedOrders.length; i++) {
            orderItemArray.push(selectedOrders[i].drink_name);
        }
        for (let i = 0; i < selectedAddOns.length; i++) {
            drinkAddOnsArray.push(Object.entries(selectedAddOns[i]).map(([key, value]) => `${key}: ${value}`)
            .join(', '));
        }
        for (let i = 0; i < selectedDrinkAttributes.length; i++) {
            drinkAttributesArray.push(Object.entries(selectedDrinkAttributes[i]).map(([key, value]) => `${key}: ${value}`)
            .join(', '));
        }
        const orderData = { // Define orderData as an object
            orderTimestamp: currentTimeStamp,
            employeeId: 1,
            customerId: 2,
            orderItems: orderItemArray,
            orderTotal: orderTotal,
            drinkAttributes: drinkAttributesArray,
            drinkAddOns: drinkAddOnsArray,
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
        clearCart(); 
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
                        <button onClick={() => toggleCustumize(index)}>Customize</button>
                        {isAddOnPopoutOpen[index] && (
                            <div className={styles.addOnPopout}>
                                <p>Select your add ons:</p>
                                <label className="checkbox-label">
                                    <input type="checkbox" name="extraBoba" value="Boba" 
                                        onChange={()=> handleAddOnSelection(index, "Extra Boba")}
                                        checked={selectedAddOns[index]["Extra Boba"] === "Added"}
                                    />
                                    Extra Boba ($0.50)
                                </label>
                                <span style={{ marginLeft: '10px' }}></span>
                                <label className="checkbox-label">
                                    <input type="checkbox" name="extraCreamMousse" value="Cream Mousse" 
                                        onChange={()=> handleAddOnSelection(index, "Cream Mousse")}
                                        checked={selectedAddOns[index]["Cream Mousse"] === "Added"}
                                    />
                                    Cream Mousse ($0.50)
                                </label>
                                <span style={{ marginLeft: '10px' }}></span>
                                <label className="checkbox-label">
                                    <input type="checkbox" name="extraRedBean" value="Red Bean" 
                                        onChange={()=> handleAddOnSelection(index, "Red Bean")}
                                        checked={selectedAddOns[index]["Red Bean"] === "Added"}
                                    />
                                    Red Bean ($0.50)
                                </label>
                                <span style={{ marginLeft: '10px' }}></span>
                                <label className="checkbox-label">
                                    <input type="checkbox" name="extraMochi" value="Mochi" 
                                        onChange={()=> handleAddOnSelection(index, "Mochi")}
                                        checked={selectedAddOns[index]["Mochi"] === "Added"}
                                    />
                                    Mochi  ($0.50)
                                </label>
                                <span style={{ marginLeft: '10px' }}></span>
                                <label className="checkbox-label">
                                    <input type="checkbox" name="extraTigerPearls" value="Tiger Pearls" 
                                        onChange={()=> handleAddOnSelection(index, "Tiger Pearls")}
                                        checked={selectedAddOns[index]["Tiger Pearls"] === "Added"}
                                    />
                                    Tiger Pearls ($0.50)
                                </label>
                                <span style={{ marginLeft: '10px' }}></span>
                                <label className="checkbox-label">
                                    <input type="checkbox" name="extraTaro" value="Taro" 
                                        onChange={()=> handleAddOnSelection(index, "Taro")}
                                        checked={selectedAddOns[index]["Taro"] === "Added"}
                                    />
                                    Taro ($0.50)
                                </label>
                                <span style={{ marginLeft: '10px' }}></span>
                                <label className="checkbox-label">
                                    <input type="checkbox" name="extraPudding" value="Pudding" 
                                        onChange={()=> handleAddOnSelection(index, "Pudding")}
                                        checked={selectedAddOns[index]["Pudding"] === "Added"}
                                    />
                                    Pudding ($0.50)
                                </label>
                                <br/>
                                <br/>
                                Dairy Free Alternatives
                                <br/>
                                <label>
                                    <input type="radio" name={`dairyFree-${index}`} value="None" defaultChecked 
                                        onChange={()=> handleAttributeSelection(index, "Dairy Free Alternative", "None")}
                                        checked={selectedDrinkAttributes[index]["Dairy Free Alternative"] === "None"}
                                    /> 
                                    None
                                </label>
                                <span style={{ marginLeft: '10px' }}></span>
                                <label>
                                    <input type="radio" name={`dairyFree-${index}`} value="Oat" 
                                        onChange={()=> handleAttributeSelection(index, "Dairy Free Alternative", "Oat")}
                                        checked={selectedDrinkAttributes[index]["Dairy Free Alternative"] === "Oat"}
                                    />
                                    Oat
                                </label>
                                <span style={{ marginLeft: '10px' }}></span>
                                <label>
                                    <input type="radio" name={`dairyFree-${index}`} value="Soy" 
                                        onChange={()=> handleAttributeSelection(index, "Dairy Free Alternative", "Soy")}
                                        checked={selectedDrinkAttributes[index]["Dairy Free Alternative"] === "Soy"}
                                    /> 
                                    Soy
                                </label>
                                <span style={{ marginLeft: '10px' }}></span>
                                <label>
                                    <input type="radio" name={`dairyFree-${index}`} value="Lactose Free" 
                                        onChange={()=> handleAttributeSelection(index, "Dairy Free Alternative", "Lactose Free")}
                                        checked={selectedDrinkAttributes[index]["Dairy Free Alternative"] === "Lactose Free"}
                                    /> 
                                    Lactose Free
                                </label>
                                <br/>
                                <br/>
                                Sweetness Level
                                <br/>
                                <label>
                                    <input type="radio" name={`sweetnessLevel-${index}`} value="100%" defaultChecked 
                                        onChange={()=> handleAttributeSelection(index, "Sweetness Level", "100%")}
                                        checked={selectedDrinkAttributes[index]["Sweetness Level"] === "100%"}
                                    /> 
                                    100%
                                </label>
                                <span style={{ marginLeft: '10px' }}></span>
                                <label>
                                    <input type="radio" name={`sweetnessLevel-${index}`} value="50%" 
                                        onChange={()=> handleAttributeSelection(index, "Sweetness Level", "50%")}
                                        checked={selectedDrinkAttributes[index]["Sweetness Level"] === "50%"}
                                    /> 
                                    50%
                                </label>
                                <br/>
                                <br/>
                                Ice Level
                                <br/>
                                <label>
                                    <input type="radio" name={`iceLevel-${index}`} value="Normal" defaultChecked 
                                        onChange={()=> handleAttributeSelection(index, "Ice Level", "Normal")}
                                        checked={selectedDrinkAttributes[index]["Ice Level"] === "Normal"}
                                    /> 
                                    Normal
                                </label>
                                <span style={{ marginLeft: '10px' }}></span>
                                <label>
                                    <input type="radio" name={`iceLevel-${index}`} value="Less Ice" 
                                        onChange={()=> handleAttributeSelection(index, "IceLevel", "Less Ice")}
                                        checked={selectedDrinkAttributes[index]["Ice Level"] === "Less Ice"}
                                    /> 
                                    Less Ice
                                </label>
                                <span style={{ marginLeft: '10px' }}></span>
                                <label>
                                    <input type="radio" name={`iceLevel-${index}`} value="None" 
                                        onChange={()=> handleAttributeSelection(index, "Ice Level", "None")}
                                        checked={selectedDrinkAttributes[index]["Ice Level"] === "None"}
                                    />
                                    None
                                </label>
                                <br/>
                                <br/>
                                Cup Size
                                <br/>
                                <label>
                                    <input type="radio" name={`cupSize-${index}`} value="Regular" defaultChecked 
                                        onChange={()=> handleAttributeSelection(index, "Cup Size", "Regular")}
                                        checked={selectedDrinkAttributes[index]["Cup Size"] === "Regular"}
                                    /> 
                                    Regular
                                </label>
                                <span style={{ marginLeft: '10px' }}></span>
                                <label>
                                    <input type="radio" name={`cupSize-${index}`} value="Regular Hot" 
                                        onChange={()=> handleAttributeSelection(index, "Cup Size", "Regular Hot")}
                                        checked={selectedDrinkAttributes[index]["Cup Size"] === "Regular Hot"}
                                    /> 
                                    Regular Hot ($1.00)
                                </label>
                                <span style={{ marginLeft: '10px' }}></span>
                                <label>
                                    <input type="radio" name={`cupSize-${index}`} value="XL" 
                                        onChange={()=> handleAttributeSelection(index, "Cup Size", "XL")}
                                        checked={selectedDrinkAttributes[index]["Cup Size"] === "XL"}
                                    /> 
                                    XL ($2.00)
                                </label>
                                <br/>
                                <br/>
                                <label>
                                    <input type="text" name={`specialInstruction-${index}`} placeholder="Add special instructions" value={specialInstructions[index]}
                                        onChange={(event)=> handleAttributeSelection(index, "Special Instructions", event.target.value)}
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
            <button onClick={clearCart}>Clear Cart</button>
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
