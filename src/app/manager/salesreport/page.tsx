"use client"
import React, { useState } from 'react';
import styles from './page.module.css';
import Navbar from '../../../components/Navbar';
import Link from 'next/link';

export default function Home() {
    // State variables for start and end timestamps
    const [startTimestamp, setStartTimestamp] = useState('2023-06-05');
    const [endTimestamp, setEndTimestamp] = useState('2023-06-06');
    const [salesReport, setSalesReport] = useState([]);

    // Function to handle form submission (you can modify this according to your needs)
    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform actions with startTimestamp and endTimestamp
        console.log('Start Timestamp:', startTimestamp);
        console.log('End Timestamp:', endTimestamp);

        // Fetch sales report
        fetchSalesReport();
    };

    const fetchSalesReport = async () => {
        const response = await fetch('/api/manager/reportSales', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({start: startTimestamp, end: endTimestamp}),
        });
        const data = await response.json();
        setSalesReport(data.message);
    }

    return (
        <>
            <Navbar />

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

                    <button className={styles.submitButton} type="submit">Submit</button>
                </form>

                <table className={styles.salesReportTable}>
                    <thead>
                        <tr>
                            <th>Drink Name</th>
                            <th>Units Sold</th>
                            <th>Sales</th>
                        </tr>
                    </thead>
                    <tbody>
                        {salesReport.map((row, index) => (
                            <tr key={index}>
                                <td>{row[0]}</td>
                                <td>{row[1]}</td>
                                <td>{parseFloat(row[2]).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
            </div>
        </>
    );
}
