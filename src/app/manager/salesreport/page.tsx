"use client"
import React, { useEffect, useState } from 'react';
import styles from './page.module.css';
import Navbar from '../../../components/Navbar';
import Link from 'next/link';

interface SalesReportItem {
    order_id: number;
    order_timestamp: string;
    order_items: string[];
    order_total: number;
}

export default function Home() {
    // State variables for start and end timestamps
    const [startTimestamp, setStartTimestamp] = useState('2023-06-05');
    const [endTimestamp, setEndTimestamp] = useState('2023-06-06');
    const [drink, setDrink] = useState('');
    const [salesReport, setSalesReport] = useState<any[]>([]);
    const [loading, setLoading] = useState(false); // Loading state

    // Function to handle form submission (you can modify this according to your needs)
    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        // Perform actions with startTimestamp and endTimestamp

        // Fetch sales report
        fetchSalesReport();
    };

    const fetchSalesReport = async () => {
        setLoading(true);
        const response = await fetch('/api/manager/reportSales2', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({start: startTimestamp, end: endTimestamp, drink: drink}),
        });
        const data = await response.json();
        setLoading(false);
        setSalesReport(data.message);
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

    useEffect(() => {
        console.log(salesReport);
    }, [salesReport]);
    
    return (
        <>
            

            <div className={styles.main}>
                <Link role="link" className={styles.backButton} href="/manager">
                    Back
                </Link>
                <h1 className={styles.mainHeading}>Manager View (Sales Report)</h1>

                {/* Form for entering start and end timestamps */}
                <form className={styles.timestampForm} onSubmit={handleSubmit}>
                    <label>
                        Start Timestamp:
                    </label>
                    <input
                        type="date"
                        value={startTimestamp}
                        onChange={(e) => setStartTimestamp(e.target.value)}
                        min="1000-01-01"
                        max="9999-12-31"
                    />
                    <label>
                        End Timestamp:
                    </label>
                    <input
                        type="date"
                        value={endTimestamp}
                        onChange={(e) => setEndTimestamp(e.target.value)}
                        min="1000-01-01"
                        max="9999-12-31"
                    />
                    <label>
                        Drink Name:
                    </label>
                    <input
                        type="text"
                        value={drink}
                        onChange={(e) => setDrink(e.target.value)}
                    />

                    <button aria-label="Submit" className={styles.submitButton} type="submit">Submit</button>
                </form>

                {loading && <p>Loading...</p>}

                {!loading && (
                <table className={styles.salesReportTable}>
                    <thead>
                        <tr>
                            <th>Order Timestamp</th>
                            <th>Drinks</th>
                            <th>Order Total</th>

                        </tr>
                    </thead>
                    <tbody>
                    {salesReport.map((item) => (
                        <tr key={item.order_id}>
                            <td>{formatTimestamp(item.order_timestamp)}</td>
                            <td>{item.order_items.join(', ')}</td>
                            <td>{item.order_total}</td>
                        </tr>
                    ))}
                    </tbody>
                    </table>
                )}
                
            </div>
        </>
    );
}
