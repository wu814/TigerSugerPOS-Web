import { useState, useEffect, use } from 'react';
import styles from './CustomerCart.module.css';
import { Modal, Button, Paper, Checkbox, FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material';
import Image from 'next/image';

export default function CustomerCart({ orderList, setParentOrderList, orderTotal, setOrderTotal }: { orderList: any[], setParentOrderList: any, orderTotal: number, setOrderTotal: any }) {
    const AddOnPair = {
        "Tapioca Pearls (Boba)": "None",
        "Cream Mousse": "None",
        "Red Beans": "None",
        "Mochi": "None",
        "Tiger Pearls": "None",
        "Taro": "None",
        "Pudding": "None",
    }

    const DrinkAttributePair = {
        "Dairy Free Alternative": "None",
        "Sweetness Level": "100%",
        "Ice Level": "Normal",
        "Cup Size": "Cups (Regular)",
        "Special Instructions": "None",
    }

    const [isAddOnPopoutOpen, setIsAddOnPopoutOpen] = useState<boolean[]>([]);
    const [selectedOrders, setSelectedOrders] = useState<any[]>([]); // for storing selected orders
    const [selectedAddOns, setSelectedAddOns] = useState<any[]>([]); // for storing selected add ons
    const [selectedDrinkAttributes, setSelectedDrinkAttributes] = useState<any[]>([]); // for storing selected drink attributes
    const [specialInstructions, setSpecialInstructions] = useState<string[]>([]);
    const [extraCharge, setExtraCharge] = useState<number[]>([]);
    const [usedSupply, setUsedSupply] = useState<any[]>([]); // for tracking all the supplies need to be subtracted from inventory
    const [subtractFromInventoryQuery, setSubtractFromInventoryQuery] = useState<string>(""); // for storing the query for subtracting from inventory
    const [remainingStock, setRemainingStock] = useState<any[]>([]); // for storing the remaining stock of each supply
    const [insuffientStock, setInsufficientStock] = useState<string[]>([]); // for storing the supplies that are insufficient for placing order in stock


    useEffect(() => {
        setSelectedOrders(orderList); // Add the selected order to the list
        setSelectedAddOns(prevAddOn => [...prevAddOn, AddOnPair]);
        setSelectedDrinkAttributes(prevDrinkAttribute => [...prevDrinkAttribute, DrinkAttributePair]);
        setExtraCharge(prevExtraCharge => [...prevExtraCharge, 0]);
        setIsAddOnPopoutOpen(prevIsAddOnPopoutOpen => [...prevIsAddOnPopoutOpen, false]);
    }, [orderList]);

    
    
    const toggleCustomize = (drinkIndex: number) => {    
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
            setOrderTotal((prevOrderTotal: number) => parseFloat((prevOrderTotal - 0.5).toFixed(2)));
        } 
        else {
            newAddOnPair[addOn] = "Added";
            newExtraCharge[drinkIndex] += 0.5;
            setOrderTotal((prevOrderTotal: number) => parseFloat((prevOrderTotal + 0.5).toFixed(2)));
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
        if (attribute === "Cup Size"){
            // Regular to Regular Hot
            if (value === "Cups (Regular Hot)" && newDrinkAttributePair["Cup Size"] === "Cups (Regular)"){
                newExtraCharge[drinkIndex] += 1; 
                setOrderTotal((prevOrderTotal: number) => parseFloat((prevOrderTotal + 1).toFixed(2)));
            }
            // Regular to XL
            else if (value === "Cups (XL)" && newDrinkAttributePair["Cup Size"] === "Cups (Regular)"){
                newExtraCharge[drinkIndex] += 2;
                setOrderTotal((prevOrderTotal: number) => parseFloat((prevOrderTotal + 2).toFixed(2)));  
            }
            // Regular Hot to Regular
            else if (value === "Cups (Regular)" && newDrinkAttributePair["Cup Size"] === "Cups (Regular Hot)"){
                newExtraCharge[drinkIndex] -= 1; 
                setOrderTotal((prevOrderTotal: number) => parseFloat((prevOrderTotal - 1).toFixed(2)));
            }
            // Regular Hot to XL
            else if (value === "Cups (XL)" && newDrinkAttributePair["Cup Size"] === "Cups (Regular Hot)"){
                newExtraCharge[drinkIndex] += 1;
                setOrderTotal((prevOrderTotal: number) => parseFloat((prevOrderTotal + 1).toFixed(2)));
            }
            // XL to Regular
            else if (value === "Cups (Regular)" && newDrinkAttributePair["Cup Size"] === "Cups (XL)"){
                newExtraCharge[drinkIndex] -= 2;
                setOrderTotal((prevOrderTotal: number) => parseFloat((prevOrderTotal - 2).toFixed(2)));
            }
            // XL to Regular Hot    
            else if (value === "Cups (Regular Hot)" && newDrinkAttributePair["Cup Size"] === "Cups (XL)"){
                newExtraCharge[drinkIndex] -= 1;
                setOrderTotal((prevOrderTotal: number) => parseFloat((prevOrderTotal - 1).toFixed(2)));
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
        setOrderTotal((prevOrderTotal: number) => parseFloat((prevOrderTotal - drinkPrice - extraCharge[drinkIndex]).toFixed(2)));
        setParentOrderList(updatedOrders);
        setSelectedAddOns(updateAddOns);
        setSelectedDrinkAttributes(updateDrinkAttributes);
        setExtraCharge(updateExtraCharge);
        setIsAddOnPopoutOpen(updateIsAddOnPopoutOpen);
        setSpecialInstructions(updateSpecialInstruction);
    };
    
    
    const clearOrderList = () => {
        setParentOrderList([]);
        setSelectedAddOns([]);
        setSelectedDrinkAttributes([]);
        setExtraCharge([]);
        setIsAddOnPopoutOpen([]);
        setSpecialInstructions([]);
        setOrderTotal(0);
        setUsedSupply([]);
        setSubtractFromInventoryQuery("");
        setInsufficientStock([]);
    };
    
    
    const loadUsedSupply = () => {
        const newUsedSupply = [...usedSupply];
        const orders = [...orderList];
        
        // Function to find index of supply in newUsedSupply to prevent duplicate used supply
        const findSupplyIndex = (supply: string) => {
            return newUsedSupply.findIndex(item => item.supply === supply);
        };
        
        
        for (let i = 0; i < orders.length; i++) {
            for (let j = 0; j < orders[i].ingredients.length; j++) {
                const supply = orders[i].ingredients[j];
                const supplyIndex = findSupplyIndex(supply);
                
                if (supplyIndex !== -1) {
                    newUsedSupply[supplyIndex].amount += 1;
                } else {
                    const newUsedSupplyPair = { supply: supply, amount: 1 };
                    newUsedSupply.push(newUsedSupplyPair);
                }
            }
        }
        // It only loop to lentgh-1 because the last element is created whenever selectedAddOns is initialized
        for (let i = 0; i < (selectedAddOns.length)-1; i++) {
            for (let key in selectedAddOns[i]) {
                if (selectedAddOns[i][key] === "Added") {
                    const supplyIndex = findSupplyIndex(key);
                    
                    if (supplyIndex !== -1) {
                        newUsedSupply[supplyIndex].amount += 1;
                    } else {
                        const newUsedSupplyPair = { supply: key, amount: 1 };
                        newUsedSupply.push(newUsedSupplyPair);
                    }
                }
            }
        }
        // It only loop to lentgh-1 because the last element is created whenever selectedAddOns is initialized
        for (let i = 0; i < (selectedDrinkAttributes.length)-1; i++) {
            if (selectedDrinkAttributes[i]["Dairy Free Alternative"] !== "None") {
                const supply = selectedDrinkAttributes[i]["Dairy Free Alternative"];
                const supplyIndex = findSupplyIndex(supply);
                
                if (supplyIndex !== -1) {
                    newUsedSupply[supplyIndex].amount += 1;
                } else {
                    const newUsedSupplyPair = { supply: supply, amount: 1 };
                    newUsedSupply.push(newUsedSupplyPair);
                }
            }
            
            const cupSize = selectedDrinkAttributes[i]["Cup Size"];
            const cupSizeIndex = findSupplyIndex(cupSize);
            
            if (cupSizeIndex !== -1) {
                newUsedSupply[cupSizeIndex].amount += 1;
            } else {
                const newUsedSupplyPair = { supply: cupSize, amount: 1 };
                newUsedSupply.push(newUsedSupplyPair);
            }
        }
        setUsedSupply([...newUsedSupply]);
    };
    

    const loadRemainingStock = async () => {
        try{
            const response = await fetch("/api/cashier/remainingStock");
            
            if (response.ok) {
                const data = await response.json();
                setRemainingStock(data.message);
            } else {
                const errorData = await response.json();
                console.error("Error from API:", errorData);
                alert(`Error: ${errorData.error}`);
            }
        }catch(error){
            console.error('Error fetching API:', error);
        }
    }


    // Check if there is sufficient stock for placing order
    const sufficientStock = () => {
        let enough = true;
        const newInsufficientStock = [...insuffientStock];
        for (let i = 0; i < usedSupply.length; i++) {
            // comparing usedSupply array with the inventory data stored in remaining Stock
            for (let j = 0; j < remainingStock.length; j++) {
                if (usedSupply[i].supply === remainingStock[j].supply) {
                    if (usedSupply[i].amount > remainingStock[j].stock_remaining) {
                        newInsufficientStock.push("Remaining " + usedSupply[i].supply + ": " + remainingStock[j].stock_remaining + ", Ordered: " + usedSupply[i].amount);
                        enough = false;
                    }
                }
            }
        }
        setInsufficientStock(newInsufficientStock);
        return enough;
    }


    const printInsufficientStock = () => {
        let allMessage = "Insufficient Stock: \n";
        for(let i = 0; i < insuffientStock.length; i++){
            allMessage += insuffientStock[i] + "\n";
        }
        alert(allMessage);
        setInsufficientStock([]);
        setSubtractFromInventoryQuery("");
        setUsedSupply([]);
    }


    const loadSubtractFromInventoryQuery = () => {
        if (!sufficientStock()) {
            return;
        }
        try{
            let newSubtractFromInventoryQuery = '';
            for (let i = 0; i < usedSupply.length; i++) {
                newSubtractFromInventoryQuery += `UPDATE inventory SET stock_remaining = stock_remaining - ${usedSupply[i].amount} WHERE supply = '${usedSupply[i].supply}';`;
            }
            setSubtractFromInventoryQuery(newSubtractFromInventoryQuery);
        }catch(error){
            console.error('Error in loadSubtractFromInventoryQuery:', error);
        }
    }
        

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
        for (let i = 0; i < orderList.length; i++) {
            orderItemArray.push(orderList[i].drink_name);
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
        
        // writing new order to orders table
        try{
            const response = await fetch("/api/cashier/placeOrder", {
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

        // subtracting corresponding add ons and drink ingredients from inventory
        try{
            const response = await fetch("/api/cashier/subtractFromInventory", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: subtractFromInventoryQuery,
            });
            if (response.ok) {
                // If the response status is OK (200), parse the JSON response
                const data = await response.json();
            } else {
                const errorData = await response.json();
                console.error("Error from API:", errorData);
                alert(`Error: ${errorData.error}`);
            }
        }catch(error){
            console.error('Error fetching API:', error);
        }
        clearOrderList(); 
    }    


    // loadRemainingStock will be called after usedSupply is updated
    useEffect(() => {
        if (usedSupply.length > 0) {
            loadRemainingStock();
        }
    }, [usedSupply]);


    // printInsufficientStock will be called after insuffientStock is updated (there is insuffient stock)
    useEffect(() => {
        if (insuffientStock.length > 0) {
            printInsufficientStock();
        }
    }, [insuffientStock]);


    // loadSubtractFromInventoryQuery will be called after remainingStock is updated
    useEffect(() => {
        if (remainingStock.length > 0) {
            loadSubtractFromInventoryQuery();
        }
    },[remainingStock]);


    // placeOrder will be called after subtractFromInventoryQuery is updated
    useEffect(() => {
        if (subtractFromInventoryQuery.length > 0) {
            placeOrder();
        }
    }, [subtractFromInventoryQuery]);
    
    return (
        <div className={styles.main}>
            <div className={styles.orderList}>
                <div className={styles.orderListTitles}>
                    <p>Order Total: ${orderTotal.toFixed(2)}</p>
                </div>
                <div className={styles.orderListContent}>
                    {selectedOrders.map((item, index) => (
                        <div key={index} className={styles.overallDrinkContainer}>
                            <span>
                            <div className={styles.individualDrink}>
                                <span className={styles.individualDrinkText}>
                                    {item.drink_name}
                                    <br/>
                                    <p className={styles.price}>
                                        ${(Number(item.price)+extraCharge[index]).toFixed(2)}
                                    </p>
                                </span>
                                    <Image
                                        src={`/images/${selectedOrders[index].image_url}`}
                                        alt={`${selectedOrders[index].drink_name}`}
                                        width={75}
                                        height={75}
                                        className={styles.individualDrinkImage}
                                />
                            </div>

                            <div className={styles.customizeAndRemoveButtons}>
                                <Button
                                variant='contained'
                                onClick={() => toggleCustomize(index)}
                                sx = {{backgroundColor: '#ADD8E6', color: '#000000', fontSize: '10px', fontWeight: 'bold', width: '100px', height: '30px', marginTop: '10px', marginLeft: '10px'}}
                                >
                                    Customize
                                </Button>
                                <Modal
                                className={styles.modal}  // Add your modal styles
                                open={isAddOnPopoutOpen[index]}
                                onClose={()=>toggleCustomize(index)}
                                closeAfterTransition
                                disableScrollLock
                                >
                                    <Paper className={styles.modalContent}>
                                        <h2>Currently selected: {selectedOrders[index].drink_name}</h2>
                                        <div className={styles.imageContainer}>
                                            <Image
                                                src={`/images/${selectedOrders[index].image_url}`}
                                                alt={`${selectedOrders[index].drink_name}`}
                                                width={250}
                                                height={250}
                                                className={styles.image}
                                            />
                                        </div>

                                        {selectedAddOns[index] && (
                                            <>
                                            <p className={styles.attributeName}>Select your add ons:</p>
                                            <div className={styles.addOns}>
                                                {[
                                                    { name: "Tapioca Pearls (Boba)", value: "Tapioca Pearls (Boba)" },
                                                    { name: "Cream Mousse", value: "Cream Mousse" },
                                                    { name: "Red Beans", value: "Red Beans" },
                                                    { name: "Mochi", value: "Mochi" },
                                                    { name: "Tiger Pearls", value: "Tiger Pearls" },
                                                    { name: "Taro", value: "Taro" },
                                                    { name: "Pudding", value: "Pudding" },
                                                ].map((addOn, i) => (
                                                    <FormControlLabel
                                                        key={i}
                                                        control={
                                                            <Checkbox
                                                                checked={selectedAddOns[index][addOn.value] === "Added"}
                                                                onChange={() => handleAddOnSelection(index, addOn.value)}
                                                                name={`extra${addOn.value}`}
                                                                value={addOn.value}
                                                            />
                                                        }
                                                        label={`${addOn.name} ($0.50)`}
                                                    />
                                                ))}
                                            </div>
                                            <br/>
                                            <br/>
                                            </>
                                        )}

                                    {selectedDrinkAttributes[index] && (
                                        <>
                                        <p className={styles.attributeName}>Dairy Free Alternatives</p>
                                        <RadioGroup
                                            name={`dairyFree-${index}`}
                                            value={selectedDrinkAttributes[index]["Dairy Free Alternative"]}
                                            onChange={(event) => handleAttributeSelection(index, "Dairy Free Alternative", event.target.value)}
                                        >
                                            <FormControlLabel value="None" control={<Radio />} label="None" />
                                            <FormControlLabel value="Oat Milk" control={<Radio />} label="Oat Milk" />
                                            <FormControlLabel value="Soy Milk" control={<Radio />} label="Soy Milk" />
                                            <FormControlLabel value="Lactose Free Milk" control={<Radio />} label="Lactose Free Milk" />
                                        </RadioGroup>
                                        <br/>
                                        <br/>
                                        <p className={styles.attributeName}>Sweetness Level</p>
                                        <RadioGroup
                                            name={`sweetnessLevel-${index}`}
                                            value={selectedDrinkAttributes[index]["Sweetness Level"]}
                                            onChange={(event) => handleAttributeSelection(index, "Sweetness Level", event.target.value)}
                                        >
                                            <FormControlLabel value="100%" control={<Radio />} label="100%" />
                                            <FormControlLabel value="50%" control={<Radio />} label="50%" />
                                        </RadioGroup>
                                        <br/>
                                        <br/>
                                        <p className={styles.attributeName}>Ice Level</p>
                                        <RadioGroup
                                            name={`iceLevel-${index}`}
                                            value={selectedDrinkAttributes[index]["Ice Level"]}
                                            onChange={(event) => handleAttributeSelection(index, "Ice Level", event.target.value)}
                                        >
                                            <FormControlLabel value="Regular" control={<Radio />} label="Regular" />
                                            <FormControlLabel value="Less Ice" control={<Radio />} label="Less Ice" />
                                            <FormControlLabel value="No Ice" control={<Radio />} label="No Ice" />
                                        </RadioGroup>
                                        <br/>
                                        <br/>
                                        <p className={styles.attributeName}>Cup Size</p>
                                        <RadioGroup
                                            name={`cupSize-${index}`}
                                            value={selectedDrinkAttributes[index]["Cup Size"]}
                                            onChange={(event) => handleAttributeSelection(index, "Cup Size", event.target.value)}
                                        >
                                            <FormControlLabel value="Cups (Regular)" control={<Radio />} label="Regular" />
                                            <FormControlLabel value="Cups (Regular Hot)" control={<Radio />} label="Regular Hot ($1.00)" />
                                            <FormControlLabel value="Cups (XL)" control={<Radio />} label="XL ($2.00)" />
                                        </RadioGroup>
                                        <br/>
                                        <br/>
                                        <p className={styles.attributeName}>Special Instructions</p>
                                        <TextField
                                            type="text"
                                            name={`specialInstruction-${index}`}
                                            placeholder="Add special instructions"
                                            value={specialInstructions[index]}
                                            onChange={(event) => handleAttributeSelection(index, "Special Instructions", event.target.value)}
                                        />
                                        <br />
                                    </>
                                    )}

                                    <div className={styles.closeButton}>
                                        <Button variant='contained' sx={{backgroundColor: 'red'}} onClick={()=>toggleCustomize(index)}>✕</Button>
                                    </div>
                                    <Button variant='contained' onClick={()=>toggleCustomize(index)}>Apply Changes</Button>

                                </Paper> 
                                </Modal>
                                <Button
                                variant='contained'
                                onClick={() => removeDrink(item.price, index)}
                                sx = {{backgroundColor: '#FFB6C1', color: '#000000', fontSize: '10px', fontWeight: 'bold', width: '100px', height: '30px', marginTop: '10px', marginLeft: '10px'}}
                                >
                                    Remove
                                </Button>
                            </div>
                            </span>
                        </div>
                    ))}
                </div>
                <div className={styles.chargeAndClear}>
                    <Button
                    variant='contained'
                    onClick={loadUsedSupply}
                    sx= {{backgroundColor: 'green'}}
                    >
                        Charge
                    </Button>
                    <span style={{ marginLeft: '10px' }}></span>
                    <Button
                    variant='contained'
                    onClick={clearOrderList}
                    >
                        Clear Order
                    </Button>
                </div>
            </div>
        </div>
    );
}