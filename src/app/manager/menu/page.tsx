"use client"
import styles from './page.module.css'
import Navbar from '../../../components/Navbar'
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
    const [menuData, setMenuData] = useState<any[]>([]);
    const [newItem, setNewItem] = useState({
        drink_name: '',
        price: '',
        ingredients: [] as string[],
        drink_type: '',
    });

    const [drinkTypes, setDrinkTypes] = useState<string[]>([]);
    const [removeItemId, setRemoveItemId] = useState<number>(-1); 
    const [ingredientList, setIngredientList] = useState<string[]>([]);
    const [isDataFetched, setIsDataFetched] = useState(false);

    const fetchMenu = async () => {
        const response = await fetch('/api/manager/menuDisplay');
        const json = await response.json();
        setMenuData(json.message);
    }

    // TODO: Add validation for the new item (and success/error messages frontend)
    const handleAddItem = async () => {
        const response = await fetch('/api/manager/menuAdd', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newItem),
        });
        const json = await response.json();
        // Refresh the inventory data after adding an item
        fetchMenu();
    };

    // TODO: Add validation for the remove item (and success/error messages frontend)
    const handleRemoveItem = async (product_id: number) => {
        const response = await fetch('/api/manager/menuRemove', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({product_id: product_id}),
        });

        const json = await response.json();
        // Refresh the inventory data after removing an item
        await fetchMenu();
    };

    const fetchIngredients = async () => {
        const response = await fetch('/api/manager/inventoryDisplay');
        const json = await response.json();

        const suppliesArray = json.message.map((item: { supply: string; }) => item.supply);
        setIngredientList(suppliesArray);
    };

    const fetchDrinkTypes = async () => {        
        const uniqueDrinkTypes: string[] = [];
        menuData.forEach((item) => {
            if (!uniqueDrinkTypes.includes(item.drink_type)) {
                uniqueDrinkTypes.push(item.drink_type);
            }
        });
        setDrinkTypes(uniqueDrinkTypes);
    }

    useEffect(() => {
        const fetchData = async () => {
            await fetchMenu();
            await fetchIngredients();
            setIsDataFetched(true);
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (isDataFetched) {
            fetchDrinkTypes();
        }
    }, [isDataFetched]);

    return (
        <>
            <Navbar />

            <div className={styles.main}>
                <Link role="link" className={styles.backButton} href="/manager">
                    Back
                </Link>
                <h1 className={styles.mainHeading}>Manager View (Menu)</h1>
                <div>
                    <h2 className={styles.subHeading}>Menu Data:</h2>
                    <table className={styles.inventoryTable}>
                        <thead>
                            <tr>
                                <th>Inventory ID</th>
                                <th>Name</th>
                                <th>Ingredients</th>
                                <th>Drink Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {menuData.map((item) => (
                                <tr key={item.product_id}>
                                    <td>{item.product_id}</td>
                                    <td>{item.drink_name}</td>
                                    <td>{item.ingredients.join(', ')}</td>
                                    <td>{item.drink_type}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className={styles.actions}>
                    <h2>Add New Item:</h2>
                    <div>
                        <label htmlFor="drinK_name">Drink Name:</label>
                        <input
                            type="text"
                            id="drink_name"
                            value={newItem.drink_name}
                            onChange={(e) => setNewItem({ ...newItem, drink_name: e.target.value })}
                        />
                    </div>
                    <div>
                        <label htmlFor="price">Price:</label>
                        <input
                            type="text"
                            id="price"
                            value={newItem.price}
                            onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                        />
                    </div>
                    <div>
                        <label>Ingredients:</label>
                        <div className={styles.ingredientsContainer}>
                            {ingredientList.map((ingredient) => (
                                <div
                                    key={ingredient}
                                    className={`${styles.ingredientBox} ${newItem.ingredients.includes(ingredient) ? styles.selected : ''}`}
                                    onClick={() => {
                                        setNewItem((prevItem) => {
                                            if (prevItem.ingredients.includes(ingredient)) {
                                                return { ...prevItem, ingredients: prevItem.ingredients.filter((item) => item !== ingredient) };
                                            } else {
                                                return { ...prevItem, ingredients: [...prevItem.ingredients, ingredient] };
                                            }
                                        });
                                    }}
                                >
                                    {ingredient}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="drink_type">Drink Type:</label>
                        <select
                            id="drink_type"
                            value={newItem.drink_type}
                            onChange={(e) => setNewItem({ ...newItem, drink_type: e.target.value })}
                        >
                            <option value="">Select Drink Type</option>
                            {drinkTypes.map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button onClick={handleAddItem}>Add Item</button>
                </div>
                <div className={styles.actions}>
                    <h2>Remove Item:</h2>
                    <label htmlFor="removeItemId">Inventory ID:</label>
                    <input
                        type="text"
                        id="removeItemId"
                        onChange={(e) => {
                            // You can add additional validation if needed
                            const menuId = parseInt(e.target.value, 10);
                            setRemoveItemId(menuId);
                        }}
                    />
                    <button onClick={() => handleRemoveItem(removeItemId)}>Remove Item</button>
                </div>
            </div>
        </>
    );
}
