"use client"
import React, { useEffect, useState } from 'react';
import styles from './page.module.css';
import Navbar from '../../../components/Navbar';
import { Button } from '@mui/material';
import Link from 'next/link';

export default function Home() {
    // State variables for start and end timestamps
    const [restockReport, setRestockReport] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state

    // Function to handle form submission (you can modify this according to your needs)
    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        // Perform actions with startTimestamp and endTimestamp
        // Fetch sales report
        fetchRestockReport();
    };

    const fetchRestockReport = async () => {
        setLoading(true);
        const response = await fetch('/api/manager/reportRestock');
        const data = await response.json();
        setLoading(false);
        setRestockReport(data.message);
    }

    useEffect(() => {
        fetchRestockReport();
    } , []);

    return (
        <>
            

            <div className={styles.main}>
                <Link role="link" className={styles.backButton} href="/manager">
                    Back
                </Link>
                <h1 className={styles.mainHeading}>Manager View (Restock Report)</h1>

                {loading && <p>Loading...</p>}

                {!loading &&
                    <Button variant='contained' aria-label="Refresh" className={styles.refreshButton} onClick={fetchRestockReport}> Refresh Table </Button>
                }

                {!loading && (
                <table className={styles.restockReportTable}>
                    <thead>
                        <tr>
                            <th>Supply Name</th>
                            <th>Stock Remaining</th>
                            <th>Minimum Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        {restockReport.map((row, index) => (
                            <tr key={index}>
                                <td>{row[0]}</td>
                                <td>{row[1]}</td>
                                <td>{row[2]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                )}
                
            </div>
        </>
    );
}
