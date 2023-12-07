"use client"
import styles from './page.module.css'
import Navbar from '../../../components/Navbar'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Paper, TextField, Typography, Modal, Button } from '@mui/material';

export default function Home() {
    const [inventoryData, setInventoryData] = useState<any[]>([]);
    const [newItem, setNewItem] = useState({
        supply: '',
        stock_remaining: '',
        minimum_stock: ''
    });
    const [removeItemName, setRemoveItemName] = useState(''); 
    const sortedInventoryData = inventoryData.sort((a, b) => a.supply.localeCompare(b.supply));

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
        const isConfirmed = window.confirm('Are you sure you want to delete this drink?');

        if(isConfirmed) {
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
        }
        
        handleCloseModal();
        fetchInventory();
    };

    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = (item: any) => {
        setSelectedItem(item);
    
        // Set the edited item with the current attributes of the selected drink
        setEditedItem({
            inventory_id: item.inventory_id,
            supply: item.supply,
            stock_remaining: item.stock_remaining,
            minimum_stock: item.minimum_stock,
        });
    
        setOpenModal(true);
    };

    const [selectedItem, setSelectedItem] = useState({
        inventory_id: '',
        supply: '',
        stock_remaining: '',
        minimum_stock: '',
    });

    const [editedItem, setEditedItem] = useState({
        inventory_id: '',
        supply: '',
        stock_remaining: '',
        minimum_stock: '',
    });

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedItem((editedItem) => ({
            ...editedItem,
            [name]: value,
        }));
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleSaveEdit = async () => {
        const editMin = await fetch('/api/manager/inventoryEditMin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({supply: selectedItem.supply, stock: editedItem.minimum_stock}),
        });

        const editStock = await fetch('/api/manager/inventoryEditStock', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({supply: selectedItem.supply, stock: editedItem.stock_remaining}),
        });

        const editName = await fetch('/api/manager/inventoryEditName', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({supply: selectedItem.supply, newsupply: editedItem.supply}),
        });

        if(editMin.status == 500 || editStock.status == 500 || editName.status == 500) {
            alert('Error: One or more of the fields was invalid.');
        } else {
            alert('Successfully edited item.');
        }

        setOpenModal(false);
        fetchInventory();
    }

    const [searchQuery, setSearchQuery] = useState('');

    const filteredInventoryData = sortedInventoryData.filter(item =>
        item.supply.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.stock_remaining.toString().includes(searchQuery) ||
        item.minimum_stock.toString().includes(searchQuery)
    );

    useEffect(() => {  
        fetchInventory();
    }, []);

    return (
        <>
            

            <div className={styles.main}>
                <Link role="link" className={styles.backButton} href="/manager">
                    Back
                </Link>
                <h1 className={styles.mainHeading}>Manager View (Inventory)</h1>

                <div className={styles.actions}>
                    <h2>
                        Search for an inventory item:
                    </h2>
                    <input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className={styles.inventoryData}>
                    <table className={styles.inventoryTable}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Stock Remaining</th>
                                <th>Minimum Stock</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredInventoryData.map((item) => (
                                <tr key={item.inventory_id}>
                                    <td>{item.supply}</td>
                                    <td>{item.stock_remaining}</td>
                                    <td>{item.minimum_stock}</td>
                                    <td>
                                        <Button aria-label="Edit" onClick={() => handleOpenModal(item)}>Edit</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                disableScrollLock={true}
                >
                <Paper className={styles.modalContent}>
                    <div>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Edit Menu Item
                        </Typography>
                        <div className={styles.removeDrinkButton}>
                            <Button aria-label="Remove Drink" onClick={() => handleRemoveItem(selectedItem.supply)}>Delete Supply</Button>
                        </div>
                    </div>
                    <div className={styles.modalBody}>
                        <TextField
                            label="Supply Name"
                            value={editedItem.supply}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleEditChange(e)}
                            name="supply"
                            className={styles.textField}
                        />
                        <div>
                        <TextField
                            label="Stock Remaining"
                            value={editedItem.stock_remaining}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleEditChange(e)}
                            name="stock_remaining"
                            className={styles.textField}
                        />
                        </div>
                        <div>
                        <TextField
                            label="Minimum Stock"
                            value={editedItem.minimum_stock}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleEditChange(e)}
                            name="minimum_stock"
                            className={styles.textField}
                        />
                        </div>
                    </div>

                    <div className={styles.modalActions}>
                        <div className={styles.applyChangesButton}>
                            <Button aria-label="Apply Changes" onClick={handleSaveEdit}>Apply Changes</Button>
                        </div>
                        <div className={styles.closeButton}>
                            <Button aria-label="Close" className={styles.closeButton} onClick={handleCloseModal}>Close</Button>
                        </div>
                    </div>
                </Paper>
            </Modal>
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
                    <button aria-label="Add Item" onClick={handleAddItem}>Add Item</button>
                </div>
            </div>
        </>
    );
}
