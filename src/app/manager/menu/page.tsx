"use client"
import styles from './page.module.css'
import Navbar from '../../../components/Navbar'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Paper, TextField, Typography, Modal, Button } from '@mui/material';


export default function Home() {
    const [menuData, setMenuData] = useState<any[]>([]);
    const [newItem, setNewItem] = useState({
        drink_name: '',
        price: '',
        ingredients: [] as string[],
        drink_type: '',
    });

    const [drinkTypes, setDrinkTypes] = useState<string[]>([]);
    const [removeItemName, setRemoveItemName] = useState(''); 
    const [ingredientList, setIngredientList] = useState<string[]>([]);
    const [isDataFetched, setIsDataFetched] = useState(false);

    const fetchMenu = async () => {
        const response = await fetch('/api/manager/menuDisplay');
        const json = await response.json();
        setMenuData(json.message);
    }

    const sortedMenuData = menuData.slice().sort((a, b) => a.drink_name.localeCompare(b.drink_name));
    const sortedIngredientList = ingredientList.slice().sort((a, b) => a.localeCompare(b));

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

        if (response.status == 500) {
            alert(json.error);
        } else {
            alert(json.message);
        }

        fetchMenu();
    };

    // TODO: Add validation for the remove item (and success/error messages frontend)
    const handleRemoveItem = async (drink_name: string) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this drink?');

        if(isConfirmed) {
            const response = await fetch('/api/manager/menuRemove', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({drink_name: drink_name}),
            });

            const json = await response.json();
            // Refresh the inventory data after removing an item

            if (response.status == 500) {
                alert(json.error);
            } else {
                alert(json.message);
            }

            await fetchMenu();

            // Close the modal after removing
            setOpenModal(false);
        }
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

    const [openModal, setOpenModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState({
        drink_name: '',
        price: '',
        ingredients: [] as string[],
        drink_type: '',
    });
    const [editedItem, setEditedItem] = useState({
        drink_name: '',
        price: '',
        ingredients: [] as string[],
        drink_type: '',
    });
    // Function to open the modal and set the selected item
    const handleOpenModal = (item: any) => {
        setSelectedItem(item);
    
        // Set the edited item with the current attributes of the selected drink
        setEditedItem({
            drink_name: item.drink_name,
            price: item.price,
            ingredients: item.ingredients,
            drink_type: item.drink_type,
        });
    
        setOpenModal(true);
    };

    // Function to close the modal
    const handleCloseModal = () => {
        setOpenModal(false);
    };

    // Function to handle changes in the edited item
    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedItem((editedItem) => ({
            ...editedItem,
            [name]: value,
        }));
    };

    const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
    const [openIngredientModal, setOpenIngredientModal] = useState(false);

    const handleOpenIngredientModal = () => {
      setOpenIngredientModal(true);
    };
    
    const handleIngredientSelection = (ingredient: string) => {
        setSelectedIngredients((prevIngredients) => [...prevIngredients, ingredient]);
      };
      
      const handleRemoveIngredient = (ingredient: string) => {
        setSelectedIngredients((prevIngredients) =>
          prevIngredients.filter((item) => item !== ingredient)
        );
    };


    // Function to handle saving the edited item
    const handleSaveEdit = async () => {
        const editIngredients = await fetch('/api/manager/menuEditIngredients', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({drink: selectedItem.drink_name, ing: editedItem.ingredients}),
        });

        const editPrice = await fetch('/api/manager/menuEditPrice', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({drink: selectedItem.drink_name, price: editedItem.price}),
        });
        
        const editType = await fetch('/api/manager/menuEditType', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({drink: selectedItem.drink_name, type: editedItem.drink_type}),
        });
        
        const editName = await fetch('/api/manager/menuEditName', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({drink: selectedItem.drink_name, newdrink: editedItem.drink_name}),
        });
        // Close the modal after saving
        setOpenModal(false);
        fetchMenu();
    };

    const [searchQuery, setSearchQuery] = useState('');

    const filteredMenuData = sortedMenuData.filter(item =>
        item.drink_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.drink_type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.ingredients.join(', ').toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.price.toLowerCase().includes(searchQuery.toLowerCase())
    );

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

                <div className={styles.actions}>
                    <h2>
                        Search for an menu item:
                    </h2>
                    <input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className={styles.menuData}>
                    <table className={styles.inventoryTable}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Ingredients</th>
                                <th>Drink Type</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredMenuData.map((item) => (
                                <tr key={item.product_id}>
                                    <td>{item.drink_name}</td>
                                    <td>${item.price}</td>
                                    <td>{item.ingredients.join(', ')}</td>
                                    <td>{item.drink_type}</td>
                                    <td>
                                        <Button onClick={() => handleOpenModal(item)}>Edit</Button>
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
                            <Button onClick={() => handleRemoveItem(selectedItem.drink_name)}>Delete Drink</Button>
                        </div>
                    </div>
                    <div className={styles.modalBody}>
                        <TextField
                            label="Drink Name"
                            value={editedItem.drink_name}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleEditChange(e)}
                            name="drink_name"
                            className={styles.textField}
                        />
                        <div>
                        <TextField
                            label="Drink Price"
                            value={editedItem.price}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleEditChange(e)}
                            name="drink_price"
                            className={styles.textField}
                        />
                        </div>
                        <div>
                        <TextField
                            label="Drink Type"
                            value={editedItem.drink_type}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleEditChange(e)}
                            name="drink_type"
                            className={styles.textField}
                        />
                        </div>
                        <div>
                            <div className={styles.ingredientsContainer}>
                                {selectedIngredients.map((ingredient) => (
                                    <div
                                        key={ingredient}
                                        className={`${styles.ingredientBox} ${styles.selected}`}
                                        onClick={() => handleRemoveIngredient(ingredient)}
                                    >
                                        {ingredient}
                                    </div>
                                ))}
                                <div className={styles.modalActions}>
                                    <div className={styles.editIngredientsButton}>
                                        <Button onClick={handleOpenIngredientModal}>Edit Ingredients</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.modalActions}>
                        <div className={styles.applyChangesButton}>
                            <Button onClick={handleSaveEdit}>Apply Changes</Button>
                        </div>
                        <div className={styles.closeButton}>
                            <Button className={styles.closeButton} onClick={handleCloseModal}>Close</Button>
                        </div>
                    </div>
                </Paper>
            </Modal>
            <Modal
            open={openIngredientModal}
            onClose={() => setOpenIngredientModal(false)}
            aria-labelledby="ingredient-modal-title"
            aria-describedby="ingredient-modal-description"
            >
            <Paper className={styles.modalContent}>
                <Typography id="ingredient-modal-title" variant="h6" component="h2">
                Select Ingredients
                </Typography>
                <div className={styles.modalBody}>
                <div>
                    <label>Ingredients:</label>
                    <div className={styles.ingredientsContainer}>
                        {sortedIngredientList.map((ingredient) => (
                            <div
                                key={ingredient}
                                className={`${styles.ingredientBox} ${editedItem.ingredients.includes(ingredient) ? styles.selected : ''}`}
                                onClick={() => {
                                    setEditedItem((editedItem) => {
                                        if (editedItem.ingredients.includes(ingredient)) {
                                            return { ...editedItem, ingredients: editedItem.ingredients.filter((item) => item !== ingredient) };
                                        } else {
                                            return { ...editedItem, ingredients: [...editedItem.ingredients, ingredient] };
                                        }
                                    });
                                }}
                            >
                                {ingredient}
                            </div>
                        ))}
                    </div>
                </div>
                </div>
                <Button onClick={() => setOpenIngredientModal(false)}>Close</Button>
            </Paper>
            </Modal>

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
                            {sortedIngredientList.map((ingredient) => (
                                <div
                                    key={ingredient}
                                    className={`${styles.ingredientBox} ${newItem.ingredients.includes(ingredient) ? styles.selected : ''}`}
                                    onClick={() => {
                                        setNewItem((newItem) => {
                                            if (newItem.ingredients.includes(ingredient)) {
                                                return { ...newItem, ingredients: newItem.ingredients.filter((item) => item !== ingredient) };
                                            } else {
                                                return { ...newItem, ingredients: [...newItem.ingredients, ingredient] };
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
                        <input
                            type="text"
                            id="drink_type"
                            value={newItem.drink_type}
                            onChange={(e) => setNewItem({ ...newItem, drink_type: e.target.value })}
                        />
                    </div>

                    <button onClick={handleAddItem}>Add Item</button>
                </div>
            </div>
        </>
    );
}
