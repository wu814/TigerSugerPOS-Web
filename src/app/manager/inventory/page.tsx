"use client"
import styles from './page.module.css'
import Navbar from '../../../components/Navbar'
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
    const [inventoryData, setInventoryData] = useState<any[]>([]);
    const [newItem, setNewItem] = useState({
        supply: '',
        stock_remaining: '',
        minimum_stock: ''
    });
    const [removeItemName, setRemoveItemName] = useState(''); 

    const fetchInventory = async () => {
        const response = await fetch('/api/manager/inventoryDisplay');
        const json = await response.json();
        setInventoryData(json.message);
    }

    const handleAddItem = async () => {
        const response = await fetch('/api/manager/inventoryAdd', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newItem),
        });
        const json = await response.json();
        console.log(json); // Handle the response as needed
        // Refresh the inventory data after adding an item
        
        // check whether or not the fetch status was 500 or not
        if (response.status == 500) {
            alert(json.error);
        } else {
            alert(json.message);
        }
        fetchInventory();
    };

    const handleRemoveItem = async (supply: string) => {
        const response = await fetch('/api/manager/inventoryRemove', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({supply: supply}),
        });

        const json = await response.json();
        console.log(json); // Handle the response as needed
        // Refresh the inventory data after removing an item

        if (response.status == 500) {
            alert(json.error);
        } else {
            alert(json.message);
        }
        
        fetchInventory();
    };

    useEffect(() => {  
        fetchInventory();
    }, []);

    return (
        <>
            <Navbar />

            <div className={styles.main}>
                <Link role="link" className={styles.backButton} href="/manager">
                    Back
                </Link>
                <h1 className={styles.mainHeading}>Manager View (Inventory)</h1>
                <div>
                    <h2 className={styles.subHeading}>Inventory Data:</h2>
                    <table className={styles.inventoryTable}>
                        <thead>
                            <tr>
                                <th>Inventory ID</th>
                                <th>Name</th>
                                <th>Stock Remaining</th>
                                <th>Minimum Stock</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inventoryData.map((item) => (
                                <tr key={item.inventory_id}>
                                    <td>{item.inventory_id}</td>
                                    <td>{item.supply}</td>
                                    <td>{item.stock_remaining}</td>
                                    <td>{item.minimum_stock}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className={styles.actions}>
                    <h2>Add New Item:</h2>
                    <div>
                        <label htmlFor="supply">Supply Name:</label>
                        <input
                            type="text"
                            id="supply"
                            value={newItem.supply}
                            onChange={(e) => setNewItem({ ...newItem, supply: e.target.value })}
                        />
                    </div>
                    <div>
                        <label htmlFor="stock_remaining">Stock Remaining:</label>
                        <input
                            type="text"
                            id="stock_remaining"
                            value={newItem.stock_remaining}
                            onChange={(e) => setNewItem({ ...newItem, stock_remaining: e.target.value })}
                        />
                    </div>
                    <div>
                        <label htmlFor="minimum_stock">Minimum Stock:</label>
                        <input
                            type="text"
                            id="minimum_stock"
                            value={newItem.minimum_stock}
                            onChange={(e) => setNewItem({ ...newItem, minimum_stock: e.target.value })}
                        />
                    </div>
                    <button onClick={handleAddItem}>Add Item</button>
                </div>
                <div className={styles.actions}>
                    <h2>Remove Item:</h2>
                    <label htmlFor="removeItemId">Inventory Item Name:</label>
                    <input
                        type="text"
                        id="removeItemId"
                        onChange={(e) => {
                            // You can add additional validation if needed
                            setRemoveItemName(e.target.value);
                        }}
                    />
                    <button onClick={() => handleRemoveItem(removeItemName)}>Remove Item</button>
                </div>
            </div>
        </>
    );
}
