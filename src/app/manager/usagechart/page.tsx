"use client"
import React, { useState } from 'react';
import styles from './page.module.css';
import Navbar from '../../../components/Navbar';
import Link from 'next/link';

export default function Home() {
    // State variables for start and end timestamps
    const [startTimestamp, setStartTimestamp] = useState('2023-06-05');
    const [endTimestamp, setEndTimestamp] = useState('2023-06-06');
    const [usageChart, setUsageChart] = useState([]);
    const [loading, setLoading] = useState(false); // Loading state

    // Function to handle form submission (you can modify this according to your needs)
    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        // Perform actions with startTimestamp and endTimestamp
        console.log('Start Timestamp:', startTimestamp);
        console.log('End Timestamp:', endTimestamp);

        fetchUsageChart();
    };

    const fetchUsageChart = async () => {
        setLoading(true);
        const response = await fetch('/api/manager/reportUsage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({start: startTimestamp, end: endTimestamp}),
        });
        const data = await response.json();
        setUsageChart(data.message);
        setLoading(false);
    }

    return (
        <>
            <Navbar />

            <div className={styles.main}>
                <Link role="link" className={styles.backButton} href="/manager">
                    Back
                </Link>
                <h1 className={styles.mainHeading}>Manager View (Usage Chart)</h1>

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

                {loading && <p>Loading...</p>}

                {!loading && (
                <table className={styles.usageChartTable}>
                    <thead>
                        <tr>
                            <th>Supply Name</th>
                            <th>Usage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usageChart.map((row, index) => (
                            <tr key={index}>
                                <td>{row[0]}</td>
                                <td>{row[1]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                )}
                
            </div>
        </>
    );
}
