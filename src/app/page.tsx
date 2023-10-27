"use client"; // necessary for useState to work
import styles from './page.module.css'
import Navbar from '../components/Navbar'
import { useState } from 'react';


export default function Home() {
    const [apiResponse, setApiResponse] = useState(null);

    const testApiEndpoint = async () => {
        try {
            const response = await fetch('/api/example');
            const data = await response.json();
            setApiResponse(data);
        } catch (error) {
            console.error('Error fetching API:', error);
        }
    };

    return (
        <>
            <Navbar/>
            <p>Landing page (replace later with a login page of sorts)</p>
            <br/>
            <p>Also, you will want to create a .env file before beginning development (for DB purposes). Please see .env.example</p>
            <br/>
            <button onClick={testApiEndpoint}>Test API Endpoint</button>
            <p>
                Note: may take a while since I'm getting ALL querying the entire orders table and then getting first index.
                <br/>
                This can obviously be optimized by using LIMIT 1 in the SQL query, but I did it for demonstration purposes.
                <br/>
            </p>
            {apiResponse && (
            <div>
                <h2>API Response:</h2>
                <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
            </div>
            )}
        </>
    )
}
