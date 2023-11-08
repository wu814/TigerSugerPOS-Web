"use client"
import React, { useState } from 'react';
import styles from './page.module.css';
import Navbar from '../../../components/Navbar';
import Link from 'next/link';

export default function Home() {
    // State variables for start and end timestamps
    const [startTimestamp, setStartTimestamp] = useState('2023-06-05');
    const [excessReport, setExcessReport] = useState([]);
    const [loading, setLoading] = useState(false); // Loading state

    // Function to handle form submission (you can modify this according to your needs)
    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        // Perform actions with startTimestamp and endTimestamp
        console.log('Start Timestamp:', startTimestamp);

        // Fetch sales report
        fetchExcessReport();
    };

    const fetchExcessReport = async () => {
        setLoading(true)
        const response = await fetch('/api/manager/reportExcess', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({start: startTimestamp}),
        });

        console.log(response);
        const data = await response.json();
        setExcessReport(data.message);
        setLoading(false);
    }

    return (
        <>
            <Navbar />

            <div className={styles.main}>
                <Link role="link" className={styles.backButton} href="/manager">
                    Back
                </Link>
                <h1 className={styles.mainHeading}>Manager View (Excess Report)</h1>

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
                    <button className={styles.submitButton} type="submit">Submit</button>
                </form>

                {loading && <p>Loading...</p>}

                {!loading && (
                <table className={styles.salesReportTable}>
                    <thead>
                        <tr>
                            <th>Supply</th>
                            <th>Stock Remaining</th>
                            <th>Stock Used</th>
                            <th>Total Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        {excessReport.map((row, index) => (
                            <tr key={index}>
                                <td>{row[0]}</td>
                                <td>{row[1]}</td>
                                <td>{row[2]}</td>
                                <td>{row[3]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                )}
                
            </div>
        </>
    );
}
